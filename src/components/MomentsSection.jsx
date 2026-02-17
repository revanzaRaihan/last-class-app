import { memo, useState, useEffect, useMemo, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { Maximize2, X, Minus, ScanLine, Crosshair, Terminal, ZoomIn } from 'lucide-react'

const cyberFragments = [
  { id: 1, label: 'pic1.jpeg', img: '/images/pic1.jpeg', size: '2.4MB', top: '10%', left: '5%',  rot: -3, z: 2, title: 'Hari Pertama Masuk',   desc: 'Momen tak terlupakan saat pertama kali menginjakkan kaki di sekolah ini. Penuh harapan dan sedikit grogi, tapi semua terasa mungkin.' },
  { id: 2, label: 'pic2.jpeg', img: '/images/pic2.jpeg', size: '1.8MB', top: '15%', left: '75%', rot: 2,  z: 1, title: 'Upacara Bendera',       desc: 'Setiap Senin pagi, berdiri tegak di bawah terik matahari. Bukan hukuman, tapi ritual yang selalu bikin rindu setelah lulus.' },
  { id: 3, label: 'pic3.jpeg', img: '/images/pic3.jpeg', size: '3.1MB', top: '60%', left: '8%',  rot: -5, z: 3, title: 'Malam Keakraban',       desc: 'Api unggun menyala, tawa membahana. Malam inilah kita pertama kali benar-benar saling mengenal satu sama lain.' },
  { id: 4, label: 'pic4.jpeg', img: '/images/pic4.jpeg', size: '1.2MB', top: '65%', left: '70%', rot: 4,  z: 2, title: 'Study Group Deadliner', desc: 'Begadang bersama menjelang deadline, kopi dingin dan layar laptop yang menyilaukan. Penderitaan terbaik yang pernah ada.' },
  { id: 5, label: 'pic5.jpeg', img: '/images/pic5.jpeg', size: '4.5MB', top: '25%', left: '25%', rot: 1,  z: 1, title: 'Lomba Antar Kelas',     desc: 'Semangat menggebu demi kelas tercinta. Menang atau kalah, yang penting hype-nya sudah di level dewa.' },
  { id: 6, label: 'pic6.jpeg', img: '/images/pic6.jpeg', size: '2.9MB', top: '80%', left: '40%', rot: -3, z: 2, title: 'Kantin & Cerita',        desc: 'Kursi plastik dan meja lipat jadi saksi bisu ribuan percakapan, drama, dan rencana besar yang lahir di antara suap nasi.' },
  { id: 7, label: 'pic7.jpeg', img: '/images/pic7.jpeg', size: '3.4MB', top: '5%',  left: '50%', rot: 5,  z: 1, title: 'Prakerin Chronicles',    desc: 'Pertama kali merasakan dunia kerja yang sesungguhnya. Deg-degan, gugup, tapi bangga setengah mati bisa lolos.' },
  { id: 8, label: 'pic8.jpeg', img: '/images/pic8.jpeg', size: '1.5MB', top: '45%', left: '85%', rot: -2, z: 3, title: 'Foto Kelas Resmi',       desc: 'Semua berpose terbaik, seragam rapi, senyum dipaksakan. Tapi di balik layar, ada tawa yang jauh lebih nyata.' },
  { id: 9, label: 'pic9.jpeg', img: '/images/pic9.jpeg', size: '2.1MB', top: '85%', left: '15%', rot: 3,  z: 1, title: 'Hari Terakhir',          desc: 'Ruang kelas terasa berbeda hari ini. Lebih hening, lebih berat. Ternyata perpisahan itu benar-benar nyata adanya.' },
]

// ─── MOBILE: 3 fragment saja, posisi safe ────────────────────────────────────
const mobileFragments = [
  { ...cyberFragments[0], top: '8%',  left: '5%',  rot: -3 },
  { ...cyberFragments[2], top: '38%', left: '55%', rot: 3  },
  { ...cyberFragments[8], top: '68%', left: '10%', rot: -2 },
]

// ─── MODAL ────────────────────────────────────────────────────────────────────
const CyberModal = memo(({ item, onClose }) => {
  if (!item) return null
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
        <motion.div
          className="relative bg-white border-[3px] border-black shadow-[10px_10px_0px_0px_rgba(37,99,235,1)] w-full max-w-md z-10 overflow-hidden"
          initial={{ scale: 0.88, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 24 }}
          transition={{ type: 'spring', stiffness: 340, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Title Bar */}
          <div className="bg-blue-600 text-white flex justify-between items-center px-3 py-2 border-b-[3px] border-black">
            <div className="flex items-center gap-2 font-mono font-bold text-xs uppercase tracking-widest">
              <Terminal size={12} />
              FILE_{item.id.toString().padStart(4, '0')}.JPEG
            </div>
            <button
              onClick={onClose}
              className="w-5 h-5 bg-white border border-black flex items-center justify-center hover:bg-red-500 transition-colors group"
            >
              <X size={10} className="text-black group-hover:text-white" />
            </button>
          </div>

          {/* Image */}
          <div className="relative w-full border-b-[3px] border-black" style={{ paddingBottom: '75%' }}>
            <img
              src={item.img}
              alt={item.label}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              onError={(e) => { e.target.style.background = '#cbd5e1' }}
            />
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/80 text-white px-2 py-1 font-mono text-[9px] font-bold uppercase">
              <ScanLine size={9} /> {item.label} · {item.size}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h2 className="font-black text-slate-900 text-xl leading-tight tracking-tighter mb-3 border-l-[4px] border-blue-600 pl-3">
              {item.title}
            </h2>
            <div className="bg-slate-900 border-2 border-black p-3 font-mono text-xs text-green-400 leading-relaxed mb-4">
              <span className="text-blue-400">{'> '}</span>
              <span className="text-white/80">{item.desc}</span>
            </div>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 font-bold uppercase text-[10px] tracking-widest border-2 border-black"
              >
                <X size={10} /> CLOSE_FILE
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
})
CyberModal.displayName = 'CyberModal'

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE CARD — ZERO framer-motion hooks, murni CSS
// Tidak ada useMotionValue / useSpring / useTransform sama sekali
// ─────────────────────────────────────────────────────────────────────────────
const MobileCard = memo(({ item, onCardClick }) => {
  return (
    <div
      onClick={() => onCardClick(item)}
      className="absolute w-32 h-44 bg-white border-[3px] border-black p-1.5 flex flex-col cursor-pointer select-none overflow-hidden"
      style={{
        top: item.top,
        left: item.left,
        rotate: `${item.rot}deg`,          // CSS rotate, bukan JS
        zIndex: item.z,
        boxShadow: '4px 4px 0px 0px rgba(37,99,235,1)',
        // Tidak pakai willChange — tidak ada animasi JS di sini
      }}
    >
      <div className="flex justify-between items-center border-b-2 border-black pb-1 mb-1.5 px-0.5">
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-black" />
          <div className="w-1.5 h-1.5 border border-black" />
        </div>
        <span className="text-[7px] font-mono font-bold uppercase">
          ID: {item.id.toString().padStart(4, '0')}
        </span>
      </div>

      <div className="flex-1 border-2 border-black bg-slate-200 relative overflow-hidden">
        <img
          src={item.img}
          alt={item.label}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          // Grayscale via CSS, tidak ada transition JS
          style={{ filter: 'grayscale(100%)' }}
          onError={(e) => { e.target.style.background = '#cbd5e1' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <ZoomIn size={18} className="text-white drop-shadow-md opacity-70" />
        </div>
      </div>

      <div className="mt-1 font-mono text-[8px] font-bold truncate text-slate-700">
        {item.label}
      </div>
    </div>
  )
})
MobileCard.displayName = 'MobileCard'

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP CARD — full parallax + drag + framer-motion
// Hanya di-render di desktop, tidak pernah mount di mobile
// ─────────────────────────────────────────────────────────────────────────────
const DesktopCard = memo(({ item, index, mouseX, mouseY, isUnlocked, onImageLoad, onCardClick }) => {
  const factor = useMemo(() => (index % 3 + 1) * 25, [index])

  const tx = useTransform(mouseX, (v) => (v - window.innerWidth  / 2) / factor)
  const ty = useTransform(mouseY, (v) => (v - window.innerHeight / 2) / factor)

  const x = useSpring(tx, { stiffness: 55, damping: 25 })
  const y = useSpring(ty, { stiffness: 55, damping: 25 })

  if (!isUnlocked) return null

  return (
    <motion.div
      style={{
        top: item.top, left: item.left,
        rotate: `${item.rot}deg`,
        zIndex: item.z,
        x, y,
        willChange: 'transform',
      }}
      initial={{ opacity: 0, scale: 0.85, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 90, damping: 20 }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 50, transition: { duration: 0.2 } }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onClick={() => onCardClick(item)}
      className="absolute w-48 h-64 bg-white border-[3px] border-black p-2 flex flex-col shadow-[5px_5px_0px_0px_rgba(37,99,235,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-200 cursor-crosshair group select-none overflow-hidden"
    >
      <div className="flex justify-between items-center border-b-2 border-black pb-1 mb-2 bg-gray-50 group-hover:bg-black transition-colors duration-300 px-1">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-black group-hover:bg-blue-500 transition-colors" />
          <div className="w-2 h-2 border border-black group-hover:border-white transition-colors" />
        </div>
        <span className="text-[8px] font-mono font-bold uppercase truncate max-w-[80px] group-hover:text-white transition-colors">
          ID: {item.id.toString().padStart(4, '0')}
        </span>
      </div>

      <div className="flex-1 border-2 border-black bg-slate-300 relative overflow-hidden group-hover:border-blue-600 transition-colors duration-300">
        <img
          src={item.img}
          alt={item.label}
          loading="lazy"
          decoding="async"
          onLoad={onImageLoad}
          onError={onImageLoad}
          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-colors duration-300 flex items-center justify-center">
          <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
        </div>
      </div>

      <div className="mt-2 flex justify-between items-end font-mono text-[10px] group-hover:text-black transition-colors">
        <div className="flex flex-col truncate pr-2">
          <span className="font-bold truncate">{item.label}</span>
          <span className="text-[8px] font-bold text-blue-600 group-hover:text-blue-800 transition-colors">SIZE: {item.size}</span>
        </div>
        <ScanLine size={12} className="opacity-50 group-hover:opacity-100" />
      </div>
    </motion.div>
  )
})
DesktopCard.displayName = 'DesktopCard'

// ─── MAIN ─────────────────────────────────────────────────────────────────────
function MomentsSection() {
  // mouseX/Y hanya dipakai desktop — inisialisasi di center
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth  / 2 : 0)
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0)

  const [unlockedCount, setUnlockedCount] = useState(1)
  const [selectedItem,  setSelectedItem]  = useState(null)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  // Resize throttled
  useEffect(() => {
    let t = null
    const onResize = () => {
      clearTimeout(t)
      t = setTimeout(() => setIsMobile(window.innerWidth < 768), 200)
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => { window.removeEventListener('resize', onResize); clearTimeout(t) }
  }, [])

  // Mouse move — HANYA desktop
  useEffect(() => {
    if (isMobile) return
    const onMove = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY) }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [isMobile, mouseX, mouseY])

  const handleImageLoad = useCallback((index) => {
    setUnlockedCount((prev) => (index + 1 === prev ? prev + 1 : prev))
  }, [])

  const handleCardClick  = useCallback((item) => setSelectedItem(item), [])
  const handleCloseModal = useCallback(() => setSelectedItem(null), [])

  return (
    <section className="relative min-h-[100dvh] w-full bg-[#f8f9fa] overflow-hidden flex items-center justify-center font-sans">
      {/* Background grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
      <div className="absolute inset-0 z-0 bg-blue-900 mix-blend-overlay opacity-[0.08] pointer-events-none" />

      {/* ── Cards layer ── */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        {isMobile
          ? /* MOBILE: komponen murni HTML, zero framer hooks */
            mobileFragments.map((item) => (
              <MobileCard
                key={item.id}
                item={item}
                onCardClick={handleCardClick}
              />
            ))
          : /* DESKTOP: full parallax */
            cyberFragments.map((item, index) => (
              <DesktopCard
                key={item.id}
                item={item}
                index={index}
                mouseX={mouseX}
                mouseY={mouseY}
                isUnlocked={index < unlockedCount}
                onImageLoad={() => handleImageLoad(index)}
                onCardClick={handleCardClick}
              />
            ))
        }
      </div>

      {/* ── Center Panel ── */}
      <div className="relative z-20 px-4 pointer-events-none">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white border-[3px] border-black shadow-[10px_10px_0px_0px_rgba(37,99,235,1)] max-w-lg w-full mx-auto overflow-hidden pointer-events-auto"
        >
          <div className="bg-blue-600 text-white flex justify-between items-center px-3 py-2 border-b-[3px] border-black">
            <div className="flex items-center gap-2 font-mono font-bold text-xs uppercase tracking-widest">
              <Terminal size={14} /> GALLERY_SYS_VIEW
            </div>
            <div className="flex gap-1">
              <div className="w-4 h-4 bg-white border border-black flex items-center justify-center">
                <Minus size={8} className="text-black" />
              </div>
              <div className="w-4 h-4 bg-blue-100 border border-black">
                <X size={10} className="text-black" />
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 text-center flex flex-col items-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-none">DATABASE</h2>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-slate-900 leading-none mb-6">KENANGAN</h2>

            <div className="font-mono text-xs md:text-sm text-slate-700 max-w-sm border-l-[3px] border-blue-600 pl-4 text-left bg-blue-50/50 p-3 w-full">
              <p>{'>'} Initializing memory scan...</p>
              <p className="font-bold text-blue-700">
                {'>'} Images loaded:{' '}
                {isMobile
                  ? <span>{mobileFragments.length}/{mobileFragments.length}</span>
                  : <span className={unlockedCount <= cyberFragments.length ? 'animate-pulse' : ''}>
                      {Math.min(unlockedCount, cyberFragments.length)}/{cyberFragments.length}
                    </span>
                }
              </p>
              <p className="text-gray-400 text-[10px] mt-1">{'>'} Klik kartu untuk membuka file_</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, x: -4, y: -4, boxShadow: '8px 8px 0px 0px black' }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 flex items-center gap-3 bg-black text-white px-8 py-4 font-bold uppercase tracking-widest border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] transition-all duration-200"
            >
              <Maximize2 size={18} />
              <span>BUKA_GALERI.EXE</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      <Crosshair className="absolute top-4 left-4 text-blue-600/50 w-6 h-6" strokeWidth={1.5} />
      <Crosshair className="absolute bottom-4 right-4 text-blue-600/50 w-6 h-6" strokeWidth={1.5} />

      {selectedItem && (
        <CyberModal item={selectedItem} onClose={handleCloseModal} />
      )}
    </section>
  )
}

export default memo(MomentsSection)