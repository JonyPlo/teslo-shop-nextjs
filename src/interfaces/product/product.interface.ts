export interface Product {
  id: string
  description: string
  images: string[]
  inStock: number
  price: number
  sizes: Size[]
  slug: string
  tags: string[]
  title: string
  gender: Gender
}

export interface CartProduct {
  id: string
  slug: string
  title: string
  price: number
  quantity: number
  size: Size
  image: string
  inStock: number
}

export interface ProductImage {
  id: number
  url: string
  productId: string
}

export type Gender = 'men' | 'women' | 'kid' | 'unisex'
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
export type Type = 'shirts' | 'pants' | 'hoodies' | 'hats'

export interface AdapterCartProduct {
  product: Product
  quantity: number
  size: Size
}
