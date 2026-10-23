/**
 * ARCHIVE Mobile — ESLint flat config (expo + prettier).
 * [Assignment 1 / Rubric] Code structure & syntax.
 */
const expoConfig = require('eslint-config-expo/flat');
const prettier = require('eslint-config-prettier');

module.exports = [
  ...expoConfig,
  prettier,
  {
    ignores: ['node_modules/', 'android/', 'ios/', '.expo/', 'dist/'],
  },
];
