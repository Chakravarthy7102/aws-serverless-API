const AWS = require("aws-sdk");
AWS.config.update({
  region: "region",
});

const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const params = {
    TableName: "expenses",
    Key: {
      id: event.pathParameters.id,
    },
  };

  try {
    const result = await db.delete(params).promise();

    const response = {
      statusCode: 204,
      body: JSON.stringify("deleted"),
    };
    return response;
  } catch (err) {
    const response = {
      statusCode: 501,
      body: JSON.stringify(err),
    };
    return response;
  }
};
