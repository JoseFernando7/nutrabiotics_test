import mongoose from 'mongoose'
import { envConfig } from './env'

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(envConfig.MONGODB_URI)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1) // Exit the process with failure
  }
}
