const Koa = require('koa');
const app = new Koa();
const webpack = require('webpack');
const path = require('path');
// const devMiddleware = require('webpack-dev-middleware');
// const hotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require(path.resolve(__dirname, '../webpack.config'));
const koa2Connect = require('koa2-connect');
require('regenerator-runtime/runtime')
const compiler = webpack(webpackConfig);
const devMiddleware = require("./hmr/dev");
const hotMiddleware = require("./hmr/hot");


const Router = require('koa-router');
const fs = require('fs');
const koaBody = require('koa-body');
const ObjectId = require('mongodb').ObjectID;


const router = new Router();
const PORT = process.env.PORT || 3000;

const db = require('./db/mongo')
db(app);

app.use(devMiddleware(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(hotMiddleware(compiler, {}));

app.use(koaBody());

router
  .post('/', async (ctx) => {
    try {
      ctx.set('Content-Type', 'text/html');
      ctx.body = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'));
    } catch (e) {
      ctx.status = 404;
      ctx.message = e;
    }
  })
  .post('/getTodos', async (ctx) => {
    try {
      ctx.body = await ctx.app.database.collection('todos').find().toArray()
      ctx.status = 200;
    } catch (e) {
      ctx.message = e;
      ctx.status = 500;
    } 
  })
  .post('/addTodo', async (ctx) => {
    try {
      let insertOne = await ctx.app.database.collection('todos').insertOne(JSON.parse(ctx.request.body))
      ctx.body = insertOne.ops[0]
    } catch (e) {
      ctx.message = e;
      ctx.status = 500;
    }
  })
  .put('/updateTodo', async (ctx) => {
    try {
      let todo = JSON.parse(ctx.request.body);
      let id = new ObjectId(todo._id);

      ctx.body = await ctx.app.database.collection('todos')
      .findOneAndUpdate({ _id: id }, {
        $set: {
          modified: todo.modified,
          body: todo.body,
          status: todo.status
        }
      }, {
        returnOriginal: false
      })
    } catch (error) {
      ctx.message = e;
      ctx.status = 500;
    }
  })
  .del('/:id', async (ctx) => {
    try {
      const id = new ObjectId(ctx.params.id);
      ctx.body = await ctx.app.database.collection('todos').deleteOne({ _id: id })
    } catch (error) {
      ctx.message = e;
      ctx.status = 500;
    }
  })

app.use(router.routes())

app.listen(PORT, () => {
  console.log(`Dev Server hosting on port: "${PORT}"`);
});

module.exports = app