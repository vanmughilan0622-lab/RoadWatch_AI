import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, IndianRupee, AlertTriangle, PieChart, ArrowUpRight, ShieldAlert, Target } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass, subtitle, trend }) => (
    <motion.div 
        whileHover={{ y: -5 }}
        className="glass-card rounded-3xl p-6 flex flex-col gap-4 overflow-hidden relative"
    >
        {/* Abstract Background Shape */}
        <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-10 blur-2xl ${colorClass}`}></div>
        
        <div className="flex justify-between items-start relative">
            <div className="flex flex-col gap-1">
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{title}</span>
                <h3 className="text-3xl font-black text-white tracking-tighter">{value}</h3>
            </div>
            <div className={`p-3 rounded-2xl ${colorClass.replace('bg-', 'bg-')}/20 text-white shadow-lg`}>
                <Icon className="w-5 h-5" />
            </div>
        </div>
        
        <div className="flex items-center gap-2 relative mt-auto">
            {trend && (
                <div className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                    <ArrowUpRight size={10} />
                    {trend}
                </div>
            )}
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{subtitle}</p>
        </div>
    </motion.div>
);

const Dashboard = ({ defects, budgetData }) => {
    const totalDefects = defects.length;
    const estimatedCost = totalDefects * 12500;
    
    const totalAllocated = Object.values(budgetData).reduce((acc, curr) => acc + curr.allocated, 0) || 1;
    const totalSpent = Object.values(budgetData).reduce((acc, curr) => acc + curr.spent, 0) || 0;
    const discrepancyIndex = ((totalSpent / totalAllocated) * 10).toFixed(1);

    return (
        <div className="absolute top-8 right-8 w-[420px] flex flex-col gap-6 z-20">
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="grid grid-cols-2 gap-4"
            >
                <StatCard 
                    title="Audit Findings" 
                    value={totalDefects} 
                    icon={ShieldAlert} 
                    colorClass="bg-rose-500"
                    subtitle="Verified Anomalies"
                    trend="+12%"
                />
                <StatCard 
                    title="Repair Capital" 
                    value={`₹${(estimatedCost / 10).toFixed(1)}L`} 
                    icon={IndianRupee} 
                    colorClass="bg-amber-500"
                    subtitle="Est. Fiscal Impact"
                />
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-panel rounded-[32px] p-8 space-y-8 overflow-hidden relative"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl"></div>

                <div className="flex justify-between items-center relative">
                    <div className="flex items-center gap-3">
                        <div className="bg-cyan-500/20 p-2 rounded-xl">
                            <Target className="w-5 h-5 text-cyan-400" />
                        </div>
                        <h3 className="text-lg font-black text-white tracking-tight italic">Transparency <span className="text-cyan-400">Index</span></h3>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">BBMP AUDIT</span>
                        <span className="text-[10px] text-green-400 font-bold">STABLE</span>
                    </div>
                </div>

                <div className="flex items-center gap-10 py-4 relative">
                    <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                        <svg className="w-full h-full transform -rotate-90">
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#22d3ee" />
                                    <stop offset="100%" stopColor="#3b82f6" />
                                </linearGradient>
                            </defs>
                            <circle
                                cx="72"
                                cy="72"
                                r="64"
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                className="text-slate-900/50"
                            />
                            <motion.circle
                                cx="72"
                                cy="72"
                                r="64"
                                stroke="url(#gradient)"
                                strokeWidth="12"
                                strokeLinecap="round"
                                fill="transparent"
                                strokeDasharray={402}
                                initial={{ strokeDashoffset: 402 }}
                                animate={{ strokeDashoffset: 402 - (discrepancyIndex / 10) * 402 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-white tracking-tighter italic">{discrepancyIndex}</span>
                            <span className="text-[9px] text-slate-500 uppercase font-black tracking-[0.3em] mt-1">Audit Score</span>
                        </div>
                    </div>
                    
                    <div className="flex-1 space-y-6">
                        <div className="space-y-1">
                            <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                <span>Expenditure</span>
                                <span className="text-white italic">₹{(totalSpent / 100).toFixed(1)} Cr / ₹{(totalAllocated / 100).toFixed(1)} Cr</span>
                            </div>
                            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-white/5">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(totalSpent / totalAllocated) * 100}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="bg-gradient-to-r from-blue-600 to-cyan-400 h-full rounded-full"
                                ></motion.div>
                            </div>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic">
                            Platform detects a <span className="text-white font-bold underline decoration-cyan-500/50">spending efficiency gap</span> of { (10 - discrepancyIndex).toFixed(1) } points compared to detected infrastructure decay.
                        </p>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/5 space-y-4">
                    <div className="flex items-center gap-2 text-[10px] text-cyan-400 font-black uppercase tracking-[0.2em]">
                        <TrendingUp size={14} />
                        Municipal Ward breakdown
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {Object.entries(budgetData).slice(0, 3).map(([ward, data], idx) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + (idx * 0.1) }}
                                key={ward} 
                                className="flex justify-between items-center bg-white/[0.02] hover:bg-white/[0.05] p-3 rounded-2xl border border-white/5 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-500 group-hover:text-cyan-400 transition-colors">
                                        W{idx+1}
                                    </div>
                                    <span className="text-xs text-slate-300 font-bold">{ward}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`text-[10px] font-black italic ${data.defects_reported > 40 ? 'text-rose-500' : 'text-cyan-500'}`}>
                                        {data.defects_reported} ANOMALIES
                                    </span>
                                    <div className="w-16 h-1 bg-slate-900 rounded-full overflow-hidden">
                                        <div className="bg-slate-600 h-full" style={{ width: `${(data.spent/data.allocated)*100}%` }}></div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
