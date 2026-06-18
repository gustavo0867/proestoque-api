import { prisma } from './client'

async function main() {
  const categorias = [
    { nome: 'Eletrônicos' },
    { nome: 'Alimentos' },
    { nome: 'Limpeza' },
    { nome: 'Escritório' },
    { nome: 'Vestuário' }
  ]

  for (const categoria of categorias) {
    await prisma.categoria.create({
      data: categoria
    })
  }
}

main()
  .then(() => {
    console.log('Seed executado com sucesso 🌱')
  })
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
