import { DataSource } from 'apollo-datasource';
import { Client } from '@elastic/elasticsearch';
import * as fs from 'fs';
import { ES_NODE, TASK_INDEX } from '../constants/constants.js';

export class ElasticsearchDataSource extends DataSource {
  constructor() {
    super();
    this.client = new Client({
      node: ES_NODE,
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
    return await this.client.search({
      index: TASK_INDEX,
      body: {
        query: {
          match_all: {},
        },
        size: 100,
      },
    });
  }
  async getTaskById(taskId) {
    return await this.client.get({
      index: TASK_INDEX,
      id: taskId,
    });
  }
  async createTask(taskName) {
    const response = await this.client.index({
      index: TASK_INDEX,
      document: {
        name: taskName,
        completed: false,
      },
    });
    return {
      id: response._id,
      name: taskName,
      completed: false,
    };
  }
  async updateTask(taskId, taskName, completed) {
    return await this.client.update({
      index: TASK_INDEX,
      id: taskId,
      doc: {
        name: taskName,
        completed: completed,
      },
    });
  }
  async deleteTask(taskId) {
    return await this.client.delete({
      index: TASK_INDEX,
      id: taskId,
    });
  }
}
