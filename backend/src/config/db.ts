import mongoose from 'mongoose'
import { config } from './env'

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.MONGODB_URI)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1) // Exit the process with failure
  }
}
