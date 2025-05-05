import { Hono } from 'hono'
import router from 'routes/items'
import { errorHandler } from 'middlewares/errorHandler'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', cors())
app.use('*', errorHandler)      // ←必ずルーティングよりも前に登録

app.route('/items', router)

export default app
