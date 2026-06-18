import { Request, Response } from 'express'
import { prisma } from '../prisma/client'
import { AppError } from '../middlewares/errorHandler'

export class ProdutoController {
  async listar(req: Request, res: Response) {
    const produtos = await prisma.produto.findMany({
      include: {
        categoria: true
      }
    })

    return res.status(200).json(produtos)
  }

  async buscarPorId(req: Request, res: Response) {
    const { id } = req.params

    const produto = await prisma.produto.findUnique({
      where: { id },
      include: { categoria: true }
    })

    if (!produto) {
      throw new AppError('Produto não encontrado', 404)
    }

    return res.status(200).json(produto)
  }

  async criar(req: Request, res: Response) {
    const { nome, descricao, preco, categoriaId } = req.body

    if (!nome || !descricao || !preco || !categoriaId) {
      throw new AppError('Todos os campos são obrigatórios')
    }

    const categoriaExiste = await prisma.categoria.findUnique({
      where: { id: categoriaId }
    })

    if (!categoriaExiste) {
      throw new AppError('Categoria inválida', 400)
    }

    const produto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        preco,
        categoriaId
      }
    })

    return res.status(201).json(produto)
  }

  async atualizar(req: Request, res: Response) {
    const { id } = req.params
    const { nome, descricao, preco, categoriaId } = req.body

    const produtoExiste = await prisma.produto.findUnique({
      where: { id }
    })

    if (!produtoExiste) {
      throw new AppError('Produto não encontrado', 404)
    }

    const produto = await prisma.produto.update({
      where: { id },
      data: {
        nome,
        descricao,
        preco,
        categoriaId
      }
    })

    return res.status(200).json(produto)
  }

  async deletar(req: Request, res: Response) {
    const { id } = req.params

    const produtoExiste = await prisma.produto.findUnique({
      where: { id }
    })

    if (!produtoExiste) {
      throw new AppError('Produto não encontrado', 404)
    }

    await prisma.produto.delete({
      where: { id }
    })

    return res.status(204).send()
  }
}
