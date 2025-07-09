import express from 'express'
import cors from 'cors'
import { createCanvas, registerFont } from 'canvas'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.get('/ttp', async (req, res) => {
  const { text = 'Hola mundo', color = 'black', size = '48' } = req.query
  const fontSize = parseInt(size)
  const font = 'Sans'

  registerFont('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', { family: font })

  const canvas = createCanvas(800, 400)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = color
  ctx.font = `${fontSize}px ${font}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)

  res.setHeader('Content-Type', 'image/png')
  canvas.createPNGStream().pipe(res)
})

app.listen(port, () => {
  console.log(`TTP API running at http://localhost:${port}`)
})
