import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MessageSquare, Star, AtSign, X, Send, UserX, User, CheckCircle, Loader } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

// --- REUSABLE ANIMATION ---
const WordReveal = ({ text, className, delay = 0 }) => {
  const words = text.split(" ")
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: delay } }
  }
  const child = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 200 } },
    hidden: { opacity: 0, y: 20, transition: { type: "spring", damping: 12, stiffness: 200 } }
  }
  return (
    <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}
      className={`flex flex-wrap justify-center overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <motion.span variants={child} key={i} className="mr-[0.25em] inline-block">{word}</motion.span>
      ))}
    </motion.div>
  )
}

// --- SEED DATA ---
const seedMessages = [
  { name: 'Wali Kelas', role: 'CLASS_MANAGER', initial: 'WK', color: 'bg-pink-100 text-pink-600', text: 'Sukses selalu anak-anakku. Pintu sekolah selalu terbuka!', isStarred: true },
  { name: 'Guru BK', role: 'DISCIPLINE_MOD', initial: 'BK', color: 'bg-purple-100 text-purple-600', text: 'Jaga attitude kalian di dunia kerja. Bangga sama kalian!' },
  { name: 'Ketua Kelas', role: 'SYSTEM_ADMIN', initial: 'KM', color: 'bg-blue-100 text-blue-600', text: 'Maaf sering marah pas nagih uang kas. Luv u all! 😭' },
  { name: 'Teman Sebangku', role: 'CO_PILOT', initial: 'TS', color: 'bg-yellow-100 text-yellow-600', text: 'Bakalan kangen nyontek codingan lu pas deadline. See you!' },
  { name: 'Adik Kelas', role: 'NEW_USER', initial: 'AK', color: 'bg-green-100 text-green-600', text: 'Kak, warisin projekan skripsinya dong hehe...' },
  { name: 'Satpam', role: 'SECURITY', initial: 'SS', color: 'bg-gray-100 text-gray-600', text: 'Jangan lupa helmnya dibawa ya mas, jangan ditinggal.' }
]

const colorPool = [
  'bg-rose-100 text-rose-600',
  'bg-violet-100 text-violet-600',
  'bg-sky-100 text-sky-600',
  'bg-amber-100 text-amber-600',
  'bg-emerald-100 text-emerald-600',
  'bg-orange-100 text-orange-600',
  'bg-teal-100 text-teal-600',
  'bg-fuchsia-100 text-fuchsia-600',
]

// --- MESSAGE CARD ---
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
            {msg.isStarred && <Star size={10} className="text-yellow-500 fill-yellow-500" />}
            {msg.isAnon && <span className="text-[8px] font-mono bg-gray-100 text-gray-500 px-1 rounded">ANON</span>}
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

// --- MARQUEE ROW ---
const MarqueeRow = ({ items, direction = 'left', speed = 20, delay = 0 }) => {
  const doubled = [...items, ...items, ...items, ...items]
  return (
    <motion.div
      initial={{ opacity: 0, y: direction === 'left' ? -20 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="relative flex overflow-hidden py-3 bg-white/50 backdrop-blur-sm border-y border-gray-200"
    >
      <motion.div
        className="flex"
        animate={{ x: direction === 'left' ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ ease: "linear", duration: speed, repeat: Infinity }}
        style={{ width: "max-content" }}
      >
        {doubled.map((msg, i) => <MessageCard key={i} msg={msg} />)}
      </motion.div>
      <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-[#f8f9fa] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-[#f8f9fa] to-transparent z-10 pointer-events-none"></div>
    </motion.div>
  )
}

// --- MENFES MODAL ---
const MenfesModal = ({ onClose, onSubmit }) => {
  const [mode, setMode] = useState(null) // 'anon' | 'initial'
  const [initialText, setInitialText] = useState('')
  const [message, setMessage] = useState('')
  const [step, setStep] = useState(1) // 1: choose mode, 2: write message
  const [submitting, setSubmitting] = useState(false)

  const handleNext = () => {
    if (mode === 'initial' && !initialText.trim()) return
    setStep(2)
  }

  const handleSubmit = async () => {
    if (!message.trim()) return
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 600))
    onSubmit({
      name: mode === 'anon' ? 'Anonymous' : initialText.trim().toUpperCase().slice(0, 3),
      role: mode === 'anon' ? 'ANON_USER' : 'MENFES',
      initial: mode === 'anon' ? '??' : initialText.trim().toUpperCase().slice(0, 2),
      color: colorPool[Math.floor(Math.random() * colorPool.length)],
      text: message.trim(),
      isAnon: mode === 'anon',
      id: Date.now().toString(),
      ts: Date.now()
    })
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 40 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 28 } },
    exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } }
  }

  return (
    <motion.div
      variants={backdropVariants} initial="hidden" animate="visible" exit="hidden"
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="relative w-full max-w-md bg-white border-2 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Send size={14} className="text-white" />
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-900 tracking-tight">KIRIM MENFES</h3>
              <p className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">
                {step === 1 ? 'PILIH IDENTITAS' : 'TULIS PESANMU'}
              </p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
            <X size={14} className="text-gray-500" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <motion.div
            className="h-full bg-blue-600"
            animate={{ width: step === 1 ? '50%' : '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        <div className="px-5 py-5">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-xs text-gray-500 mb-4 font-medium">
                  Mau pakai identitas apa untuk pesanmu?
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  {/* Anonim */}
                  <button
                    onClick={() => setMode('anon')}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${mode === 'anon'
                      ? 'border-blue-600 bg-blue-50 shadow-[3px_3px_0px_0px_rgba(37,99,235,1)]'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${mode === 'anon' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <UserX size={20} />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-xs text-slate-900">Anonymous</p>
                      <p className="text-[9px] text-gray-400 font-mono">100% rahasia</p>
                    </div>
                  </button>

                  {/* Inisial */}
                  <button
                    onClick={() => setMode('initial')}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${mode === 'initial'
                      ? 'border-blue-600 bg-blue-50 shadow-[3px_3px_0px_0px_rgba(37,99,235,1)]'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${mode === 'initial' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <User size={20} />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-xs text-slate-900">Pakai Inisial</p>
                      <p className="text-[9px] text-gray-400 font-mono">misal: A.S / RDY</p>
                    </div>
                  </button>
                </div>

                {/* Inisial input */}
                <AnimatePresence>
                  {mode === 'initial' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mb-4"
                    >
                      <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                        Inisial / Nama Panggilan
                      </label>
                      <input
                        type="text"
                        maxLength={10}
                        value={initialText}
                        onChange={e => setInitialText(e.target.value)}
                        placeholder="contoh: RDY atau A.S"
                        className="w-full border-2 border-black rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:font-normal placeholder:text-gray-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={handleNext}
                  disabled={!mode || (mode === 'initial' && !initialText.trim())}
                  className="w-full bg-black text-white py-2.5 rounded-xl font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors shadow-[3px_3px_0px_0px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2"
                >
                  Lanjutkan →
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Preview badge */}
                <div className="flex items-center gap-2 mb-3 p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                  <div className={`w-7 h-7 rounded-lg border border-black flex items-center justify-center font-bold text-[10px] ${colorPool[0]}`}>
                    {mode === 'anon' ? '??' : initialText.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-900">{mode === 'anon' ? 'Anonymous' : initialText.toUpperCase()}</p>
                    <p className="text-[8px] font-mono text-gray-400">{mode === 'anon' ? '@ANON_USER' : '@MENFES'}</p>
                  </div>
                  <button onClick={() => setStep(1)} className="ml-auto text-[9px] font-mono text-blue-500 hover:underline">ganti</button>
                </div>

                <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                  Pesan kamu
                </label>
                <textarea
                  autoFocus
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  maxLength={200}
                  rows={4}
                  placeholder="Tulis pesanmu untuk semua... 💙"
                  className="w-full border-2 border-black rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-1"
                />
                <div className="text-right text-[9px] font-mono text-gray-400 mb-4">{message.length}/200</div>

                <div className="flex gap-2">
                  <button onClick={() => setStep(1)}
                    className="flex-1 border-2 border-gray-200 text-gray-600 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">
                    ← Kembali
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!message.trim() || submitting}
                    className="flex-[2] bg-blue-600 text-white py-2.5 rounded-xl font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2"
                  >
                    {submitting
                      ? <><Loader size={14} className="animate-spin" /> Mengirim...</>
                      : <><Send size={14} /> Kirim Pesan</>}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

// --- SUCCESS TOAST ---
const SuccessToast = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 60, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 40, scale: 0.9 }}
    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-black text-white px-5 py-3 rounded-full shadow-2xl border border-white/10 font-bold text-sm"
  >
    <CheckCircle size={16} className="text-green-400" />
    Pesanmu sudah masuk ke inbox! 💙
  </motion.div>
)

// --- MAIN EXPORT ---
export default function MessagesSection() {
  const [allMessages, setAllMessages] = useState(seedMessages)
  const [msgCount, setMsgCount] = useState(99)
  const [showModal, setShowModal] = useState(false)
  const [showToast, setShowToast] = useState(false)

  // Load saved messages from storage on mount
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const result = await window.storage.get('menfes-messages')
        if (result) {
          const saved = JSON.parse(result.value)
          setAllMessages([...seedMessages, ...saved])
          setMsgCount(99 + saved.length)
        }
      } catch (_) { /* no saved messages yet */ }
    }
    if (window.storage) loadMessages()
  }, [])

  const handleSubmit = async (newMsg) => {
    const updated = [...allMessages, newMsg]
    setAllMessages(updated)
    setMsgCount(c => c + 1)

    // Save only user-submitted messages
    const userMessages = updated.filter(m => !seedMessages.some(s => s.name === m.name && s.text === m.text))
    try {
      if (window.storage) {
        await window.storage.set('menfes-messages', JSON.stringify(userMessages))
      }
    } catch (_) {}

    setShowModal(false)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3500)
  }

  const topMessages = allMessages.slice(0, Math.ceil(allMessages.length / 2))
  const bottomMessages = allMessages.slice(Math.ceil(allMessages.length / 2))

  return (
    <section className="relative h-[100dvh] w-full bg-[#f8f9fa] flex flex-col justify-between overflow-hidden text-slate-900 font-sans">
      {/* Dot grid bg */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {/* --- TOP MARQUEE --- */}
      <div className="w-full z-10 mt-safe pt-4 md:pt-0">
        <MarqueeRow items={topMessages} direction="left" speed={40} delay={0.2} />
      </div>

      {/* --- CENTER --- */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-20">

        {/* Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-black text-white rounded-full text-[10px] font-mono font-bold tracking-widest uppercase shadow-xl"
        >
          <Mail size={12} className="animate-pulse" />
          INBOX ({msgCount}+ MESSAGES)
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

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 font-mono text-[10px] md:text-sm max-w-sm md:max-w-md mx-auto mb-6 md:mb-8 leading-relaxed"
        >
          Arsip pesan terakhir dari warga sekolah sebelum server ditutup selamanya.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, type: "spring", stiffness: 500, damping: 25 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="group flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-700 transition-all text-xs md:text-sm"
        >
          <MessageSquare size={14} />
          <span>Kirim Pesan Terakhir</span>
        </motion.button>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.9 }}
          className="mt-3 text-[9px] font-mono text-gray-400 flex items-center gap-1"
        >
          <UserX size={9} /> bisa anonim • pesan tersimpan permanen
        </motion.p>
      </div>

      {/* --- BOTTOM MARQUEE --- */}
      <div className="w-full z-10 mb-safe pb-4 md:pb-0">
        <MarqueeRow items={bottomMessages.length > 0 ? bottomMessages : seedMessages.slice(3)} direction="right" speed={35} delay={0.4} />
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {showModal && (
          <MenfesModal onClose={() => setShowModal(false)} onSubmit={handleSubmit} />
        )}
      </AnimatePresence>

      {/* --- TOAST --- */}
      <AnimatePresence>
        {showToast && <SuccessToast onClose={() => setShowToast(false)} />}
      </AnimatePresence>
    </section>
  )
}