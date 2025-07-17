import { Request, Response, NextFunction } from 'express'

import { AuthRequest } from '../shared/requests/authRequest'

export const isAdminMiddleware = (request: Request, response: Response, next: NextFunction): void => {
  const user = (request as AuthRequest).user

  if (user?.role !== 'admin') {
    response.status(403).json({ message: 'Forbidden: Admin access required' })
    return
  }

  next()
}
