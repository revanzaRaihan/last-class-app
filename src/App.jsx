// src/App.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import IntroScreen from './components/IntroScreen'
import StatsSection from './components/StatsSection'
import MomentsSection from './components/MomentsSection'
import MessagesSection from './components/MessagesSection'
import ClosingScreen from './components/ClosingScreen'
import { Terminal } from 'lucide-react'

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  
  // Daftar Komponen Section
  const sections = [
    { component: <IntroScreen onNext={() => handleManualNavigate(1)} />, label: 'INTRO' },
    { component: <StatsSection />, label: 'STATS' },
    { component: <MomentsSection />, label: 'MOMENTS' },
    { component: <MessagesSection />, label: 'MESSAGES' },
    { component: <ClosingScreen />, label: 'CLOSING' }
  ]

  const totalSections = sections.length

  // Fungsi Navigasi Manual (Klik Dot)
  const handleManualNavigate = (index) => {
    setCurrentSection(index)
  }

  // Logic Scroll dengan Cooldown (Debounce)
  useEffect(() => {
    const handleScroll = (e) => {
      // Jika sedang animasi scroll, abaikan input user
      if (isScrolling) return;

      // Threshold: Scroll harus cukup kuat (mencegah scroll tidak sengaja)
      if (Math.abs(e.deltaY) < 50) return;

      if (e.deltaY > 0 && currentSection < totalSections - 1) {
        // Scroll Down
        setIsScrolling(true)
        setCurrentSection(prev => prev + 1)
        setTimeout(() => setIsScrolling(false), 1000) // Cooldown 1 detik
      } else if (e.deltaY < 0 && currentSection > 0) {
        // Scroll Up
        setIsScrolling(true)
        setCurrentSection(prev => prev - 1)
        setTimeout(() => setIsScrolling(false), 1000)
      }
    }

    window.addEventListener('wheel', handleScroll, { passive: false })
    return () => window.removeEventListener('wheel', handleScroll)
  }, [currentSection, isScrolling, totalSections])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#f8f9fa] text-slate-900 font-sans">
      
      {/* 1. MAIN CONTENT AREA */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-full w-full"
        >
          {sections[currentSection].component}
        </motion.div>
      </AnimatePresence>

      {/* 2. FIXED NAVIGATION (Right Sidebar Style) */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 hidden md:flex">
        {sections.map((section, i) => (
          <div key={i} className="group flex items-center justify-end gap-3">
            
            {/* Label (Hanya muncul saat hover atau active) */}
            <div className={`text-[10px] font-mono font-bold transition-all duration-300 ${
              i === currentSection 
                ? 'opacity-100 translate-x-0 text-blue-600' 
                : 'opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 text-gray-400'
            }`}>
              {section.label}
            </div>

            {/* Indicator Dot / Number */}
            <button
              onClick={() => handleManualNavigate(i)}
              className={`w-8 h-8 flex items-center justify-center rounded border-2 transition-all duration-300 text-xs font-mono ${
                i === currentSection
                  ? 'bg-black border-black text-white shadow-[2px_2px_0px_0px_rgba(37,99,235,1)] scale-110'
                  : 'bg-white border-gray-300 text-gray-400 hover:border-black hover:text-black'
              }`}
            >
              0{i + 1}
            </button>
          </div>
        ))}
      </div>

      {/* 3. MOBILE PROGRESS BAR (Bottom) */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gray-200 md:hidden z-50">
        <motion.div 
          className="h-full bg-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
        />
      </div>

    </div>
  )
}

export default App