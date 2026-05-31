import React from 'react';
import { Camera, Upload, Play, AlertCircle, ShieldCheck, Activity, Database, Settings, Map, Award, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isProcessing, onStartSimulation, onUpload, currentView, setCurrentView }) => {
    return (
        <div className="w-84 h-full glass-panel border-r border-white/5 flex flex-col p-8 z-20 relative overflow-hidden">
            {/* Subtle Gradient Accent */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 blur-[100px] rounded-full"></div>
            
            <div className="flex items-center gap-4 mb-12 relative">
                <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-2.5 rounded-xl shadow-lg shadow-cyan-500/20">
                    <ShieldCheck className="text-white w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-white leading-none">RoadWatch <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">AI</span></h1>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1.5">Public Audit System</p>
                </div>
            </div>

            <div className="flex-1 space-y-10 relative overflow-y-auto pr-2 pb-10">
                <section>
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.15em]">Navigation</h2>
                        <div className="h-[1px] flex-1 ml-4 bg-white/5"></div>
                    </div>
                    <div className="space-y-3">
                        <button onClick={() => setCurrentView('map')} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 border ${currentView === 'map' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/40 glow-cyan' : 'bg-white/[0.03] border-white/5 hover:border-white/20 hover:bg-white/5 text-slate-400 hover:text-white'}`}>
                            <div className={`p-2 rounded-lg transition-colors ${currentView === 'map' ? 'bg-cyan-500/20' : 'bg-white/5'}`}>
                                <Map size={18} />
                            </div>
                            <span className="font-bold text-sm">Live Map</span>
                        </button>
                        <button onClick={() => setCurrentView('rewards')} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 border ${currentView === 'rewards' ? 'bg-amber-500/10 text-amber-400 border-amber-500/40 glow-amber' : 'bg-white/[0.03] border-white/5 hover:border-white/20 hover:bg-white/5 text-slate-400 hover:text-white'}`}>
                            <div className={`p-2 rounded-lg transition-colors ${currentView === 'rewards' ? 'bg-amber-500/20' : 'bg-white/5'}`}>
                                <Award size={18} />
                            </div>
                            <span className="font-bold text-sm">Citizen Rewards</span>
                        </button>
                        <button onClick={() => setCurrentView('analytics')} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 border ${currentView === 'analytics' ? 'bg-blue-500/10 text-blue-400 border-blue-500/40' : 'bg-white/[0.03] border-white/5 hover:border-white/20 hover:bg-white/5 text-slate-400 hover:text-white'}`}>
                            <div className={`p-2 rounded-lg transition-colors ${currentView === 'analytics' ? 'bg-blue-500/20' : 'bg-white/5'}`}>
                                <BarChart2 size={18} />
                            </div>
                            <span className="font-bold text-sm">Road Analytics</span>
                        </button>
                    </div>
                </section>
                <section>
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.15em]">Control Center</h2>
                        <div className="h-[1px] flex-1 ml-4 bg-white/5"></div>
                    </div>
                    
                    <div className="space-y-4">
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onStartSimulation}
                            disabled={isProcessing}
                            className={`w-full group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-500 ${
                                isProcessing 
                                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 glow-cyan' 
                                : 'bg-white/[0.03] border-white/5 hover:border-white/20 text-slate-400 hover:text-white'
                            }`}
                        >
                            <div className={`p-2 rounded-lg transition-colors ${isProcessing ? 'bg-cyan-500/20' : 'bg-white/5 group-hover:bg-white/10'}`}>
                                <Camera size={18} className={isProcessing ? 'animate-pulse' : ''} />
                            </div>
                            <span className="font-bold text-sm">Live Dashcam Feed</span>
                            {isProcessing && (
                                <motion.div 
                                    animate={{ opacity: [0.4, 1, 0.4] }} 
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="ml-auto w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                                ></motion.div>
                            )}
                        </motion.button>

                        <label className="w-full group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 text-slate-400 hover:text-white cursor-pointer transition-all duration-500">
                            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10">
                                <Upload size={18} />
                            </div>
                            <span className="font-bold text-sm">Upload Audit Logs</span>
                            <input type="file" className="hidden" onChange={onUpload} accept="video/*" />
                        </label>
                    </div>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.15em]">Neural Analysis</h2>
                        <div className="h-[1px] flex-1 ml-4 bg-white/5"></div>
                    </div>
                    
                    <div className="glass-card rounded-2xl p-5 space-y-5">
                        {isProcessing ? (
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Status</p>
                                        <p className="text-xs text-cyan-400 font-bold">Scanning Road Surface...</p>
                                    </div>
                                    <span className="text-lg font-black text-white italic">84%</span>
                                </div>
                                <div className="w-full bg-slate-900 rounded-full h-1.5 p-[2px] border border-white/5">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: '84%' }}
                                        className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-full rounded-full"
                                    ></motion.div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex-1 h-8 bg-white/5 rounded-lg flex items-center justify-center gap-2">
                                        <Activity size={12} className="text-slate-500" />
                                        <span className="text-[9px] text-slate-400 font-bold">GPU ACCEL</span>
                                    </div>
                                    <div className="flex-1 h-8 bg-white/5 rounded-lg flex items-center justify-center gap-2">
                                        <Database size={12} className="text-slate-500" />
                                        <span className="text-[9px] text-slate-400 font-bold">DB SYNC</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center py-6 text-center">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                    <Activity className="text-slate-600" size={20} />
                                </div>
                                <p className="text-sm text-slate-400 font-medium">No active audit detected</p>
                                <p className="text-[10px] text-slate-600 mt-1 uppercase tracking-tight">System initialized and ready</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            <div className="mt-auto pt-8">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                        <span className="text-[10px] text-white font-black uppercase tracking-widest">Core Engine v4.0</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                        Blockchain-verified road audit data synchronized with municipal budget transparency module.
                    </p>
                </div>
                
                <div className="flex justify-between items-center mt-6 px-2">
                    <button className="text-slate-600 hover:text-white transition-colors">
                        <Settings size={16} />
                    </button>
                    <span className="text-[9px] text-slate-700 font-bold tracking-tighter">© 2026 ROADWATCH GLOBAL</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
