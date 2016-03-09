import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/main.js',
  dest: 'dist/bundle.js',
  format: 'iife',
  plugins: [
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    })
  ]
};