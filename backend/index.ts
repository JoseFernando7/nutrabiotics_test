import express, { Request, Response } from 'express'
import cors from 'cors'

import orderRoutes from './src/order/routes/orderRoutes'
import productRoutes from './src/product/routes/productRoutes'
import authRoutes from './src/auth/routes/authRoutes'

import { swaggerDocsSetup } from './swagger'
import { envConfig } from './src/config/env'
import { connectDB } from './src/config/db'
import { authMiddleware } from './src/auth/middlewares/authMiddleware'

const app = express()

const PORT = envConfig.PORT ?? 3000

app.use(express.json())
app.use(cors())

app.use('/orders', authMiddleware as express.RequestHandler, orderRoutes)
app.use('/products', authMiddleware as express.RequestHandler, productRoutes)
app.use('/auth', authRoutes)

swaggerDocsSetup(app)

app.get('/', (request: Request, respose: Response) => {
  respose.status(200).send('Hello World from TypeScript!')
})

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server is running on port ', PORT)
      console.log('Swagger docs are available at http://localhost:3000/api-docs')
    }).on('error', (err) => {
      throw new Error(err.message)
    })
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err.message)
    process.exit(1)
  })
