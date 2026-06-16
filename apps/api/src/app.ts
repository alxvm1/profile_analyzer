import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { playerRouter } from './routes/player.js'

const app = new Hono()
  .use('*', cors({ origin: ['https://sight-line.ru', 'https://www.sight-line.ru', 'http://localhost:5173'] }))
  .get('/health', (c) => c.json({ status: 'ok' }))
  .route('/api/player', playerRouter)

export default app
export type AppType = typeof app
