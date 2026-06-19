import { Request, Response } from 'express'
import { prisma } from '../prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '../config'

export class AuthController {
  async registrar(req: Request, res: Response) {
    const { nome, email, senha } = req.body

    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email }
    })

    if (usuarioExistente) {
      return res.status(409).json({ message: 'Email já cadastrado' })
    }

    const salt = await bcrypt.genSalt(10)
    const senhaHash = await bcrypt.hash(senha, salt)

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash
      }
    })

    return res.status(201).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    })
  }

  async login(req: Request, res: Response) {
    const { email, senha } = req.body

    const usuario = await prisma.usuario.findUnique({
      where: { email }
    })

    if (!usuario) {
      return res.status(401).json({ message: 'Credenciais inválidas' })
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Credenciais inválidas' })
    }

    const token = jwt.sign({ id: usuario.id }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn
    })

    return res.status(200).json({
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      },
      token
    })
  }

  async perfil(req: Request, res: Response) {
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.user.id }
    })

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    return res.status(200).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      criadoEm: usuario.criadoEm
    })
  }
}
