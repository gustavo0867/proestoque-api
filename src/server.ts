import { app } from './app'
import { prisma } from './prisma/client'

const PORT = process.env.PORT || 3333

async function startServer() {
  try {
    await prisma.$connect()
    console.log('Banco de dados conectado')

    app.listen(Number(PORT), '0.0.0.0', () => {
      console.log(`Servidor rodando na porta ${PORT}`)
    })
  } catch (error) {
    console.error('Erro ao iniciar servidor', error)
  }
}

startServer()
