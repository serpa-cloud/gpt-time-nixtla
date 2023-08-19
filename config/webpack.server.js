const path = require('path');
const nodeExternals = require('webpack-node-externals');
const StylexPlugin = require('@serpa-cloud/stylex-webpack-plugin');

const paths = require('./paths');

const ASSET_PATH = process.env.ASSET_PATH;

const imageInlineSizeLimit = parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || '10000');

const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false;
  }

  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
})();

const version = require('../package.json').version;

module.exports = {
  entry: './src/server.js',

  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve('server-build'),
    filename: 'index.js',
    assetModuleFilename: `static/media/[name].${version}[ext]`,
    publicPath: ASSET_PATH || '/',
  },

  resolve: {
    extensions: paths.moduleFileExtensions.map((ext) => `.${ext}`),
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
      },
    },
  },

  module: {
    rules: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: imageInlineSizeLimit,
          },
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: require.resolve('@svgr/webpack'),
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
          {
            loader: require.resolve('file-loader'),
            options: {
              name: `static/media/[name].${version}.[ext]`,
            },
          },
        ],
        issuer: {
          and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
        },
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: paths.appSrc,
        use: [
          {
            loader: StylexPlugin.loader,
            options: {
              inject: false,
              serverMode: true,
            },
          },
          {
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve('babel-preset-react-app/webpack-overrides'),
              presets: [
                [
                  require.resolve('babel-preset-react-app'),
                  {
                    runtime: hasJsxRuntime ? 'automatic' : 'classic',
                  },
                ],
              ],
              compact: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [new StylexPlugin()],
};
