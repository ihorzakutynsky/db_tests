const redis = require("redis");
const _ = require("lodash");

const client = redis.createClient();


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
