// import { Request, Response } from 'express'
// import * as userService from '../services/userService'
// import { CreateUserDTO } from '../dtos/user/createUserDto'

// export const createUser = async (request: Request, response: Response): Promise<void> => {
//   try {
//     const userData: CreateUserDTO = request.body
//     const user = await userService.createUser(userData)
//     response.status(201).json(user)
//   } catch (error) {
//     console.error('Error creating user:', error)
//     response.status(500).json({ messageError: 'Error creating the user' })
//   }
// }
