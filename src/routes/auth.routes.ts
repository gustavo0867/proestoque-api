import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { validate } from '../middlewares/validate'
import { registroSchema, loginSchema } from '../schemas/auth.schema'
import { autenticar } from '../middlewares/auth'

const authRoutes = Router()
const authController = new AuthController()

authRoutes.post('/registro', validate(registroSchema), authController.registrar)
authRoutes.post('/login', validate(loginSchema), authController.login)
authRoutes.get('/perfil', autenticar, authController.perfil)

export { authRoutes }
