import jwt from 'jsonwebtoken'
import { envConfig } from '../config/env'

const JWT_SECRET_KEY = envConfig.JWT_SECRET

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '5h' })
}

export const verifyToken = (token: string): object | string => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY)
  } catch (error) {
    throw new Error('Invalid token')
  }
}
