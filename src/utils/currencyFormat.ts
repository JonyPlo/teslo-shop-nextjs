// Esta funcion se encargara de transformar el precio a la moneda que yo le especifique
export const currencyFormat = (value: number) => {
  // El objeto Intl es propio de Javascript y nos sirve para hacer la conversion de moneda, como primer argumento hay que pasarle el codigo de pais al cual quiero hacer la conversion de moneda, y como segundo argumento se puede pasar un objeto con diferentes opciones
  //* Lista con codigos de todos los paises - https://gist.github.com/typpo/b2b828a35e683b9bf8db91b5404f1bd1
  return new Intl.NumberFormat('en-US', {
    // El estilo es sobre que cosas realizaremos conversiones, como por ejemplo numeros decimales planos, o sera conversion para monedas, para porcentajes, etc.
    style: 'currency',
    // El currency (divisa) que se utilizará en el formato de moneda. Los valores posibles son los códigos de moneda ISO 4217, aqui hay una lista con todas las divisas - https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes
    currency: 'USD',
    // Cantidad de numeros minimos que debe tener la conversion
    minimumFractionDigits: 2,
    // Cantidad de numeros maximos que debe tener la conversion
    maximumFractionDigits: 2,
    // El metodo format() al final, aplica todas las opciones anteriores de formato al valor que recibe como argumento
  }).format(value)
}
