const API_RESPONSE_CONFIG = require('../constants/api');
const Todo = require('../models/todo');

const createTODO = async (
    event, context,
) => {
  let code = API_RESPONSE_CONFIG.CODE.SUCCESS;
  let message = API_RESPONSE_CONFIG.MESSAGE.SUCCESS;
  let result = {};
  const todo = new Todo(
      event?.title,
      event?.task,
  );
  await todo.save(
      (err, data) => {
        result = data;
        if (err) {
          console.log(err);
          code = API_RESPONSE_CONFIG.CODE.UNPROCESSABLE_INPUT;
          message = API_RESPONSE_CONFIG.MESSAGE.UNPROCESSABLE_INPUT;
        }
      },
  );

  return {
    code: code,
    message: message,
    data: result,
  };
};

const getTODO = async (
    event,
) => {
  let result = {};
  if (
    event?.id
  ) {
    const matchingTodo = await Todo.get(
        event.id,
    );
    result = matchingTodo;
  } else {
    result = await Todo.retrieveAllMatchingEntries();
  }
  return {
    code: API_RESPONSE_CONFIG.CODE.SUCCESS,
    message: API_RESPONSE_CONFIG.MESSAGE.SUCCESS,
    data: result,
  };
};

module.exports = {
  getTODO,
  createTODO,
};
