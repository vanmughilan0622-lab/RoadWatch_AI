import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { X } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';

// Fix for default marker icons in Leaflet with React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Sexy Custom Icons for Defects with Glow Effects based on Severity
const getIcon = (severity) => {
    let color = "#eab308"; // Yellow 500
    let glowClass = "glow-yellow";
    
    if (severity === "Medium") {
        color = "#f97316"; // Orange 500
        glowClass = "glow-orange";
    } else if (severity === "High") {
        color = "#f87171"; // Light Red 400
        glowClass = "glow-red";
    } else if (severity === "Critical") {
        color = "#991b1b"; // SOS Red 800
        glowClass = "glow-sos";
    }

    const svgHtml = `
        <div class="relative group w-full h-full flex items-center justify-center">
            <div class="absolute inset-0 rounded-full animate-ping opacity-20" style="background-color: ${color}"></div>
            <div class="${glowClass} relative w-full h-full bg-slate-900 rounded-full border-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-125" style="border-color: ${color}">
                <div class="w-2 h-2 rounded-full" style="background-color: ${color}"></div>
            </div>
        </div>
    `;

    return L.divIcon({
        className: 'custom-div-icon',
        html: svgHtml,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
};

function ChangeView({ center }) {
    const map = useMap();
    React.useEffect(() => {
        map.setView(center, map.getZoom(), { animate: true, duration: 1.5 });
    }, [center, map]);
    return null;
}

const MapComponent = ({ defects, center }) => {
    const [activeReport, setActiveReport] = useState(null);

    return (
        <div className="w-full h-full relative z-0">
            <MapContainer 
                center={center} 
                zoom={14} 
                minZoom={3}
                maxBounds={[[-90, -180], [90, 180]]}
                style={{ height: '100%', width: '100%', background: '#020617' }}
                zoomControl={false}
                scrollWheelZoom={true}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                    noWrap={true}
                />
                <ChangeView center={center} />
                
                {defects.map((defect) => (
                    <Marker 
                        key={defect.id} 
                        position={[defect.lat, defect.lng]} 
                        icon={getIcon(defect.severity)}
                        eventHandlers={{
                            click: () => setActiveReport(defect),
                        }}
                    />
                ))}
            </MapContainer>
            
            {/* Sexy Overlay Vignette */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(2,6,23,0.9)] z-10"></div>
            
            {/* Scanning Line Effect */}
            {defects.length > 0 && (
                <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.5)] z-10 animate-[scan_4s_linear_infinite]"></div>
            )}
            
            <style>{`
                @keyframes scan {
                    0% { transform: translateY(-10vh); opacity: 0; }
                    5% { opacity: 1; }
                    95% { opacity: 1; }
                    100% { transform: translateY(110vh); opacity: 0; }
                }
            `}</style>
            
            {/* Full Report Modal */}
            <AnimatePresence>
                {activeReport && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                    >
                        <motion.div 
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-slate-900 border border-white/10 p-8 rounded-[32px] max-w-md w-full relative shadow-2xl"
                        >
                            <button 
                                onClick={() => setActiveReport(null)} 
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <X size={20} />
                            </button>
                            
                            <h2 className="text-2xl font-black text-white mb-6 italic tracking-tight">Anomaly <span className="text-cyan-400">Report</span></h2>
                            
                            <div className="space-y-5 text-sm text-slate-300">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <strong className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Reference ID</strong>
                                    <span className="font-mono text-xs">{activeReport.id}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <strong className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Defect Type</strong>
                                    <span className="font-black uppercase tracking-widest text-xs text-white">{activeReport.type}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <strong className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Severity Level</strong>
                                    <span className={`font-black uppercase tracking-widest text-xs px-3 py-1 rounded-full ${
                                        activeReport.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                                        activeReport.severity === 'High' ? 'bg-rose-500/20 text-rose-400' :
                                        activeReport.severity === 'Medium' ? 'bg-orange-500/20 text-orange-400' :
                                        'bg-amber-500/20 text-amber-400'
                                    }`}>
                                        {activeReport.severity}
                                    </span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <strong className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Coordinates</strong>
                                    <span className="font-mono text-xs text-cyan-400">{activeReport.lat.toFixed(6)}, {activeReport.lng.toFixed(6)}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <strong className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Timestamp</strong>
                                    <span className="font-medium text-xs">{new Date(activeReport.timestamp * 1000).toLocaleString()}</span>
                                </div>
                                
                                <div className="mt-6">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">Sensor Telemetry (IMU)</p>
                                    <div className="h-24 w-full bg-slate-950 rounded-2xl flex items-center justify-center border border-white/5 relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                        <span className="text-cyan-500/50 font-black uppercase text-[10px] tracking-[0.3em] z-10 animate-pulse">Encrypted Feed</span>
                                    </div>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => setActiveReport(null)}
                                className="mt-8 w-full bg-cyan-500 text-slate-900 font-black uppercase tracking-widest text-[11px] py-4 rounded-2xl hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                            >
                                Dispatch Repair Crew
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MapComponent;
