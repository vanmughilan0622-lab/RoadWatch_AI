import React, { useState, useEffect } from 'react';
import { BarChart, Activity, Route, ShieldAlert } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AnalyticsView = () => {
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/road-analytics')
            .then(res => setAnalytics(res.data.data))
            .catch(err => console.error(err));
    }, []);

    if (!analytics) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-brand-dark">
                <div className="animate-pulse text-cyan-400 font-bold uppercase tracking-widest text-xs">Loading Analytics Engine...</div>
            </div>
        );
    }

    return (
        <div className="w-full h-full overflow-y-auto bg-brand-dark p-8 md:p-12 relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-5xl mx-auto space-y-8 relative z-10">
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                        <BarChart className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tighter">Road Analytics</h1>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Macro insights and quality metrics</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* RQI Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-panel p-8 rounded-[32px] flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden"
                    >
                        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] relative z-10">Road Quality Index</h2>
                        <div className="relative">
                            <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic relative z-10">{analytics.road_quality_index}</span>
                            <div className="absolute inset-0 bg-cyan-500/20 blur-2xl"></div>
                        </div>
                        <p className="text-xs text-slate-400 font-medium relative z-10">Overall health of audited infrastructure</p>
                    </motion.div>

                    {/* Secondary Stats */}
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="glass-panel p-6 rounded-[32px] flex flex-col justify-between"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] mb-1">Total Bumps Detected</h3>
                                    <p className="text-3xl font-black text-white">{analytics.total_bumps_detected}</p>
                                </div>
                                <div className="p-3 bg-white/5 rounded-xl text-slate-300">
                                    <Activity size={20} />
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-4 leading-relaxed font-medium">Derived from high-frequency IMU sensors during citizen audits.</p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass-panel p-6 rounded-[32px] flex flex-col justify-between border border-cyan-500/20"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.15em] mb-1">Ride Comfort Score</h3>
                                    <p className="text-3xl font-black text-cyan-400">{analytics.ride_comfort_score} <span className="text-lg text-cyan-700">/ 10</span></p>
                                </div>
                                <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
                                    <Route size={20} />
                                </div>
                            </div>
                            <div className="mt-4 w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-cyan-400 h-full" style={{ width: `${(analytics.ride_comfort_score / 10) * 100}%` }}></div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Severity Breakdown */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-panel rounded-[32px] p-8"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <ShieldAlert className="text-slate-400" size={20} />
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Anomaly Severity Distribution</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(analytics.severity_distribution).map(([level, count], idx) => {
                            let colorClass = "text-amber-400 bg-amber-400/10 border-amber-400/20";
                            let barColor = "bg-amber-400";
                            
                            if (level === "Medium") {
                                colorClass = "text-orange-400 bg-orange-400/10 border-orange-400/20";
                                barColor = "bg-orange-400";
                            } else if (level === "High") {
                                colorClass = "text-rose-400 bg-rose-400/10 border-rose-400/20";
                                barColor = "bg-rose-400";
                            } else if (level === "Critical") {
                                colorClass = "text-red-600 bg-red-600/10 border-red-600/20";
                                barColor = "bg-red-600";
                            }

                            return (
                                <div key={idx} className={`p-4 rounded-2xl border flex flex-col gap-3 ${colorClass}`}>
                                    <span className="text-[10px] font-black uppercase tracking-widest">{level}</span>
                                    <span className="text-2xl font-black">{count}%</span>
                                    <div className="w-full bg-black/20 h-1 rounded-full mt-auto">
                                        <div className={`${barColor} h-full rounded-full`} style={{ width: `${count}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default AnalyticsView;
