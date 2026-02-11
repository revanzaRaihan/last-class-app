// src/components/MessagesSection.jsx
import { motion } from 'framer-motion'
import { Mail, MessageSquare, Star, AtSign, Send } from 'lucide-react'

// --- 1. REUSABLE ANIMATION COMPONENTS ---

const WordReveal = ({ text, className, delay = 0 }) => {
  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay } // Dipercepat stagger-nya
    })
  };
  const child = {
    visible: { 
      opacity: 1, y: 0, 
      transition: { type: "spring", damping: 12, stiffness: 200 } // Teks lebih cepat naik
    },
    hidden: { 
      opacity: 0, y: 20, 
      transition: { type: "spring", damping: 12, stiffness: 200 } 
    }
  };

  return (
    <motion.div 
      variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}
      className={`flex flex-wrap justify-center overflow-hidden ${className}`}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="mr-[0.25em] inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// --- DATA DUMMY ---
const messages = [
  { name: 'Wali Kelas', role: 'CLASS_MANAGER', initial: 'WK', color: 'bg-pink-100 text-pink-600', text: 'Sukses selalu anak-anakku. Pintu sekolah selalu terbuka!' },
  { name: 'Guru BK', role: 'DISCIPLINE_MOD', initial: 'BK', color: 'bg-purple-100 text-purple-600', text: 'Jaga attitude kalian di dunia kerja. Bangga sama kalian!' },
  { name: 'Ketua Kelas', role: 'SYSTEM_ADMIN', initial: 'KM', color: 'bg-blue-100 text-blue-600', text: 'Maaf sering marah pas nagih uang kas. Luv u all! 😭' },
  { name: 'Teman Sebangku', role: 'CO_PILOT', initial: 'TS', color: 'bg-yellow-100 text-yellow-600', text: 'Bakalan kangen nyontek codingan lu pas deadline. See you!' },
  { name: 'Adik Kelas', role: 'NEW_USER', initial: 'AK', color: 'bg-green-100 text-green-600', text: 'Kak, warisin projekan skripsinya dong hehe...' },
  { name: 'Satpam', role: 'SECURITY', initial: 'SS', color: 'bg-gray-100 text-gray-600', text: 'Jangan lupa helmnya dibawa ya mas, jangan ditinggal.' }
]

// --- COMPONENT KARTU PESAN ---
const MessageCard = ({ msg }) => (
  <div className="relative flex-shrink-0 w-[260px] md:w-[300px] bg-white border border-black rounded-lg p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(37,99,235,1)] hover:-translate-y-1 transition-all duration-300 mx-3 group cursor-pointer select-none">
      <div className="flex justify-between items-start mb-2 pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded border border-black flex items-center justify-center font-bold text-xs shadow-sm ${msg.color}`}>
            {msg.initial}
          </div>
          <div>
            <h3 className="font-bold text-xs md:text-sm text-slate-900 leading-none mb-0.5 flex items-center gap-1">
              {msg.name}
              {msg.initial === 'WK' && <Star size={10} className="text-yellow-500 fill-yellow-500" />} 
            </h3>
            <div className="flex items-center gap-1 text-[8px] font-mono text-gray-400 uppercase tracking-wider">
              <AtSign size={8} /> {msg.role}
            </div>
          </div>
        </div>
      </div>
      <p className="text-slate-700 text-[10px] md:text-xs leading-relaxed font-medium line-clamp-2">
        "{msg.text}"
      </p>
  </div>
)

// --- COMPONENT MARQUEE ROW ---
const MarqueeRow = ({ items, direction = 'left', speed = 20, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: direction === 'left' ? -20 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
      className="relative flex overflow-hidden py-3 bg-white/50 backdrop-blur-sm border-y border-gray-200"
    >
      <motion.div 
        className="flex"
        animate={{ 
          x: direction === 'left' ? ["0%", "-50%"] : ["-50%", "0%"] 
        }}
        transition={{ 
          ease: "linear", duration: speed, repeat: Infinity,
        }}
        style={{ width: "max-content" }}
      >
        {[...items, ...items, ...items, ...items].map((msg, i) => (
           <MessageCard key={i} msg={msg} />
        ))}
      </motion.div>
      <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-[#f8f9fa] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-[#f8f9fa] to-transparent z-10 pointer-events-none"></div>
    </motion.div>
  )
}

export default function MessagesSection() {
  return (
    <section className="relative h-[100dvh] w-full bg-[#f8f9fa] flex flex-col justify-between overflow-hidden text-slate-900 font-sans">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      {/* --- TOP STREAM --- */}
      <div className="w-full z-10 mt-safe pt-4 md:pt-0 hover:[&>div>div]:[animation-play-state:paused]">
         <MarqueeRow items={messages.slice(0, 3)} direction="left" speed={40} delay={0.2} />
      </div>

      {/* --- CENTER STAGE --- */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-20">
        
        {/* Badge */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }} 
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }} // Badge lebih cepat
          className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-black text-white rounded-full text-[10px] font-mono font-bold tracking-widest uppercase shadow-xl"
        >
           <Mail size={12} className="animate-pulse"/> INBOX (99+ MESSAGES)
        </motion.div>

        {/* Title */}
        <div className="mb-3 w-full max-w-4xl">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight text-slate-900">
              <WordReveal text="PESAN UNTUK" delay={0.1} />
            </h2>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
               <WordReveal text="KITA SEMUA" delay={0.3} />
            </h2>
        </div>
        
        {/* Subtitle */}
        <motion.p 
           initial={{ opacity: 0, y: 10 }} 
           whileInView={{ opacity: 1, y: 0 }} 
           viewport={{ once: true }}
           transition={{ delay: 0.5 }} // Muncul lebih cepat
           className="text-gray-500 font-mono text-[10px] md:text-sm max-w-sm md:max-w-md mx-auto mb-6 md:mb-8 leading-relaxed"
        >
          Arsip pesan terakhir dari warga sekolah sebelum server ditutup selamanya.
        </motion.p>

        {/* --- FAST POP BUTTON --- */}
        <motion.button 
           initial={{ scale: 0 }}
           whileInView={{ scale: 1 }}
           viewport={{ once: true }}
           // REVISI ANIMASI: Stiffness 500 (Sangat Cepat), Delay dikurangi
           transition={{ delay: 0.6, type: "spring", stiffness: 500, damping: 25 }}
           whileHover={{ scale: 1.05 }} 
           whileTap={{ scale: 0.95 }}
           // REVISI UKURAN: Padding dikurangi (px-5 py-2.5), Font diperkecil (text-xs/sm)
           className="group flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-md transition-all text-xs md:text-sm"
        >
           <MessageSquare size={14} />
           <span>Kirim Pesan Terakhir</span>
        </motion.button>

      </div>

      {/* --- BOTTOM STREAM --- */}
      <div className="w-full z-10 mb-safe pb-4 md:pb-0 hover:[&>div>div]:[animation-play-state:paused]">
         <MarqueeRow items={messages.slice(3, 6)} direction="right" speed={35} delay={0.4} />
      </div>

    </section>
  )
}