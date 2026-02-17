// src/components/ClosingScreen.jsx
import { memo } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Instagram, Terminal, Power, X, Minus, Square, ScanLine, Activity, Cpu } from 'lucide-react'

// ─── Konstanta di luar komponen — tidak dibuat ulang tiap render ──────────────
const NOISE_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
const GRID_BG  = 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)'

const TICKER_TEXT_TOP = 'SYSTEM SHUTDOWN INITIATED // SAVING MEMORIES //  '
const TICKER_TEXT_BOT = 'BATCH 2026 // SIGNING OFF // GOOD LUCK //  '

// ─── Ticker — memo agar tidak re-render jika prop tidak berubah ───────────────
const Ticker = memo(({ text, direction = 1, speed = 20, className }) => (
  <div className={`flex overflow-hidden whitespace-nowrap select-none ${className}`}>
    <motion.div
      className="flex gap-4 font-mono font-bold uppercase"
      style={{ willChange: 'transform' }}
      animate={{ x: direction > 0 ? [0, -1000] : [-1000, 0] }}
      transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
    >
      {/* Cukup 8 repetisi, tidak perlu 10 */}
      {Array.from({ length: 8 }, (_, i) => (
        <span key={i} className="opacity-30 text-xs md:text-sm">{text}</span>
      ))}
    </motion.div>
  </div>
))
Ticker.displayName = 'Ticker'

// ─── WordReveal — memo ────────────────────────────────────────────────────────
const WordReveal = memo(({ text, className, delay = 0 }) => {
  const words = text.split(' ')
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: delay } },
  }
  const child = {
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 200 } },
    hidden:  { opacity: 0, y: 20, transition: { type: 'spring', damping: 12, stiffness: 200 } },
  }
  return (
    <motion.div
      variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}
      className={`flex flex-wrap justify-center overflow-hidden ${className}`}
    >
      {words.map((word, i) => (
        <motion.span variants={child} key={i} className="mr-[0.25em] inline-block">{word}</motion.span>
      ))}
    </motion.div>
  )
})
WordReveal.displayName = 'WordReveal'

// ─── MAIN ─────────────────────────────────────────────────────────────────────
function ClosingScreen() {
  return (
    <motion.div
      className="relative h-screen w-full bg-[#f8f9fa] flex flex-col items-center justify-center text-slate-900 px-4 overflow-hidden font-sans"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
           style={{ backgroundImage: GRID_BG, backgroundSize: '40px 40px' }} />
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none mix-blend-multiply"
           style={{ backgroundImage: NOISE_BG }} />

      {/* Tickers */}
      <div className="absolute top-0 left-0 w-full bg-slate-100 border-b border-gray-300 py-1 z-0">
        <Ticker text={TICKER_TEXT_TOP} speed={40} />
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-slate-100 border-t border-gray-300 py-1 z-0">
        <Ticker text={TICKER_TEXT_BOT} direction={-1} speed={35} />
      </div>

      {/* Main Window */}
      <div className="relative z-10 w-full max-w-2xl">
        <div className="absolute -top-20 left-1/2 w-px h-20 bg-black/20 hidden md:block" />

        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 40 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          className="bg-white border-[3px] border-black shadow-[12px_12px_0px_0px_rgba(37,99,235,1)] p-1"
        >
          {/* Window Header */}
          <div className="bg-black text-white flex justify-between items-center px-3 py-2 mb-6">
            <div className="flex items-center gap-2 font-mono font-bold text-xs tracking-widest">
              <Terminal size={14} className="text-blue-400" /> END_SESSION.LOG
            </div>
            <div className="flex gap-1">
              <Minus size={14} className="cursor-pointer hover:text-blue-400" />
              <Square size={10} className="cursor-pointer hover:text-blue-400" />
              <X size={14} className="cursor-pointer hover:text-red-500" />
            </div>
          </div>

          {/* Window Body */}
          <div className="px-6 pb-8 text-center flex flex-col items-center">
            {/* Status */}
            <div className="flex items-center gap-2 mb-4 border border-black px-3 py-1 bg-green-100 text-xs font-mono font-bold uppercase tracking-wide">
              <div className="w-2 h-2 bg-green-500 animate-pulse" />
              Mission Accomplished
            </div>

            {/* Typography */}
            <div className="mb-6 relative">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-slate-900 mb-1">
                <WordReveal text="SEE YOU" delay={0.2} />
              </h1>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-black">
                <WordReveal text="ON TOP" delay={0.4} />
              </h1>
              {/* Stamp */}
              <motion.div
                initial={{ opacity: 0, rotate: 45, scale: 1.8 }}
                animate={{ opacity: 1, rotate: -12, scale: 1 }}
                transition={{ delay: 0.9, type: 'spring' }}
                className="absolute -top-4 -right-8 md:-right-12 w-20 h-20 md:w-24 md:h-24 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-xs md:text-sm border-2 border-white shadow-lg opacity-90 rotate-12 z-10"
              >
                <div className="text-center leading-none border border-white/50 rounded-full w-full h-full flex items-center justify-center p-1">
                  CLASS<br />OF<br />2026
                </div>
              </motion.div>
            </div>

            {/* Stats Grid */}
            <div className="w-full grid grid-cols-3 gap-2 mb-8 font-mono text-[10px] md:text-xs">
              <div className="border border-gray-300 p-2 bg-slate-50 flex flex-col items-center gap-1">
                <Cpu size={14} className="text-blue-600" />
                <span className="font-bold">CPU: IDLE</span>
              </div>
              <div className="border border-gray-300 p-2 bg-slate-50 flex flex-col items-center gap-1">
                <Activity size={14} className="text-green-600" />
                <span className="font-bold">STATUS: OK</span>
              </div>
              <div className="border border-gray-300 p-2 bg-slate-50 flex flex-col items-center gap-1">
                <ScanLine size={14} className="text-red-600" />
                <span className="font-bold">MEM: 100%</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
              <motion.button
                onClick={() => window.location.reload()}
                whileHover={{ scale: 1.02, boxShadow: '4px 4px 0px 0px black' }}
                whileTap={{ scale: 0.98, boxShadow: '0px 0px 0px 0px black', translate: '2px 2px' }}
                className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-black py-3 font-bold uppercase tracking-wider text-xs md:text-sm hover:bg-slate-50 transition-all"
              >
                <RefreshCw size={16} /> Replay
              </motion.button>

              <motion.a
                href="#"
                whileHover={{ scale: 1.02, boxShadow: '4px 4px 0px 0px rgba(37,99,235,1)' }}
                whileTap={{ scale: 0.98, boxShadow: '0px 0px 0px 0px black', translate: '2px 2px' }}
                className="flex-1 flex items-center justify-center gap-2 bg-black text-white border-2 border-black py-3 font-bold uppercase tracking-wider text-xs md:text-sm hover:bg-blue-700 hover:border-blue-700 transition-all"
              >
                <Instagram size={16} /> Follow Us
              </motion.a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t-2 border-black bg-gray-100 px-3 py-1 flex justify-between items-center text-[9px] font-mono text-gray-500">
            <span>PID: 202688</span>
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400" /> DISCONNECTED
            </span>
          </div>
        </motion.div>
      </div>

      {/* Decorative — hanya desktop */}
      <div className="absolute top-20 left-10 hidden md:block opacity-20">
        <div className="w-32 h-32 border border-black rounded-full flex items-center justify-center animate-[spin_12s_linear_infinite]">
          <div className="w-2 h-2 bg-black rounded-full absolute top-0" />
          <div className="w-full h-px bg-black" />
          <div className="h-full w-px bg-black" />
        </div>
      </div>

      <div className="absolute bottom-20 right-10 hidden md:flex flex-col gap-1 opacity-40">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="w-20 h-1 bg-black/20" />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-16 flex flex-col items-center gap-1 cursor-pointer group"
        onClick={() => window.close()}
      >
        <Power size={24} className="text-red-500 group-hover:scale-125 transition-transform" />
        <span className="text-[8px] font-mono font-bold text-red-500">POWER OFF</span>
      </motion.div>
    </motion.div>
  )
}

export default memo(ClosingScreen)