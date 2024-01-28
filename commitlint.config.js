module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [2, 'always', 10], // Por defecto, el limite de caracteres en el cuerpo del commit es de 100 caracteres, agregar esta regla o quitarla segun sea necesario
  },
};
