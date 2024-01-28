module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 100], // Por defecto, el limite del titulo del mensaje es de 100, caracteres, modificar este arreglo si es necesario
    'body-max-line-length': [2, 'always', 100], // Por defecto, el limite de caracteres en el cuerpo del commit es de 100 caracteres, agregar esta regla o quitarla segun sea necesario
  },
}
