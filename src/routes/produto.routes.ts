import { Router } from 'express'
import { ProdutoController } from '../controllers/produto.controller'
import { autenticar } from '../middlewares/auth'

const produtoRoutes = Router()
const produtoController = new ProdutoController()

produtoRoutes.use(autenticar)

produtoRoutes.get('/', produtoController.listar)
produtoRoutes.get('/:id', produtoController.buscarPorId)
produtoRoutes.post('/', produtoController.criar)
produtoRoutes.put('/:id', produtoController.atualizar)
produtoRoutes.delete('/:id', produtoController.deletar)

export { produtoRoutes }
