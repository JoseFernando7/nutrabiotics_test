import express, { Request, Response } from 'express'

import userRoutes from './src/routes/userRoutes'
import orderRoutes from './src/routes/orderRoutes'
import productRoutes from './src/routes/productRoutes'

import { swaggerDocsSetup } from './swagger'
import { config } from './src/config/env'
import { connectDB } from './src/config/db'

const app = express()

const PORT = config.PORT ?? 3000

app.use(express.json())
app.use('/', userRoutes)
app.use('/orders', orderRoutes)
app.use('/products', productRoutes)

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
