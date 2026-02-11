import { motion } from 'framer-motion'
import { ArrowRight, Terminal, Code2, Wifi, Zap } from 'lucide-react'

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

// --- 2. MAIN COMPONENT ---

export default function IntroScreen({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: -100, opacity: 0, transition: { duration: 0.5 } }}
      // Menggunakan h-[100dvh] dan overflow-hidden agar pas satu layar
      className="relative h-[100dvh] w-full bg-[#f8f9fa] text-slate-900 overflow-hidden font-sans selection:bg-blue-600 selection:text-white"
    >
      {/* ================= BACKGROUND LAYERS ================= */}
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}></div>
      
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '64px 64px' }}></div>

      {/* Watermark diperkecil sedikit agar tidak mendominasi */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none"
      >
        <span className="text-[25vw] font-black tracking-tighter text-blue-900 leading-none">26</span>
      </motion.div>

      {/* ================= UI FRAME ================= */}
      
      {/* Header: Padding diperkecil (p-4) */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-center h-16"
      >
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-lg shadow-sm">
            <Code2 size={18} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-bold text-xs md:text-sm tracking-wide">RPL_REWIND</h3>
            <p className="hidden sm:block text-[9px] text-gray-500 font-mono">MEMOAR V1.0</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm flex items-center gap-2 text-[10px] font-mono">
           <div className="flex gap-1">
             <span className="w-1.5 h-1.5 rounded-full bg-red-500"/>
             <span className="w-1.5 h-1.5 rounded-full bg-green-500"/>
           </div>
           <span className="text-gray-300">|</span>
           <span className="font-bold text-blue-600">BATCH 23-26</span>
        </div>
      </motion.header>

      {/* ================= MAIN CONTENT ================= */}
      {/* Layout Flex Column yang Rapat */}
      <main className="relative z-10 h-full flex flex-col items-center justify-center px-4 w-full pt-10">
        
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto w-full">
          
          {/* 1. Status Badge (Margin dikurangi) */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mb-4 inline-flex items-center gap-2 px-2 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-bold tracking-wider uppercase"
          >
            <Wifi size={10} /> Connected
          </motion.div>

          {/* 2. Main Title (UKURAN FONT DIOPTIMALKAN UNTUK LAPTOP) */}
          {/* md:text-7xl sudah cukup besar untuk laptop, tidak perlu 9xl */}
          <div className="relative mb-2 w-full">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-slate-900 mix-blend-darken">
              <WordReveal text="KELAS XII" delay={0.4} />
              <span className="text-blue-600 block mt-1 md:mt-2">
                 <WordReveal text="SOFTWARE ENG." delay={0.7} />
              </span>
            </h1>
          </div>

          {/* 3. Subtitle (Lebih Rapat) */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="flex items-center gap-3 text-gray-500 font-mono text-[10px] md:text-xs mb-6 md:mb-8 mt-2"
          >
            <span>EST. 2023</span>
            <div className="h-px w-8 bg-gray-300"></div>
            <span>SMK JURUSAN RPL</span>
            <div className="h-px w-8 bg-gray-300"></div>
            <span>GRAD. 2026</span>
          </motion.div>

          {/* 4. Quote Card & Button Group (Vertical Stack Rapat) */}
          <div className="flex flex-col items-center gap-6 md:gap-8 w-full">
            
            {/* Quote Card - Scale down slightly on laptop */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="relative w-full max-w-[320px] md:max-w-md"
            >
              <div className="absolute inset-0 bg-black rounded-xl translate-x-1 translate-y-1"></div>
              <div className="relative bg-white border-2 border-black p-3 md:p-4 rounded-xl flex gap-3 items-start text-left">
                <div className="bg-blue-100 p-1.5 rounded text-blue-600 shrink-0">
                  <Terminal size={16} />
                </div>
                <div>
                  <p className="font-bold text-[9px] text-gray-400 mb-0.5 font-mono">SYSTEM_MESSAGE</p>
                  <p className="text-xs md:text-sm font-medium leading-snug text-slate-800">
                    "Kenangan kita tidak bisa di-<i>debug</i>, tapi bisa kita <i>replay</i> selamanya."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.8 }}
              onClick={onNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-bold text-sm shadow-lg shadow-blue-600/20 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                JELAJAHI MEMORI <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
            </motion.button>
          </div>

        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <motion.footer 
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-3 left-0 right-0 px-4 md:px-6 flex justify-between items-end text-[9px] font-mono text-gray-400 uppercase tracking-widest h-10"
      >
        <span className="flex items-center gap-1"><Zap size={10} className="text-yellow-500"/> POWERED BY MEMORIES</span>
        
        <div className="flex items-center gap-3">
           <span className="hidden md:inline hover:text-blue-600 cursor-pointer">Instagram</span>
           <span className="text-blue-600 font-bold">READY</span>
        </div>
      </motion.footer>

    </motion.div>
  )
}