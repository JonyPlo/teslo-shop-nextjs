import { initialData } from './seed'
import prisma from '../lib/prisma'
import { countries } from './seed-countries'

const main = async () => {
  await prisma.orderAddress.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()

  await prisma.userAddress.deleteMany()
  await prisma.user.deleteMany()
  await prisma.country.deleteMany()

  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  const { users, categories, products } = initialData

  await prisma.user.createMany({
    data: users,
  })

  const categoriesData = categories.map((name) => ({
    name,
  }))

  await prisma.category.createMany({
    data: categoriesData,
  })

  const categoriesDB = await prisma.category.findMany()
  const categoriesMap = new Map()

  categoriesDB.forEach((category) => {
    categoriesMap.set(category.name.toLowerCase(), category.id)
  })

  products.forEach(async (product) => {
    const { type, images, ...rest } = product
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap.get(type),
      },
    })

    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }))

    await prisma.productImage.createMany({
      data: imagesData,
    })
  })

  await prisma.country.createMany({
    data: countries,
  })

  console.log('Seed executed')
}

;(() => {
  if (process.env.NODE_ENV === 'production') return
})()

main()
