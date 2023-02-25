const range = (start: number, stop: number, step = 1): number[] =>
  Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)

export function calcularPaginas(totalPaginas: number, paginaActual: number, cantidadDeBotones = 5) {
  if (totalPaginas < cantidadDeBotones) {
    cantidadDeBotones = totalPaginas
  }
  
  const MIDDLE = 2
  const cantidadDeBotonesAlosLados = Math.floor(cantidadDeBotones / MIDDLE)
  
  if (paginaActual <= 0 || paginaActual > totalPaginas) {
    throw new Error('pagina actual invalida')
  }

  if (paginaActual <= (cantidadDeBotones - cantidadDeBotonesAlosLados)) {
    return range(1, (cantidadDeBotones + 1))
  } else if (paginaActual > (totalPaginas - (cantidadDeBotones - cantidadDeBotonesAlosLados))) {
    return range((totalPaginas - cantidadDeBotones) + 1, totalPaginas + 1)
  } else {
    return range(paginaActual - cantidadDeBotonesAlosLados, paginaActual + cantidadDeBotonesAlosLados + 1)
  }
}