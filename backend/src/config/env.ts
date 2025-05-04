import dotenv from 'dotenv'

dotenv.config()

export const envConfig = {
  PORT: process.env.PORT ?? 3000,
  MONGODB_URI: process.env.MONGODB_URI ?? '',
  JWT_SECRET: process.env.JWT_SECRET ?? 'default-secret-key',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION
}
