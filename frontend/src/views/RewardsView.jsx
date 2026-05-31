import React, { useState, useEffect } from 'react';
import { Award, Star, Activity, Trophy, Clock, Medal, Upload } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

const RewardsView = () => {
    const [rewardsData, setRewardsData] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/user-rewards')
            .then(res => setRewardsData(res.data.data))
            .catch(err => console.error(err));
    }, []);

    if (!rewardsData) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-brand-dark">
                <div className="animate-pulse text-cyan-400 font-bold uppercase tracking-widest text-xs">Loading Citizen Profile...</div>
            </div>
        );
    }

    return (
        <div className="w-full h-full overflow-y-auto bg-brand-dark p-8 md:p-12">
            <div className="max-w-5xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                        <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tighter">Citizen Rewards</h1>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Your contribution to safer roads</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Rank Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-panel p-8 rounded-[32px] md:col-span-2 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full"></div>
                        
                        <div className="flex flex-col md:flex-row gap-8 items-center relative">
                            <div className="w-32 h-32 rounded-full border-4 border-amber-500/30 flex items-center justify-center p-2">
                                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center border-2 border-amber-400 relative">
                                    <Medal className="w-12 h-12 text-amber-400" />
                                </div>
                            </div>
                            
                            <div className="flex-1 text-center md:text-left space-y-3">
                                <h2 className="text-[10px] font-black text-amber-400 uppercase tracking-[0.2em]">Current Rank</h2>
                                <h3 className="text-3xl font-black text-white italic">{rewardsData.badge}</h3>
                                
                                <div className="space-y-2 mt-4">
                                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <span>Progress to next rank</span>
                                        <span className="text-amber-400">{rewardsData.total_points} / 15000 XP</span>
                                    </div>
                                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-white/5">
                                        <div className="bg-gradient-to-r from-amber-500 to-orange-400 h-full w-[83%] rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-panel p-8 rounded-[32px] flex flex-col justify-center gap-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-400">
                                <Activity size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Km Audited</p>
                                <p className="text-2xl font-black text-white">{rewardsData.contributions.km_audited} <span className="text-sm text-slate-500">km</span></p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-rose-500/20 rounded-xl text-rose-400">
                                <Star size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Anomalies Found</p>
                                <p className="text-2xl font-black text-white">{rewardsData.contributions.reports_verified}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Recent Activity */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel rounded-[32px] p-8"
                >
                    <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">Recent Activity</h3>
                    
                    <div className="space-y-4">
                        {rewardsData.recent_activity.map((activity, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5 hover:bg-white/[0.05] transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                                        <Upload size={16} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-200">{activity.action}</p>
                                        <p className="text-[10px] text-slate-500 font-medium mt-1 flex items-center gap-1">
                                            <Clock size={10} /> {activity.time}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-sm font-black text-amber-400">{activity.points} XP</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default RewardsView;
