// src/components/MomentsSection.jsx
import { motion } from 'framer-motion'
import { Hash, Maximize2, X, Minus, Square, FileImage, ScanLine, Crosshair, Terminal, FileWarning } from 'lucide-react'

// --- DUMMY DATA (CYBER FRAGMENTS - KONSISTEN BIRU/HITAM) ---
// Tidak ada properti warna individu, semua diatur di komponen agar seragam.
const cyberFragments = [
  { id: 1, label: 'SYS_DATA_01.RAW', type: 'img', size: '2.4MB', top: '10%', left: '5%', rot: -3, z: 2 },
  { id: 2, label: 'ERR_LOG_2025.TXT', type: 'txt', size: '12KB', top: '15%', left: '75%', rot: 2, z: 1 },
  { id: 3, label: 'CORRUPTED_MEM.DAT', type: 'err', size: 'Unknown', top: '60%', left: '8%', rot: -5, z: 3 },
  { id: 4, label: 'GRAD_PROJECT_FINAL', type: 'img', size: '1GB', top: '65%', left: '70%', rot: 4, z: 2 },
  { id: 5, label: 'WIN_TROPHY_SCAN', type: 'img', size: 'RAW', top: '25%', left: '25%', rot: 1, z: 1 },
  { id: 6, label: 'AUDIO_REC_BAND.WAV', type: 'txt', size: '4MB', top: '80%', left: '40%', rot: -3, z: 2 },
  { id: 7, label: 'CLASSMEET_RESULTS', type: 'img', size: 'DAT', top: '5%', left: '50%', rot: 5, z: 1 },
  { id: 8, label: 'CACHE_DUMP_AFK', type: 'txt', size: 'Temp', top: '45%', left: '85%', rot: -2, z: 3 },
  { id: 9, label: 'LIBRARY_ACCESS_KEY', type: 'err', size: 'Encrypted', top: '85%', left: '15%', rot: 3, z: 1 },
  { id: 10, label: 'STAGE_CAM_FOOTAGE', type: 'img', size: 'Rec', top: '35%', left: '5%', rot: -4, z: 2 },
]

// --- COMPONENT: CYBER CARD (KEMBALI KE GAYA KERAS/BRUTAL) ---
const CyberCard = ({ item, index }) => {
  // Ikon berdasarkan tipe file
  const Icon = item.type === 'img' ? FileImage : item.type === 'err' ? FileWarning : Terminal;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        type: "spring", stiffness: 200, damping: 15, delay: index * 0.08 
      }}
      whileHover={{ 
        scale: 1.1, zIndex: 50, rotate: 0,
        backgroundColor: '#000000', color: '#ffffff', borderColor: '#000000'
      }}
      drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.1}
      // ESTETIKA UTAMA: Border Tebal Hitam, Hard Shadow Biru, Background Putih, Sudut Tajam
      className="absolute w-36 h-44 md:w-48 md:h-56 bg-white border-[3px] border-black p-2 flex flex-col shadow-[5px_5px_0px_0px_rgba(37,99,235,1)] hover:shadow-[8px_8px_0px_0px_rgba(37,99,235,0.8)] transition-all cursor-crosshair group select-none"
      style={{ 
        top: item.top, left: item.left, rotate: `${item.rot}deg`, zIndex: item.z
      }}
    >
      {/* Header Card (Window Bar Style) */}
      <div className="flex justify-between items-center border-b-2 border-black pb-1 mb-2 bg-gray-50 group-hover:bg-gray-900 transition-colors px-1">
        <div className="flex gap-1">
           <div className="w-2 h-2 bg-black group-hover:bg-blue-500"></div>
           <div className="w-2 h-2 border border-black group-hover:border-white"></div>
        </div>
        <span className="text-[8px] font-mono font-bold uppercase tracking-tighter truncate max-w-[80px]">
          ID: {item.id.toString().padStart(4, '0')}
        </span>
      </div>

      {/* Content Area (Placeholder Data) */}
      <div className="flex-1 border-2 border-black bg-blue-50/50 group-hover:bg-blue-900/20 relative overflow-hidden flex items-center justify-center">
         {/* Scanline Overlay */}
         <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0,0,255,0.2) 50%)', backgroundSize: '100% 4px' }}></div>
         <Icon size={32} className="text-blue-600 group-hover:text-white transition-colors" strokeWidth={2} />
         
         {/* Decorative Tech Corners */}
         <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-black group-hover:border-blue-400"></div>
         <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-black group-hover:border-blue-400"></div>
      </div>

      {/* Footer Info */}
      <div className="mt-2 flex justify-between items-end font-mono text-[10px] leading-none">
        <div className="flex flex-col truncate pr-2">
          <span className="font-bold truncate">{item.label}</span>
          <span className="text-[8px] opacity-70 mt-0.5 font-bold text-blue-600 group-hover:text-blue-300">SIZE: {item.size}</span>
        </div>
        <ScanLine size={12} className="opacity-50 group-hover:text-blue-400" />
      </div>
    </motion.div>
  )
}

export default function MomentsSection() {
  return (
    // Menggunakan background #f8f9fa agar konsisten dengan section lain
    <section className="relative min-h-[100dvh] w-full bg-[#f8f9fa] overflow-hidden flex items-center justify-center font-sans">
      
      {/* --- BACKGROUND AESTHETIC (KONSISTEN) --- */}
      {/* 1. Grid Dasar (Sama seperti Intro/Stats) */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      {/* 2. Noise Texture (Sama seperti Intro) */}
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}></div>

      {/* 3. Blue Tint Overlay (Memberi nuansa biru dingin seperti referensi, tapi halus) */}
      <div className="absolute inset-0 z-0 bg-blue-900 mix-blend-overlay opacity-[0.08] pointer-events-none"></div>

      {/* --- SCATTERED CYBER FRAGMENTS --- */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
         {cyberFragments.map((item, index) => (
            <CyberCard key={item.id} item={item} index={index} />
         ))}
      </div>

      {/* --- CENTER CONTENT (BRUTALIST WINDOW STYLE) --- */}
      <div className="relative z-20 px-4">
        
        {/* Main Window Container - Border Tebal & Hard Shadow Biru */}
        <motion.div 
           initial={{ scale: 0.9, opacity: 0, y: 20 }}
           whileInView={{ scale: 1, opacity: 1, y: 0 }}
           transition={{ duration: 0.5, ease: "circOut" }}
           className="bg-white border-[3px] border-black shadow-[10px_10px_0px_0px_rgba(37,99,235,1)] max-w-lg w-full mx-auto"
        >
           {/* Title Bar (Solid Blue Header) */}
           <div className="bg-blue-600 text-white flex justify-between items-center px-3 py-2 border-b-[3px] border-black">
              <div className="flex items-center gap-2 font-mono font-bold text-xs uppercase tracking-widest">
                 <Terminal size={14} className="text-white" /> GALLERY_SYS_VIEW
              </div>
              {/* Fake Window Controls (Kotak-kotak tajam) */}
              <div className="flex gap-1">
                 <div className="w-4 h-4 bg-white border border-black flex items-center justify-center cursor-pointer hover:bg-black hover:border-white group"><Minus size={8} className="text-black group-hover:text-white"/></div>
                 <div className="w-4 h-4 bg-white border border-black flex items-center justify-center cursor-pointer hover:bg-black hover:border-white group"><Square size={6} className="text-black group-hover:text-white"/></div>
                 <div className="w-4 h-4 bg-blue-100 border border-black flex items-center justify-center cursor-pointer hover:bg-red-600 hover:border-black group"><X size={10} className="text-black group-hover:text-white"/></div>
              </div>
           </div>

           {/* Content Body */}
           <div className="p-6 md:p-8 text-center flex flex-col items-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
              
              {/* Typography: Berat & Agresif */}
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-1 leading-none relative inline-block">
                 DATABASE
                 {/* Sticker Dekorasi */}
                 <span className="absolute -top-2 -right-8 text-white text-xs font-mono tracking-widest rotate-12 bg-blue-600 border border-black px-2 py-0.5 hidden md:block">
                    ENC.
                 </span>
              </h2>
              
              {/* Gradient Text Konsisten (Biru ke Cyan/Hitam) */}
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-slate-900 leading-none mb-6">
                 KENANGAN
              </h2>

              {/* Description Box style terminal */}
              <div className="font-mono text-xs md:text-sm text-slate-700 max-w-sm leading-relaxed border-l-[3px] border-blue-600 pl-4 text-left bg-blue-50/50 p-3 w-full">
                 <p>> Initializing memory scan...</p>
                 <p>> Found 10+ fragmented moments.</p>
                 <p className="animate-pulse font-bold text-blue-700">> Awaiting user input_</p>
              </div>

              {/* Brutalist Button: Tajam, Hard Shadow */}
              <motion.button 
                 whileHover={{ scale: 1.02, boxShadow: "6px 6px 0px 0px black", translateX: "-2px", translateY: "-2px" }}
                 whileTap={{ scale: 0.98, boxShadow: "2px 2px 0px 0px black", translateX: "2px", translateY: "2px" }}
                 className="mt-8 flex items-center gap-3 bg-black text-white px-8 py-4 font-bold uppercase tracking-widest border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] transition-all relative overflow-hidden group"
              >
                 <Maximize2 size={18} className="relative z-10 group-hover:animate-pulse"/>
                 <span className="relative z-10">BUKA_ARSIP.EXE</span>
                 {/* Hover fill effect */}
                 <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
              </motion.button>
           </div>

        </motion.div>
      </div>
      
      {/* --- DECORATIVE CROSSHAIRS (Sudut Layar - Konsisten Biru/Hitam) --- */}
      <Crosshair className="absolute top-4 left-4 text-blue-600/50 w-6 h-6 pointer-events-none" strokeWidth={1.5} />
      <Crosshair className="absolute bottom-4 right-4 text-blue-600/50 w-6 h-6 pointer-events-none" strokeWidth={1.5} />
      <Crosshair className="absolute top-4 right-4 text-slate-900/30 w-6 h-6 pointer-events-none" strokeWidth={1.5} />
      <Crosshair className="absolute bottom-4 left-4 text-slate-900/30 w-6 h-6 pointer-events-none" strokeWidth={1.5} />

    </section>
  )
}