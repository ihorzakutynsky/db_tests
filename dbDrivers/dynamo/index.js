const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB();

const insert = (item) => {
    const params = {
        Item: item,
        TableName: 'ApiLogs'
    }

    return new Promise((resolve, reject) => {
        dynamodb.putItem(params, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    })
}

module.exports = {
    insert
}
