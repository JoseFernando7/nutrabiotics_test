import { Router } from 'express'

import { createUser } from '../controllers/userController'

const router = Router()

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Datos inválidos o usuario ya existente
 *       500:
 *         description: Error interno del servidor
 */

router.post('/users', createUser)

/**
 * @openapi
 * /api/users:
 *  get:
 *    summary: Lista todos los usuarios
 *    description: Devuelve una lista de todos los usuarios disponibles en la base de datos
 *    responses:
 *      200:
 *        description: Lista de usuarios
 */
// router.get('/users', getUser)

export default router
