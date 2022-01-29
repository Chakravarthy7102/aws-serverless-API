var AWS = require("aws-sdk");
AWS.config.update({
  region: "region",
});

var dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  // TODO implement

  const params = {
    TableName: "expenses",
  };

  try {
    const result = await dynamoDb.scan(params).promise();
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
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
