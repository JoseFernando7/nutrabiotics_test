import { Router } from 'express'
import { login, signup } from '../controllers/authController'

const router = Router()

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: Iniciar sesión
 *    description: Inicia sesión con las credenciales proporcionadas
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                description: Nombre de usuario
 *              password:
 *                type: string
 *                description: Contraseña
 *
 *    responses:
 *      200:
 *        description: Inicio de sesión exitoso
 *      401:
 *        description: Credenciales inválidas
 *      500:
 *        description: Error interno del servidor
 */
router.post('/login', login)

/**
 * @swagger
 * /auth/signup:
 *  post:
 *    summary: Registrarse
 *    description: Registra un nuevo usuario con las credenciales proporcionadas
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                description: Nombre de usuario
 *              password:
 *                type: string
 *                description: Contraseña
 *              role:
 *                type: string
 *                description: Rol del usuario (admin o cliente)
 *
 *    responses:
 *      201:
 *        description: Registro exitoso
 *      409:
 *        description: El usuario ya existe
 *      500:
 *        description: Error interno del servidor
 */
router.post('/signup', signup)

export default router
