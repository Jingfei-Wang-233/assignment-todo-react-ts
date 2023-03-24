import { DataSource } from 'apollo-datasource';
import { Client } from '@elastic/elasticsearch';
import * as fs from 'fs';
export class ElasticsearchDataSource extends DataSource {
  constructor() {
    super();
    this.client = new Client({
      node: 'https://localhost:9200',
      auth: {
        username: 'elastic',
        password: 'changeme',
      },
      tls: {
        ca: fs.readFileSync('./http_ca.crt'),
        rejectUnauthorized: false,
      },
    });
  }
  async getTasks() {
    const response = await this.client.search({
      index: 'tasks',
      body: {
        query: {
          match_all: {},
        },
        size: 100,
      },
    });
    return response.hits.hits.map((hit) => ({
      id: hit._id,
      name: hit._source.name,
      completed: hit._source.completed,
    }));
  }
  async getTaskById(taskId) {
    const response = await this.client.get({
      index: 'tasks',
      id: taskId,
    });
    console.log(response);
    return {
      id: response._id,
      name: response._source.name,
      completed: response._source.completed,
    };
  }
}
