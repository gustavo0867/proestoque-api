import { Router } from 'express'
import { CategoriaController } from '../controllers/categoria.controller'

const categoriaRoutes = Router()
const categoriaController = new CategoriaController()

categoriaRoutes.get('/', categoriaController.listar)
categoriaRoutes.get('/:id', categoriaController.buscarPorId)

export { categoriaRoutes }
