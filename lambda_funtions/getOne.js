const AWS = require("aws-sdk");
AWS.config.update({
  region: "region",
});

const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  // TODO implement

  const params = {
    TableName: "expenses",
    Key: {
      id: event.pathParameters.id,
    },
  };
  try {
    const result = await db.get(params).promise();
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    return response;
  } catch (err) {
    const response = {
      statusCode: 500,
      body: JSON.stringify(err),
    };
    return response;
  }
};
