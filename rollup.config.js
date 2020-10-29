// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import postcss from "rollup-plugin-postcss"
import { uglify } from 'rollup-plugin-uglify'



const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'create-react-context': 'createContext',
  'prop-types': 'PropTypes'
};

const babelOptions = {
  exclude: /node_modules/,
  runtimeHelpers: true
}

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'umd',
    sourcemap: true,
    name: "ReactLoadingTransition",
    globals
  },
  external: (name) =>
    [
      'react',
      'create-react-context',
      'react-dom',
      'prop-types',
    ].includes(name) ||
    /core-js/.test(name) ||
    /szfe-tools/.test(name),
  plugins: [
    resolve(),
    postcss({
      extract: true,
    }),
    babel(babelOptions),
    uglify()
  ]
};