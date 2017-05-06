module.exports = {
  scripts: {
    default: {
      script: 'webpack-dev-server --progress --inline --hot',
      description: 'Run webpack-dev-server with Hot Module Reloading 🔥',
    },
    build: {
      default: 'webpack',
      prod: 'webpack --config webpack.config.prod.js',
    },
    test: {
      default: {
        script: 'jest --watch',
        description: 'Run jest in watch mode 👀',
      },
      cover: {
        script: 'jest --coverage',
        description: 'Run jest with coverage 🤓',
      },
    },
    lint: {
      default: {
        script: 'eslint .',
        description: 'Lint the entire project',
      },
      fix: {
        script: 'eslint . --fix',
        description: 'Lint and fix common errors',
      },
    },
  },
};
