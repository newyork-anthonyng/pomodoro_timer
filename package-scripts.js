const npsUtils = require('nps-utils');
const concurrent = npsUtils.concurrent;

module.exports = {
  scripts: {
    default: {
      script: 'webpack-dev-server --progress --inline --hot',
      description: 'Run webpack-dev-server with Hot Module Reloading 🔥',
    },
    commit: {
      script: 'git-cz',
    },
    build: {
      default: 'webpack',
      prod: 'webpack --config webpack.config.prod.js',
    },
    test: {
      default: {
        script: 'jest --coverage',
        description: 'Run jest with coverage 🤓',
      },
      watch: {
        script: 'jest --watch',
        description: 'Run jest in watch mode 👀',
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
    validate: {
      script: concurrent.nps('lint', 'test'),
    },
    reportCoverage: {
      default: 'codecov',
    },
    deploy: {
      default: {
        script: 'git subtree push --prefix dist origin gh-pages',
        description: 'Deploy to gh-pages',
      },
    },
  },
};
