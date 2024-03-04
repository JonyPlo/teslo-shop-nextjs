import { ToastOptions } from '@/interfaces'
import { getLastWordString } from '@/utils'

export const ADDED_TO_CART_TOAST_OPTIONS = ({
  toastMessage: productTitle,
  showToast,
}: ToastOptions): ToastOptions => ({
  toastMessage: `${getLastWordString(productTitle)} added to cart`,
  showToast: showToast,
})
