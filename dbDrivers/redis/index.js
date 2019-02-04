const redis = require("redis");
const RedisClustr = require('redis-clustr');
const _ = require("lodash");

const client = new RedisClustr({
    servers: [
        {
            host: '127.0.0.1',
            port: '6379'
        }
    ],
    createClient: function (port, host) {
        return redis.createClient(port, host);
    }
});


client.on("error", (err) => {
    console.log(`Redis connection error: ${err}`);
});

client.on("connect", () => {
    console.log(`Redis connecton open`);
});


const insert = (item) => {
    return new Promise((resolve, reject) => {
        try {
            const result = client.set(item.id, JSON.stringify(_.omit(item, ['id'])));
            resolve(result);
        } catch (e) { reject(e) }
    })
}

module.exports = {
    client,
    insert
}
