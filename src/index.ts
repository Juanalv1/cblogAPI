import express, {Response, Request} from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { postsRouter } from './routes/posts'
import { categoriesRouter } from './routes/categories'

const app = express()
app.use(cookieParser())
app.use(express.json({ limit: '50mb' }));
app.use(cors({
  origin: 'https://cblog-39q2urz3i-juanalv1.vercel.app',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
}))

const PORT = 3001
app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use('/api/v1/posts', postsRouter)
app.use('/api/v1/categories', categoriesRouter)

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})