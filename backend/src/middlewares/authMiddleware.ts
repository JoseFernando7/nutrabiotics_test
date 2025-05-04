import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { envConfig } from '../config/env'
import { AuthRequest } from '../requests/authRequest'

const JWT_SECRET_KEY = envConfig.JWT_SECRET

export const authMiddleware = (request: AuthRequest, response: Response, next: NextFunction): void => {
  const authHeader = request.headers.authorization
  const token = authHeader?.split(' ')[1] // Bearer TOKEN

  try {
    if (token == null) {
      response.status(401).json({ message: 'Unauthorized: Token required' })
      return
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY) as jwt.JwtPayload

    const userId = decoded.userId
    const role = decoded.role

    if (userId === null || role === null) {
      response.status(401).json({ message: 'Unauthorized: Invalid token payload' })
      return
    }

    request.user = { userId, role }
    next()
  } catch (error) {
    response.status(403).json({ message: 'Forbidden: Invalid or expired token' })
  }
}
