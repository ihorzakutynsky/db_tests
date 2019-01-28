const elasticsearch = require('elasticsearch');


const client = new elasticsearch.Client({
  host: 'localhost:9200'
});

async function run() {
    await client.create({
        index: 'db_test',
        type: 'apilog',
        id: '2',
        body: {
          title: 'Test 1',
          tags: ['y', 'z'],
          published: true,
          published_at: '2013-01-01',
          counter: 1
        }
      });
}

run();