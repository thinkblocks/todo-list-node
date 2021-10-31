const AWS = require('aws-sdk');

class AWSDynamoDBService {
  constructor(
  ) {
    this.dynamodbClient = new AWS.DynamoDB(
        {
          'apiVersion': process.env.AWS_DYNAMODB_CLIENT_API_VERSION,
        },
    );
  }

  fetchAllItems = async () => {

  };

  put = async (
      table,
      item,
  ) => {
    return new Promise(
        (resolve, reject) => {
          this.dynamodbClient.putItem(
              {
                TableName: table,
                Item: item,
              },
              (err, data) => {
                if (err) {
                  reject(err);
                }
                resolve(
                    data,
                );
              },
          );
        },
    );
  };

  getItem = async (
      tableName,
      itemFilter,
  ) => {
    return new Promise(
        (resolve, reject) => {
          this.dynamodbClient.getItem(
              {
                TableName: tableName,
                ...itemFilter,
              },
              (err, data) => {
                if (err) {
                  reject(err);
                }
                resolve(data.Item);
              },
          );
        },
    );
  };

  scan = async (
      tableName,
      params,
  ) => {
    return (
      new Promise(
          (resolve, reject) => {
            const items = [];
            this.dynamodbClient.scan(
                {
                  TableName: tableName,
                  ...params,
                },
                (err, data) => {
                  if (err) {
                    reject(err);
                  }
                  items.push(...data.Items);
                  if (
                    data.LastEvaluatedKey
                  ) {
                    this.scan(
                        tableName,
                        {...params, ExclusiveStartKey: data.LastEvaluatedKey},
                    ).then(
                        (data) => {
                          const appendableItems = data;
                          items.push(...appendableItems);
                        },
                    );
                  }
                  resolve(items);
                },
            );
          },
      )
    );
  };
}

module.exports = AWSDynamoDBService;
