import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Database, Smartphone, Layout, Server, Zap, Terminal, 
  ArrowUpRight, ChevronLeft, ChevronRight, Hash, Star
} from 'lucide-react'

// --- CONFIG & DATA ---
const COLORS = {
  cream: "bg-[#F2F0E9]",
  red: "text-[#CE203C]",
  redBg: "bg-[#CE203C]",
  black: "text-[#1a1a1a]",
  border: "border-[#1a1a1a]"
};

const generateProjects = () => {
  const techs = [
    { name: 'Laravel', icon: Database },
    { name: 'React', icon: Smartphone },
    { name: 'Three.js', icon: Layout },
    { name: 'Python', icon: Server },
    { name: 'AI/ML', icon: Zap },
    { name: 'Unity', icon: Terminal },
  ];

  return Array.from({ length: 9 }).map((_, i) => {
    const tech = techs[i % techs.length];
    return {
      id: `proj-${i}`,
      title: `PROJECT ALPHA ${i + 1}`.toUpperCase(),
      subtitle: `Siswa SMK Airlangga ${['X', 'XI', 'XII'][i % 3]}`,
      tech: tech.name,
      icon: tech.icon,
      image: `https://picsum.photos/seed/${i + 150}/600/400`, 
      year: '2025',
      url: '#'
    };
  });
};

const PROJECT_DATA = generateProjects();
const ITEMS_PER_PAGE = 9; // Compact 9 items

// --- 1. ANIMATION COMPONENT (PER HURUF) ---
const LetterReveal = ({ text, className, delay = 0 }) => {
  const letters = text.split("");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay }
    })
  };

  const child = {
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 12, stiffness: 100 }
    },
    hidden: {
      y: "100%",
      opacity: 0,
    }
  };

  return (
    <motion.div 
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }} 
      variants={container} 
      initial="hidden" 
      animate="visible"
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index} className="inline-block relative">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// --- 2. CARD COMPONENT (SWISS STYLE) ---
const ProjectCard = ({ data }) => {
  const Icon = data.icon;
  
  return (
    <motion.a
      href={data.url}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className={`group relative flex flex-col bg-white border-2 ${COLORS.border} overflow-hidden shadow-[4px_4px_0px_0px_#1a1a1a] hover:shadow-[2px_2px_0px_0px_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 h-full`}
    >
      {/* Image Section - Compact Height */}
      <div className="relative h-32 w-full overflow-hidden border-b-2 border-black group-hover:invert transition-all duration-300">
        <img 
          src={data.image} 
          alt={data.title}
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
        />
        {/* Category Tag */}
        <div className={`absolute top-0 left-0 px-2 py-1 ${COLORS.redBg} text-white text-[10px] font-bold uppercase tracking-widest z-10`}>
          {data.tech}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-3 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex justify-between items-start mb-1">
             <h3 className="text-lg font-black leading-none tracking-tighter text-black uppercase">
              {data.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-black group-hover:text-[#CE203C] transition-colors" />
          </div>
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-tight mb-2">
            {data.subtitle} // EST. {data.year}
          </p>
        </div>

        {/* Decorative Footer */}
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-dashed border-black">
          <Icon size={12} className="text-[#CE203C]" />
          <div className="h-1 w-full bg-gray-200 overflow-hidden relative">
             <div className={`absolute inset-0 w-1/2 ${COLORS.redBg}`}></div>
          </div>
        </div>
      </div>
    </motion.a>
  )
}

// --- MAIN PAGE ---
export default function ProjectShowcase() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(PROJECT_DATA.length / ITEMS_PER_PAGE);

  const currentProjects = PROJECT_DATA.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  const nextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1));
  const prevPage = () => setCurrentPage(p => Math.max(1, p - 1));

  return (
    <div className={`min-h-screen w-full ${COLORS.cream} text-[#1a1a1a] font-sans selection:bg-[#CE203C] selection:text-white flex flex-col overflow-x-hidden`}>
      
      {/* Background Texture/Noise (Optional aesthetic touch) */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}>
      </div>

      {/* --- HEADER SECTION --- */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-12 pb-8">
        <div className="flex flex-col items-start border-l-4 border-[#CE203C] pl-6">
          
          {/* Animated Main Title */}
          <div className="relative">
            {/* Decorative Star/Asterisk like in the image */}
            <motion.div 
               initial={{ rotate: 0, opacity: 0 }} 
               animate={{ rotate: 90, opacity: 1 }} 
               transition={{ duration: 1, delay: 0.5 }}
               className="absolute -top-6 -left-2 text-[#CE203C]"
            >
              <Star size={32} fill="#CE203C" strokeWidth={0} />
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-black mb-2">
              <LetterReveal text="PROJECT" delay={0.1} />
              <div className="text-[#CE203C]">
                <LetterReveal text="SHOWCASE" delay={0.4} />
              </div>
            </h1>
          </div>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="text-sm md:text-base font-mono font-bold uppercase tracking-widest mt-4 max-w-md"
          >
             <span className="text-[#CE203C] mr-2">///</span> 
             Projek terakhir kami dari siswa SMK Airlangga
          </motion.p>
        </div>
      </header>

      {/* --- CONTENT GRID --- */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-12 flex-1">
        
        {/* Stats / Decor Bar */}
        <div className="flex justify-between items-end mb-6 border-b-2 border-black pb-2">
          <span className="text-xs font-bold bg-black text-white px-2 py-1">BATCH 2025</span>
          <span className="text-xs font-mono font-bold">DISPLAYING {currentPage} OF {totalPages}</span>
        </div>

        {/* The Grid (3x3 Compact) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr">
          <AnimatePresence mode='wait'>
            {currentProjects.map((item) => (
              <ProjectCard key={item.id} data={item} />
            ))}
          </AnimatePresence>
        </div>

        {/* --- PAGINATION --- */}
        <div className="mt-8 flex justify-between items-center border-t-2 border-black pt-4">
            <button 
              onClick={prevPage} disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black hover:bg-black hover:text-white transition-colors disabled:opacity-50 text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_#1a1a1a]"
            >
              <ChevronLeft size={16} /> Prev
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-3 h-3 border border-black ${currentPage === idx + 1 ? 'bg-[#CE203C]' : 'bg-transparent'}`}
                />
              ))}
            </div>

            <button 
              onClick={nextPage} disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black hover:bg-black hover:text-white transition-colors disabled:opacity-50 text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_#1a1a1a]"
            >
              Next <ChevronRight size={16} />
            </button>
        </div>
      </main>

      {/* Fixed Decoration Corner */}
      <div className="fixed bottom-4 right-4 z-20 hidden md:block">
         <Hash className="text-black/10 w-32 h-32" />
      </div>

    </div>
  )
}