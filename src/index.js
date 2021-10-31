const todoHandlers = require('./handlers/todo');
module.exports = {
  createTodo: todoHandlers.createTODO,
  findMatchingTodos: todoHandlers.getTODO,
};
