const uuid = require('uuid');
const AWSDynamoDBService = require('../services/aws/db/dynamodb');

class Todo {
  static dynamoDBServiceClient = new AWSDynamoDBService();
  static dynamoDBTableName = process.env.DYNAMO_DB_TODO_TABLE_NAME;
  constructor(
      title, task,
  ) {
    this.title = title;
    this.task = task;
    this.id = uuid.v4();
  }

  getJSON = () => {
    return {
      id: this.id,
      title: this.title,
      task: this.task,
    };
  };

  getDynamoDBFormatted = () => {
    return {
      id: {
        'S': this.id,
      },
      title: {
        'S': this.title,
      },
      task: {
        'S': this.task,
      },
    };
  };

  save = async (
      callback = (err, data = {}) => {},
  ) => {
    await Todo.dynamoDBServiceClient.put(
        Todo.dynamoDBTableName,
        this.getDynamoDBFormatted(),
    ).catch(
        (err) => {
          callback(err);
        },
    ).then(
        (data) => {
          callback(undefined, data);
        },
    );
  };

  static get = async (
      id,
  ) => {
    const itemFilter = {
      Key: {
        id: {
          'S': id,
        },
      },
    };
    return await Todo.dynamoDBServiceClient.getItem(
        Todo.dynamoDBTableName,
        itemFilter,
    );
  };

  static retrieveAllMatchingEntries = async (
      applicableFilter = {},
  ) => {
    const records = await Todo.dynamoDBServiceClient.scan(
        Todo.dynamoDBTableName,
        applicableFilter,
    );
    /**
 * Records could be converted to readable JSON.
 * Different from dynamoDb returned objects
 */
    return records;
  };
}


module.exports = Todo;
