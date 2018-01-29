const Koa = require('koa');
const app = new Koa();
const webpack = require('webpack');
const path = require('path');
// const devMiddleware = require('webpack-dev-middleware');
// const hotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require(path.resolve(__dirname, '../webpack.config'));
require('regenerator-runtime/runtime')
const compiler = webpack(webpackConfig);
const devMiddleware = require("./hmr/dev");
const hotMiddleware = require("./hmr/hot");
const routes = require('./routes/');

const fs = require('fs');
const koaBody = require('koa-body');
const PORT = process.env.PORT || 3000;
const db = require('./db/mongo')
db(app);

app.use(devMiddleware(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(hotMiddleware(compiler, {}));

app.use(koaBody());
routes(app);

app.listen(PORT, () => {
  console.log(`Dev Server hosting on port: "${PORT}"`);
});

module.exports = app