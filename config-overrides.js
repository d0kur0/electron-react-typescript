const path = require("path");

module.exports = {
  paths: paths => ({
    ...paths,
    appIndexJs: path.resolve(__dirname, "src/rendererProcess/index.tsx"),
    appSrc: path.resolve(__dirname, "src/rendererProcess"),
  }),
};
