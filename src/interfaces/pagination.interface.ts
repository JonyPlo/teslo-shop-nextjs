import { Product } from '.'

export interface PaginatedProductsResult {
  currentPage: number
  limit: number
  totalPages: number
  products: Product[]
}
