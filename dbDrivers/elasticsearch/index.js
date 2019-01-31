const elasticsearch = require('elasticsearch');
const _ = require("lodash");

const client = new elasticsearch.Client({
  host: 'localhost:9200'
});

const insert = (item) => {
    return client.create({
        index: 'db_test',
        type: 'apilog',
        id: _.get(item, 'id'),
        body: _.omit(item, 'id')
    });
}

module.exports = {
    insert
}
