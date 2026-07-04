import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const src = path.join(root, 'public/favicon.svg')
const outDir = path.join(root, 'public/icons')
const bg = '#fafaf9'

await mkdir(outDir, { recursive: true })

async function makeIcon(name, size, { padding = 0.16 } = {}) {
  const inner = Math.round(size * (1 - padding * 2))
  const logo = await sharp(src, { density: 384 })
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer()

  await sharp({
    create: { width: size, height: size, channels: 4, background: bg },
  })
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toFile(path.join(outDir, name))
}

await makeIcon('pwa-192x192.png', 192)
await makeIcon('pwa-512x512.png', 512)
await makeIcon('maskable-512x512.png', 512, { padding: 0.2 })
await makeIcon('apple-touch-icon.png', 180, { padding: 0.14 })

console.log('icons written to', outDir)
