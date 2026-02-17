import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import 'dotenv/config'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import messagesRouter from './routes/messages.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app  = express()
const PORT = process.env.PORT || 3001

// ─── Trust proxy (penting kalau pakai Nginx/Caddy di VPS) ────────────────────
app.set('trust proxy', 1)

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',')

app.use(cors({
  origin: (origin, cb) => {
    // Izinkan request tanpa origin (curl, Postman) hanya di development
    if (!origin && process.env.NODE_ENV !== 'production') return cb(null, true)
    if (allowedOrigins.includes(origin)) return cb(null, true)
    cb(new Error(`CORS: origin ${origin} tidak diizinkan`))
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}))

// ─── Body parser ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' })) // Tolak payload besar

// ─── Rate Limiter ─────────────────────────────────────────────────────────────
// Global: maks 100 request / 15 menit per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, message: 'Terlalu banyak request, coba lagi nanti.' },
})

// Ketat: maks 5 POST /api/messages per 10 menit per IP (anti spam kirim pesan)
const postLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, message: 'Kamu terlalu sering kirim pesan. Tunggu sebentar ya 🙏' },
})

app.use(globalLimiter)

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/messages', postLimiter)   // terapkan rate limit ketat ke semua method di route ini
app.use('/api/messages', messagesRouter)

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || 'development' })
})

// ─── Serve frontend build (production) ────────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  const distPath = join(__dirname, '../dist')
  app.use(express.static(distPath))
  // SPA fallback
  app.get('*', (req, res) => {
    res.sendFile(join(distPath, 'index.html'))
  })
}

// ─── Error handler ────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message)
  res.status(500).json({ ok: false, message: 'Internal server error' })
})

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server jalan di http://localhost:${PORT}`)
  console.log(`   Mode: ${process.env.NODE_ENV || 'development'}`)
})