//! Para ejecutar este archivo vamos a usar el comando de "node src/...", pero el archivo es de Typescript, y node no reconoce este tipado, asi que para poder ejecutar codigo de Typescript en node tenemos que instalar la dependencia "ts-node" como dependencia de desarrollo `pnpm i -D ts-node`, y usaremos ts-node para poder ejecutar el archivo, que en vez de `node src/seed/seed-database.ts` seria `ts-node src/seed/seed-database.ts`

//* Tener en cuenta que para que funcionen las importaciones en node, el package json tiene que ser de tipo modulo, o la otra solución que es la que se implemento aqui, es movernos al directorio seed con el comando `cd src/seed` y dentro de ese directorio ejecutar el comando `npm tsc --init`, este comando creara el archivo tsconfig.json dentro de la carpeta "seed/", y tendra las configuraciones por defecto para que en Typescript funcionen las importaciones

import { initialData } from './seed'
import prisma from '../lib/prisma'

// De esta forma creamos un seed para una base de datos SQL con Prisma
const main = async () => {
  // Borrar registros previos
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  const { categories, products } = initialData

  // Insertar Categorias en la db
  const categoriesData = categories.map((name) => ({
    name,
  }))

  await prisma.category.createMany({
    data: categoriesData,
  })

  const categoriesDB = await prisma.category.findMany()

  const categoriesMap = categoriesDB.reduce(
    (map, category) => {
      map[category.name.toLowerCase()] = category.id

      return map
    },
    {} as Record<string, string>
  )

  products.forEach(async (product) => {
    const { type, images, ...rest } = product

    // Insertar Productos en la db
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    })

    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }))

    // Insertar Imagenes en la db
    await prisma.productImage.createMany({
      data: imagesData,
    })
  })

  console.log('Seed executed')
}

;(() => {
  // Esta condicional es importante para que la funcion no se ejecute una vez que el proyecto ya esta en producción
  if (process.env.NODE_ENV === 'production') return

  main()
})()
