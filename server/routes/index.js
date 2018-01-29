var Router = require('koa-router');
const db = require('../db/db');

function routes(app) {
  var router = new Router();
    
  router
    .post('/', db.def)
    .get('/listTodos', db.listTodos)
    .post('/addTodo', db.addTodo)
    .put('/updateTodo', db.updateTodo)
    .del('/:id', db.del)

    app.use(router.routes());
}

module.exports = routes
