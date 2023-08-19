module.exports = {
  '*.{js,jsx}': ['prettier --write', 'eslint ./src --fix'],
  '*.{md,yml,css}': ['prettier --write'],
};
