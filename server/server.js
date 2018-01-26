const Koa = require('koa');
const Router = require('koa-router');
const route = require('koa-route');
const webpack = require('webpack');
// const middleware = require('koa-webpack');
const path = require('path');
const fs = require('fs');
const config = require(path.resolve(__dirname, '../webpack.config'));
const compiler = webpack(config);
const koaBody = require('koa-body');
// const mongo = require('koa-mongo');
const ObjectId = require('mongodb').ObjectID;
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const router = new Router();
const PORT = process.env.PORT || 3000;
const app = new Koa();
const d = require('./db/mongo')
d(app);

app.use(koaBody());
// app.use(middleware(compiler));

app.use(webpackDevMiddleware(compiler, {
  noInfo: true, publicPath: config.output.publicPath
}));

// Step 3: Attach the hot middleware to the compiler & the server
app.use(webpackHotMiddleware(compiler, {
  log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

// app.use(async (ctx, next) => {
//   next()
//   ctx.set('Content-Type', 'text/html');
//   ctx.body = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'));
// });


router
  .post('/', async (ctx) => {
    try {
      // ctx.set('Content-Type', 'text/html');
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
      console.log(ctx.body);
    } catch (e) {
      ctx.message = e;
      ctx.status = 500;
    }
  })
  .post('/updateTodo', async (ctx) => {
    try {
      let todo = JSON.parse(ctx.request.body);
      let id = new ObjectId(todo._id);

      ctx.body = await ctx.app.database.collection('todos')
      .findOneAndUpdate({ _id: id }, {
        $set: {
          'modified': todo.modified,
          'body': todo.body,
          'status': todo.status
        }
      }, {
        returnOriginal: false
      })
    } catch (error) {
      ctx.message = e;
      ctx.status = 500;
    }
  })
  .post('/removeTodo', async (ctx) => {
    try {
      let id = new ObjectId(ctx.request.body);
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