import { Router } from 'express'
import { createHash } from 'crypto'
import pool from '../db/connection.js'

const router = Router()

// ─── Validasi input ───────────────────────────────────────────────────────────
const ALLOWED_COLORS = [
  'bg-rose-100 text-rose-600',
  'bg-violet-100 text-violet-600',
  'bg-sky-100 text-sky-600',
  'bg-amber-100 text-amber-600',
  'bg-emerald-100 text-emerald-600',
  'bg-orange-100 text-orange-600',
  'bg-teal-100 text-teal-600',
  'bg-fuchsia-100 text-fuchsia-600',
]

function validate(body) {
  const { name, role, initial, color, text, is_anon } = body
  const errors = []

  if (!name || typeof name !== 'string' || name.trim().length < 1 || name.trim().length > 50)
    errors.push('name: 1–50 karakter')

  if (!initial || typeof initial !== 'string' || initial.trim().length < 1 || initial.trim().length > 5)
    errors.push('initial: 1–5 karakter')

  if (!ALLOWED_COLORS.includes(color))
    errors.push('color: nilai tidak valid')

  if (!text || typeof text !== 'string' || text.trim().length < 1 || text.trim().length > 200)
    errors.push('text: 1–200 karakter')

  return errors
}

// Hash IP untuk log moderasi tanpa menyimpan IP asli
function hashIP(ip) {
  return createHash('sha256').update(ip + (process.env.IP_SALT || 'salt-rahasia')).digest('hex')
}

// ─── GET /api/messages ────────────────────────────────────────────────────────
// Ambil 100 pesan terbaru (tanpa ip_hash)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, role, initial, color, text, is_anon, created_at
       FROM messages
       ORDER BY created_at DESC
       LIMIT 100`
    )
    res.json({ ok: true, data: rows })
  } catch (err) {
    console.error('GET /messages error:', err)
    res.status(500).json({ ok: false, message: 'Terjadi kesalahan server' })
  }
})

// ─── POST /api/messages ───────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  const errors = validate(req.body)
  if (errors.length > 0) {
    return res.status(422).json({ ok: false, message: 'Validasi gagal', errors })
  }

  const { name, role, initial, color, text, is_anon } = req.body
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || 'unknown'
  const ipHash = hashIP(ip)

  try {
    const [result] = await pool.query(
      `INSERT INTO messages (name, role, initial, color, text, is_anon, ip_hash)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        name.trim(),
        (role || 'MENFES').trim(),
        initial.trim().toUpperCase(),
        color,
        text.trim(),
        is_anon ? 1 : 0,
        ipHash,
      ]
    )

    const [rows] = await pool.query(
      `SELECT id, name, role, initial, color, text, is_anon, created_at
       FROM messages WHERE id = ?`,
      [result.insertId]
    )

    res.status(201).json({ ok: true, data: rows[0] })
  } catch (err) {
    console.error('POST /messages error:', err)
    res.status(500).json({ ok: false, message: 'Terjadi kesalahan server' })
  }
})

export default router