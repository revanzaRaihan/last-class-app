import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import IntroScreen from './components/IntroScreen'
import StatsSection from './components/StatsSection'
import MomentsSection from './components/MomentsSection'
import MessagesSection from './components/MessagesSection'
import ClosingScreen from './components/ClosingScreen'

const variants = {
  enter: (direction) => ({
    y: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.9,
    zIndex: 1
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
    zIndex: 1,
    transition: {
      y: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.5 }
    }
  },
  exit: (direction) => ({
    y: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    scale: 0.9,
    zIndex: 0,
    transition: {
      y: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.5 }
    }
  })
}

function App() {
  const [[page, direction], setPage] = useState([0, 0])
  const [isScrolling, setIsScrolling] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const sections = [
    { component: <IntroScreen onNext={() => paginate(1)} />, label: 'INTRO' },
    { component: <MomentsSection />, label: 'MOMENTS' },
    { component: <MessagesSection />, label: 'MESSAGES' },
    { component: <ClosingScreen />, label: 'CLOSING' }
  ]

  const totalSections = sections.length

  const paginate = (newDirection) => {
    const newPage = page + newDirection
    if (newPage < 0 || newPage >= totalSections) return
    setPage([newPage, newDirection])
  }

  const jumpToPage = (targetIndex) => {
    const newDirection = targetIndex > page ? 1 : -1
    setPage([targetIndex, newDirection])
  }

  useEffect(() => {
    const handleScroll = (e) => {
      if (isScrolling) return
      if (Math.abs(e.deltaY) < 30) return

      setIsScrolling(true)
      
      if (e.deltaY > 0) {
        paginate(1)
      } else {
        paginate(-1)
      }

      setTimeout(() => setIsScrolling(false), 1000)
    }

    window.addEventListener('wheel', handleScroll, { passive: false })
    return () => window.removeEventListener('wheel', handleScroll)
  }, [page, isScrolling])

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    if (isScrolling) return

    const distance = touchStart - touchEnd
    const minSwipeDistance = 50

    if (Math.abs(distance) < minSwipeDistance) return

    setIsScrolling(true)

    if (distance > 50) {
      paginate(1)
    } else {
      paginate(-1)
    }

    setTimeout(() => setIsScrolling(false), 1000)
  }

  return (
    <div 
      className="relative h-screen w-full overflow-hidden bg-[#f8f9fa] text-slate-900 font-sans"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 h-full w-full"
        >
          {sections[page].component}
        </motion.div>
      </AnimatePresence>

      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 hidden md:flex">
        {sections.map((section, i) => (
          <div key={i} className="group flex items-center justify-end gap-3 cursor-pointer" onClick={() => jumpToPage(i)}>
            <div className={`text-[10px] font-mono font-bold transition-all duration-300 ${
              i === page 
                ? 'opacity-100 translate-x-0 text-blue-600' 
                : 'opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 text-gray-400'
            }`}>
              {section.label}
            </div>

            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === page
                  ? 'bg-blue-600 scale-125 ring-4 ring-blue-100'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          </div>
        ))}
      </div>

      <div className="fixed top-0 left-0 h-1 bg-gray-200 w-full z-50">
         <motion.div 
            className="h-full bg-blue-600"
            initial={{ width: 0 }}
            animate={{ width: `${((page + 1) / totalSections) * 100}%` }}
            transition={{ type: "spring", stiffness: 100 }}
         />
      </div>
    </div>
  )
}

export default App