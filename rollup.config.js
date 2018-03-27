import uglify from 'rollup-plugin-uglify'
import cjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default [{
  input: './src/index.js',
  output: {
    file: './dist/bundle.js',
    format: 'umd',
    name: 'Zoomme'
  },
  plugins: [
    cjs(),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve()
  ]
}, {
  input: './src/index.js',
  output: {
    file: './dist/bundle.min.js',
    format: 'umd',
    name: 'Zoomme'
  },
  plugins: [
    cjs(),
    uglify(),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve()
  ]
}]
