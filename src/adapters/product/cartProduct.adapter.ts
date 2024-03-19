import type { AdapterCartProduct, CartProduct } from '@/interfaces'

export const createAdapterCartProduct = ({
  product,
  quantity,
  size,
}: AdapterCartProduct) => {
  const { id, slug, title, price, images } = product

  const formattedCartProduct: CartProduct = {
    id,
    slug,
    title,
    price,
    image: images[0],
    quantity,
    size,
  }

  return formattedCartProduct
}
