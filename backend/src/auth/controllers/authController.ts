import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'

import { generateToken } from '../../shared/utils/jwt'
import { User, UserDocument } from '../../user/models/user'
import { CreateUserDTO } from '../../user/dtos/createUserDto'
import { loginService, registerService, LoginDeps } from '../services/authService'
import { registerDeps } from '../services/registerDeps'

export const login = async (request: Request, response: Response): Promise<void> => {
  const { username, password } = request.body

  const deps: LoginDeps = {
    findUserByUsername: async (username: string): Promise<UserDocument | null> => User.findOne({ username }),
    comparePassword: bcrypt.compare,
    generateToken
  }

  try {
    const tokenResult = await loginService(username, password, deps)
    response.status(200).json(tokenResult)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'USER_NOT_FOUND') response.status(404).json({ message: 'Usuario no encontrado' })
      else if (error.message === 'INVALID_PASSWORD') response.status(401).json({ message: 'Contraseña incorrecta' })
    }

    response.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const signup = async (request: Request, response: Response): Promise<void> => {
  const createUserDTO: CreateUserDTO = request.body

  try {
    const tokenResult = await registerService(createUserDTO, registerDeps)
    response.status(201).json(tokenResult)
  } catch (error) {
    if (error instanceof Error && error.message === 'USER_ALREADY_EXISTS') {
      response.status(409).json({ message: 'El usuario ya existe' })
    }

    response.status(500).json({ message: 'Error interno del servidor' })
  }
}
