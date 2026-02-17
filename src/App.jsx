import { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Lazy load semua section agar tidak render sekaligus ─────────────────────
const IntroScreen    = lazy(() => import('./components/IntroScreen'))
const MomentsSection = lazy(() => import('./components/MomentsSection'))
const MessagesSection = lazy(() => import('./components/MessagesSection'))
const ClosingScreen  = lazy(() => import('./components/ClosingScreen'))

// ─── Fallback ringan saat lazy load ──────────────────────────────────────────
const SectionFallback = () => (
  <div className="w-full h-full flex items-center justify-center bg-[#f8f9fa]">
    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
  </div>
)

const variants = {
  enter: (direction) => ({
    y: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      y: { type: 'spring', stiffness: 260, damping: 30 },
      opacity: { duration: 0.25 },
    },
  },
  exit: (direction) => ({
    y: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    scale: 0.97,
    transition: {
      y: { type: 'spring', stiffness: 260, damping: 30 },
      opacity: { duration: 0.25 },
    },
  }),
}

// Cooldown sedikit diperpanjang agar animasi tidak terpotong di mobile
const SCROLL_COOLDOWN = 800

function App() {
  const [[page, direction], setPage] = useState([0, 0])

  const isScrollingRef = useRef(false)
  const touchStartRef  = useRef(null)
  const pageRef        = useRef(page)

  useEffect(() => { pageRef.current = page }, [page])

  // ─── Sections — komponen di-lazy, tidak render semua sekaligus ───────────
  const sections = useMemo(() => [
    { label: 'INTRO',    component: <IntroScreen /> },
    { label: 'MOMENTS',  component: <MomentsSection /> },
    { label: 'MESSAGES', component: <MessagesSection /> },
    { label: 'CLOSING',  component: <ClosingScreen /> },
  ], [])

  const totalSections = sections.length

  const paginate = useCallback((newDirection) => {
    if (isScrollingRef.current) return
    const current = pageRef.current
    const next = current + newDirection
    if (next < 0 || next >= totalSections) return

    isScrollingRef.current = true
    setPage([next, newDirection])
    setTimeout(() => { isScrollingRef.current = false }, SCROLL_COOLDOWN)
  }, [totalSections])

  const jumpToPage = useCallback((targetIndex) => {
    const current = pageRef.current
    if (targetIndex === current || isScrollingRef.current) return
    const dir = targetIndex > current ? 1 : -1
    isScrollingRef.current = true
    setPage([targetIndex, dir])
    setTimeout(() => { isScrollingRef.current = false }, SCROLL_COOLDOWN)
  }, [])

  // ─── Wheel scroll ─────────────────────────────────────────────────────────
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      if (Math.abs(e.deltaY) < 30) return // ignore trackpad micro-scroll
      paginate(e.deltaY > 0 ? 1 : -1)
    }
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [paginate])

  // ─── Touch swipe ──────────────────────────────────────────────────────────
  const onTouchStart = useCallback((e) => {
    touchStartRef.current = e.targetTouches[0].clientY
  }, [])

  const onTouchEnd = useCallback((e) => {
    if (touchStartRef.current === null) return
    const distance = touchStartRef.current - e.changedTouches[0].clientY
    touchStartRef.current = null
    if (Math.abs(distance) < 60) return
    paginate(distance > 0 ? 1 : -1)
  }, [paginate])

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-[#f8f9fa] text-slate-900 font-sans"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ─── Progress bar ─── */}
      <div className="fixed top-0 left-0 h-1 bg-gray-200 w-full z-50">
        <motion.div
          className="h-full bg-blue-600"
          animate={{ width: `${((page + 1) / totalSections) * 100}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>

      {/* ─── Sections — hanya section aktif yang di-render ─── */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 h-full w-full"
          style={{ touchAction: 'none', willChange: 'transform, opacity' }}
        >
          {/* Suspense per section — fallback ringan */}
          <Suspense fallback={<SectionFallback />}>
            {sections[page].component}
          </Suspense>
        </motion.div>
      </AnimatePresence>

      {/* ─── Dot nav (desktop only) ─── */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-4 hidden md:flex">
        {sections.map((section, i) => (
          <div
            key={i}
            className="group flex items-center justify-end gap-3 cursor-pointer"
            onClick={() => jumpToPage(i)}
          >
            <span className={`text-[10px] font-mono font-bold transition-all duration-200 ${
              i === page
                ? 'opacity-100 translate-x-0 text-blue-600'
                : 'opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 text-gray-400'
            }`}>
              {section.label}
            </span>
            <motion.button
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.85 }}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                i === page
                  ? 'bg-blue-600 scale-125 ring-4 ring-blue-100'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          </div>
        ))}
      </nav>
    </div>
  )
}

export default App