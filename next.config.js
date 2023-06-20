//const withLess = require("next-with-less");
const withImages = require("next-images");

const withPlugins = require("next-compose-plugins");
const isProd = process.env.NODE_ENV === "production";

const withAntdLess = require("next-plugin-antd-less");

const withLess = withAntdLess({
  // optional: you can modify antd less variables directly here
  modifyVars: { "@primary-color": "#04f" },
  // Or better still you can specify a path to a file
  lessVarsFilePath: "./styles/variables.less",
  // optional
  lessVarsFilePathAppendToEndOfContent: false,
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {},

  // Other Config Here...

  webpack(config) {
    return config;
  },

  // ONLY for Next.js 10, if you use Next.js 11, delete this block
  future: {
    webpack5: true,
  },
});

// fix: prevents error when .less files are required by node
/* if (typeof require !== "undefined") {
  require.extensions[".less"] = (file) => {};
} */

const Images = withImages({
  //exclude: path.resolve(__dirname, 'src/assets/images'),
  webpack(config, options) {
    return config;
  },
});

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://greetingslamp-api-284075eb473f.herokuapp.com/:path*",
      },
    ];
  },
};

module.exports = withPlugins([Images, withLess], nextConfig);
