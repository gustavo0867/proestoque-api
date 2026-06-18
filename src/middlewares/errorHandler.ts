import { Request, Response, NextFunction } from 'express'

export class AppError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode = 400) {
    super(message)
    this.statusCode = statusCode
  }
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      erro: err.message
    })
  }

  console.error(err)

  return res.status(500).json({
    erro: 'Erro interno do servidor'
  })
}
