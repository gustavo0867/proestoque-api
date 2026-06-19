import { Router } from 'express'
import { produtoRoutes } from './produto.routes'
import { categoriaRoutes } from './categoria.routes'
import { authRoutes } from './auth.routes'

const routes = Router()

routes.use('/produtos', produtoRoutes)
routes.use('/categorias', categoriaRoutes)
routes.use('/auth', authRoutes)

export { routes }
