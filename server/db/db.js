const ObjectId = require('mongodb').ObjectID;

let db = {};

db.def = async (ctx) => {
  try {
    ctx.set('Content-Type', 'text/html');
    ctx.body = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'));
  } catch (e) {
    ctx.status = 404;
    ctx.message = e;
  }
}

db.listTodos = async (ctx) => {
  try {
    ctx.body = await ctx.app.database.collection('todos').find().toArray()
    ctx.status = 200;
  } catch (e) {
    ctx.message = e;
    ctx.status = 500;
  }
}

db.addTodo = async (ctx) => {
  try {
    let insertOne = await ctx.app.database.collection('todos').insertOne(JSON.parse(ctx.request.body))
    ctx.body = insertOne.ops[0]
  } catch (e) {
    ctx.message = e;
    ctx.status = 500;
  }
}

db.updateTodo = async (ctx) => {
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
}

db.del = async (ctx) => {
  try {
    const id = new ObjectId(ctx.params.id);
    ctx.body = await ctx.app.database.collection('todos').deleteOne({ _id: id })
  } catch (error) {
    ctx.message = e;
    ctx.status = 500;
  }
};

module.exports = db
