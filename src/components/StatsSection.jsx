import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Database, Smartphone, Layout, Server, Zap, Terminal, 
  GitBranch, Star, ExternalLink, Code2, Cpu, ArrowUpRight
} from 'lucide-react'

// --- DATA PROJECT (TETAP SAMA) ---
const PROJECT_DATA = [
  { 
    id: 'proj', title: 'Sistem Absensi', author: 'Ahmad', tech: 'Laravel', 
    icon: Database, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100', stars: 12, url: '#' 
  },
  { 
    id: 'code', title: 'Kantin Online', author: 'Sarah', tech: 'React Native', 
    icon: Smartphone, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', stars: 8, url: '#' 
  },
  { 
    id: 'caff', title: 'Portofolio 3D', author: 'Rizky', tech: 'Three.js', 
    icon: Layout, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100', stars: 24, url: '#' 
  },
  { 
    id: 'bugs', title: 'IoT Garden', author: 'Dewi', tech: 'Python', 
    icon: Server, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100', stars: 15, url: '#' 
  },
  { 
    id: 'skill', title: 'AI Chatbot', author: 'Budi', tech: 'OpenAI API', 
    icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-100', stars: 30, url: '#' 
  },
  { 
    id: 'mome', title: 'Game RPG', author: 'Team X', tech: 'Unity C#', 
    icon: Terminal, color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-100', stars: 45, url: '#' 
  },
]

// --- 1. REUSABLE ANIMATION COMPONENTS ---
const WordReveal = ({ text, className, delay = 0 }) => {
  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay }
    })
  };
  const child = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 40, transition: { type: "spring", damping: 12, stiffness: 100 } }
  };

  return (
    <motion.div 
      variants={container} initial="hidden" animate="visible"
      className={`flex flex-wrap justify-center overflow-hidden ${className}`}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="mr-[0.2em] pb-1 inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// --- 2. COMPONENT: REPO CARD ---
const RepoCard = ({ data, index }) => {
  const Icon = data.icon;
  
  return (
    <motion.a
      href={data.url}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative flex flex-col justify-between bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Decorative Gradient Blob on Hover */}
      <div className={`absolute -right-10 -top-10 w-24 h-24 ${data.bg} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

      <div className="relative z-10">
        {/* Header: Icon & Stats */}
        <div className="flex justify-between items-start mb-4">
          <div className={`p-2.5 rounded-lg ${data.bg} ${data.color} border ${data.border}`}>
            <Icon size={20} strokeWidth={2} />
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-100 rounded-md">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-slate-600 font-mono">{data.stars}</span>
          </div>
        </div>

        {/* Content: Title & Author */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
            {data.title}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-1">
            by @{data.author.toLowerCase()}
          </p>
        </div>
      </div>

      {/* Footer: Tech & Link */}
      <div className="relative z-10 flex justify-between items-center pt-4 border-t border-slate-50 mt-auto">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-1 rounded">
          <div className={`w-1.5 h-1.5 rounded-full ${data.color.replace('text', 'bg')}`}></div>
          {data.tech}
        </span>
        <ArrowUpRight size={16} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
    </motion.a>
  )
}

// --- 3. MAIN COMPONENT ---
export default function RepositoryShowcase() {
  return (
    <div className="relative h-[100dvh] w-full bg-[#f8f9fa] text-slate-900 overflow-hidden font-sans selection:bg-blue-600 selection:text-white">
      
      {/* ================= BACKGROUND LAYERS ================= */}
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}></div>
      
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '64px 64px' }}></div>

      {/* Watermark */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none"
      >
        <span className="text-[30vw] font-black tracking-tighter text-blue-900 leading-none">GIT</span>
      </motion.div>

      {/* ================= UI FRAME (FIXED HEADER) ================= */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-between items-center h-20 bg-gradient-to-b from-[#f8f9fa] to-transparent"
      >
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-9 h-9 bg-slate-900 text-white flex items-center justify-center rounded-lg shadow-md hover:bg-blue-600 transition-colors cursor-pointer">
            <GitBranch size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide text-slate-900">CLASS_REPO</h3>
            <p className="hidden sm:block text-[10px] text-slate-500 font-mono tracking-tight">DIRECTORY V2.0</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</span>
              <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                ONLINE
              </span>
           </div>
           <button className="bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm flex items-center gap-2 text-[10px] font-bold hover:shadow-md transition-all active:scale-95">
             <ExternalLink size={12}/> <span className="hidden sm:inline">GITHUB ORG</span>
           </button>
        </div>
      </motion.header>

      {/* ================= MAIN CONTENT (SCROLLABLE) ================= */}
      <main className="relative z-10 h-full overflow-y-auto pt-24 pb-20 px-4 scroll-smooth hide-scrollbar">
        <div className="max-w-5xl mx-auto w-full">
          
          {/* 1. Hero Title Section */}
          <div className="text-center mb-12 mt-4 md:mt-8">
             <motion.div 
               initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
               className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-mono uppercase tracking-widest rounded-full mb-4 border border-blue-100"
             >
                <Terminal size={10} /> STUDENT_PROJECTS
             </motion.div>
             
             <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-slate-900 mb-4 mix-blend-darken">
                <WordReveal text="DIGITAL" delay={0.4} />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block mt-1 md:mt-2">
                   <WordReveal text="INNOVATION" delay={0.6} />
                </span>
             </h1>

             <motion.p 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
               className="text-slate-500 font-medium text-sm md:text-base max-w-lg mx-auto leading-relaxed"
             >
               Koleksi kode, eksperimen, dan tugas akhir. <br className="hidden md:block"/> 
               Bukti nyata dari begadang dan error handling.
             </motion.p>
          </div>

          {/* 2. Projects Grid */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 1.2 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {PROJECT_DATA.map((item, idx) => (
              <RepoCard key={item.id} data={item} index={idx} />
            ))}
            
            {/* "Coming Soon" Card Placeholder */}
            <motion.div 
               variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
               className="border-2 border-dashed border-slate-200 rounded-xl p-5 flex flex-col items-center justify-center text-center h-full min-h-[180px] group hover:border-slate-300 transition-colors"
            >
               <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                 <Code2 size={20} className="text-slate-400"/>
               </div>
               <p className="text-sm font-bold text-slate-500">More Coming Soon</p>
               <p className="text-[10px] text-slate-400 font-mono mt-1">Deploying...</p>
            </motion.div>

          </motion.div>
        </div>
      </main>

      {/* ================= FOOTER (FIXED) ================= */}
      <motion.footer 
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-0 left-0 right-0 px-4 md:px-6 py-4 bg-gradient-to-t from-[#f8f9fa] via-[#f8f9fa] to-transparent flex justify-between items-end text-[9px] font-mono text-slate-400 uppercase tracking-widest z-50 pointer-events-none"
      >
        <div className="pointer-events-auto flex items-center gap-1.5">
          <Cpu size={12} className="text-blue-500"/> 
          <span>RENDERED IN {new Date().getFullYear()}</span>
        </div>
        
        <div className="pointer-events-auto flex items-center gap-4">
           <span className="hover:text-blue-600 cursor-pointer transition-colors">BATCH 23-26</span>
           <div className="w-px h-3 bg-slate-300"></div>
           <span className="font-bold text-slate-600">SMK RPL</span>
        </div>
      </motion.footer>

    </div>
  )
}