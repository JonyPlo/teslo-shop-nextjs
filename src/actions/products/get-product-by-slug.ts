'use server'

export const getProductBySlug = async (slug: string) => {
  try {
    const productBySlug = await prisma?.product.findFirst({
      include: {
        ProductImage: {
          select: {
            url: true,
          },
        },
      },
      where: {
        slug,
      },
    })

    if (!productBySlug) return null

    const { ProductImage, ...rest } = productBySlug

    return {
      ...rest,
      images: ProductImage.map((image) => image.url),
    }
  } catch (error) {
    throw new Error('Error to get product by slug')
  }
}
