import { Hono } from 'hono'
import itemsRouter from './routes/item.route.ts'
import authRouter from './routes/auth.route.ts'
import { errorHandler } from './middlewares/errorHandler'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', cors())
app.use('*', errorHandler)      // ←必ずルーティングよりも前に登録

app.route('/', authRouter)
app.route('/items', itemsRouter)

export default app
