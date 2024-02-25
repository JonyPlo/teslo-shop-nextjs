export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
  // Si el numero total de paginas es 7 o menos, mostramos las paginas sin puntos suspensivos
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // Si la pagina actual esta entre las primeras 3 paginas, mostramos las primeras 3, puntos suspensivos, y las ultimas 2
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // Si la pagina actual esta entre las ultimas 3 paginas, entonces mostramos las primeras 2, puntos suspensivos, y las ultimas 3 paginas
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 2, totalPages]
  }

  // Si la pagina actual esta en otro lugar medio, entonces mostramos la primera pagina, punto suspensivos, la pagina actual y las que siguen
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ]
}
