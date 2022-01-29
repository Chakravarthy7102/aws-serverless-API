const AWS = require("aws-sdk");
AWS.config.update({
  region: "region",
});

const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  // TODO implement

  const body = JSON.parse(event.body);

  const params = {
    TableName: "expenses",
    Key: {
      id: event.pathParameters.id,
    },
    UpdateExpression: "set expense = :d , amount =:a",
    ExpressionAttributeValues: {
      ":d": body.expense,
      ":a": body.amount,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const result = await db.update(params).promise();

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
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
