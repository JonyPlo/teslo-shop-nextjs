import { getLastWordString } from '@/utils'

export const GET_ADDED_TO_CART_TOAST_MESSAGE = (productTitle: string) => {
  return `${getLastWordString(productTitle)} added to cart`
}
