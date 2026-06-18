import { Request, Response } from 'express'
import { prisma } from '../prisma/client'
import { AppError } from '../middlewares/errorHandler'

export class CategoriaController {
  async listar(req: Request, res: Response) {
    const categorias = await prisma.categoria.findMany()
    return res.status(200).json(categorias)
  }

  async buscarPorId(req: Request, res: Response) {
    const { id } = req.params

    const categoria = await prisma.categoria.findUnique({
      where: { id }
    })

    if (!categoria) {
      throw new AppError('Categoria não encontrada', 404)
    }

    return res.status(200).json(categoria)
  }
}
