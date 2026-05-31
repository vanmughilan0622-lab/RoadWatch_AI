import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MapComponent from './components/MapComponent';
import RewardsView from './views/RewardsView';
import AnalyticsView from './views/AnalyticsView';

const API_BASE_URL = 'http://127.0.0.1:8000';

function App() {
    const [defects, setDefects] = useState([]);
    const [budgetData, setBudgetData] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [mapCenter, setMapCenter] = useState([12.9716, 77.5946]);
    const [currentView, setCurrentView] = useState('map');

    const fetchBudgetData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/municipal-budget`);
            if (response.data.status === 'success') {
                setBudgetData(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching budget data:", error);
        }
    };

    const handleStartSimulation = async () => {
        setIsProcessing(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/process-feed`);
            if (response.data.status === 'success') {
                const newDefects = response.data.defects;
                setDefects(newDefects);
                if (newDefects.length > 0) {
                    setMapCenter([newDefects[0].lat, newDefects[0].lng]);
                }
            }
        } catch (error) {
            console.error("Error processing feed:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        fetchBudgetData();
        handleStartSimulation();
    }, []);

    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Simulate upload and processing
            handleStartSimulation();
        }
    };

    return (
        <div className="flex h-screen w-full bg-brand-dark text-slate-200 overflow-hidden font-sans">
            <Sidebar 
                isProcessing={isProcessing} 
                onStartSimulation={handleStartSimulation}
                onUpload={handleUpload}
                currentView={currentView}
                setCurrentView={setCurrentView}
            />
            
            <main className="flex-1 relative">
                <div className={`w-full h-full relative ${currentView === 'map' ? 'block' : 'hidden'}`}>
                    <MapComponent defects={defects} center={mapCenter} />
                    <Dashboard defects={defects} budgetData={budgetData} />
                    
                    {/* Status Bar */}
                    <div className="absolute bottom-6 left-6 glass-light px-4 py-2 rounded-full z-10 flex items-center gap-4 border border-white/10">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">System Online</span>
                        </div>
                        <div className="h-4 w-px bg-white/10"></div>
                        <span className="text-[10px] text-slate-400">LAT: {mapCenter[0].toFixed(4)}</span>
                        <span className="text-[10px] text-slate-400">LNG: {mapCenter[1].toFixed(4)}</span>
                    </div>
                </div>
                
                {currentView === 'rewards' && <RewardsView />}
                {currentView === 'analytics' && <AnalyticsView />}
            </main>
        </div>
    );
}

export default App;
