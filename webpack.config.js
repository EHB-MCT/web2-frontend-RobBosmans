const path = require('path');

module.exports = { //[]
  entry: './src/script.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'docs'),
  },
  entry: './src/script.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'docs'),
  },
};

module.exports = {     
  entry: ['./src/createUser.js', './src/end.js', './src/login.js', './src/script.js'],     
  entry: {         
    login: './src/login.js',         
    createUser: './src/createUser.js',
    end: './src/end.js',     
    script: './src/script.js' },     
    output: {         
      path: path.resolve(__dirname, 'docs'),         
      filename: '[name].js'     },     
      mode: 'development' }