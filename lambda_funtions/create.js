const AWS = require("aws-sdk");
AWS.config.update({
  region: "region",
});

const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  // TODO implement

  const body = JSON.parse(event.body);

  const params = {
    TableName: "expenses",
    Item: {
      id: context.awsRequestId,
      ...body,
    },
  };

  try {
    const newItem = await db.put(params).promise();

    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    return response;
  } catch (err) {
    console.log(err);
  }
};
