export const getLastWordString = (product: string): string => {
  const wordsArray = product.split(' ')
  const lastWord = wordsArray[wordsArray.length - 1]

  return lastWord
}
