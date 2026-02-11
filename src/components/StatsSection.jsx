import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Database, Smartphone, Layout, Server, Zap, Terminal, 
  Star, ArrowUpRight, ChevronLeft, ChevronRight, Cpu
} from 'lucide-react'

// --- DUMMY DATA ---
const generateProjects = () => {
  const techs = [
    { name: 'Laravel', color: 'text-red-600', bg: 'bg-red-50', icon: Database },
    { name: 'React Native', color: 'text-blue-600', bg: 'bg-blue-50', icon: Smartphone },
    { name: 'Three.js', color: 'text-purple-600', bg: 'bg-purple-50', icon: Layout },
    { name: 'Python IoT', color: 'text-green-600', bg: 'bg-green-50', icon: Server },
    { name: 'OpenAI', color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Zap },
    { name: 'Unity C#', color: 'text-pink-600', bg: 'bg-pink-50', icon: Terminal },
  ];

  return Array.from({ length: 18 }).map((_, i) => {
    const tech = techs[i % techs.length];
    return {
      id: `proj-${i}`,
      title: `Project Innovation ${i + 1}`,
      author: ['Ahmad', 'Sarah', 'Rizky', 'Dewi', 'Budi', 'Team X'][i % 6],
      tech: tech.name,
      icon: tech.icon,
      color: tech.color,
      stars: Math.floor(Math.random() * 50) + 5,
      // Menggunakan placeholder image yang estetik & ringan
      image: `https://picsum.photos/seed/${i + 40}/400/250`, 
      url: '#'
    };
  });
};

const PROJECT_DATA = generateProjects();
const ITEMS_PER_PAGE = 3; // Menampilkan 3 item agar layout tetap clean & fokus

// --- 1. REUSABLE COMPONENTS ---
const WordReveal = ({ text, className, delay = 0 }) => {
  const words = text.split(" ");
  return (
    <motion.div 
      initial="hidden" animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}
      className={`flex flex-wrap justify-center overflow-hidden ${className}`}
    >
      {words.map((word, index) => (
        <motion.span 
          key={index} 
          variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: 40, opacity: 0 } }} 
          transition={{ type: "spring", damping: 12, stiffness: 100 }}
          className="mr-[0.2em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const RepoCard = ({ data }) => {
  const Icon = data.icon;
  return (
    <motion.a
      href={data.url}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col bg-white border-2 border-slate-900 rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 cursor-pointer h-full"
    >
      {/* Thumbnail Area */}
      <div className="relative h-32 w-full overflow-hidden bg-slate-100 border-b-2 border-slate-900">
        <img 
          src={data.image} 
          alt={data.title}
          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out grayscale group-hover:grayscale-0"
        />
        <div className="absolute top-2 right-2 z-10 p-1 bg-white border border-slate-900 rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
           <Icon size={14} className="text-slate-900"/>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1 bg-white">
        <div className="flex justify-between items-start mb-2">
           <span className="text-[9px] font-bold uppercase tracking-wider text-white bg-slate-900 px-2 py-0.5 rounded-sm">
              {data.tech}
           </span>
           <div className="flex items-center gap-1">
              <Star size={10} className="text-slate-900 fill-slate-900" />
              <span className="text-[10px] font-bold text-slate-900">{data.stars}</span>
           </div>
        </div>

        <h3 className="text-sm font-black text-slate-900 leading-tight mb-0.5 uppercase tracking-tight truncate">
          {data.title}
        </h3>
        <p className="text-[10px] text-slate-500 font-mono mb-3 truncate">
          DEV_BY: @{data.author}
        </p>

        <div className="mt-auto pt-2 border-t-2 border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase">
          <span>ACCESS_REPO</span>
          <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
        </div>
      </div>
    </motion.a>
  )
}

// --- MAIN COMPONENT ---
export default function RepoScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(PROJECT_DATA.length / ITEMS_PER_PAGE);

  // Logic Pagination
  const currentProjects = PROJECT_DATA.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  const nextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1));
  const prevPage = () => setCurrentPage(p => Math.max(1, p - 1));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative h-[100dvh] w-full bg-[#f8f9fa] text-slate-900 overflow-hidden font-sans selection:bg-blue-600 selection:text-white flex flex-col"
    >
      {/* ================= BACKGROUND LAYERS ================= */}
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}></div>
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '64px 64px' }}></div>

      {/* Watermark Background */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.03, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none"
      >
        <span className="text-[20vw] font-black tracking-tighter text-slate-900 leading-none">REPO</span>
      </motion.div>


      {/* ================= MAIN CONTENT ================= */}
      {/* Layout Flexbox Tengah */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 w-full">
        
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
          
          {/* 1. Header Section (Title Only) */}
          <div className="text-center mb-6">
            <motion.div 
               initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
               className="mb-2 inline-flex items-center gap-2 px-2 py-1 rounded-sm bg-slate-900 text-white text-[10px] font-mono font-bold uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(203,213,225,1)]"
             >
               <Terminal size={10} /> DIRECTORY_V2.0
             </motion.div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] text-slate-900 mix-blend-darken">
               <WordReveal text="STUDENT" delay={0.4} />
               <span className="text-blue-600 block md:inline md:ml-3">
                  <WordReveal text="PROJECTS" delay={0.6} />
               </span>
            </h1>
          </div>

          {/* 2. Project Grid (Centerpiece) */}
          <div className="w-full mb-8 min-h-[280px]"> {/* Min-height menjaga layout stabil saat transisi */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              initial="hidden" animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <AnimatePresence mode='wait'>
                {currentProjects.map((item) => (
                   <RepoCard key={item.id} data={item} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* 3. Navigation Controls (Fixed Position style) */}
          <div className="flex items-center gap-6">
            <motion.button 
              onClick={prevPage}
              disabled={currentPage === 1}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 flex items-center justify-center bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-sm"
            >
              <ChevronLeft size={20} />
            </motion.button>

            <div className="font-mono text-xs font-bold tracking-widest text-slate-500">
               PAGE <span className="text-slate-900 text-lg mx-1">{currentPage}</span> / {totalPages}
            </div>

            <motion.button 
              onClick={nextPage}
              disabled={currentPage === totalPages}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 flex items-center justify-center bg-slate-900 text-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(148,163,184,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-sm"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>

        </div>
      </main>

    </motion.div>
  )
}