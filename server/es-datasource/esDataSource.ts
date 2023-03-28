import { DataSource } from 'apollo-datasource';
import { Client } from '@elastic/elasticsearch';
import * as fs from 'fs';

const ES_NODE = 'https://localhost:9200';

const TASK_INDEX = 'tasks';

export class TaskAPI extends DataSource {
  private client: Client;
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
  // 如何改进此处的查询
  async getTasks(completed?: boolean): Promise<object> {
    const taskQuery =
      typeof completed === 'boolean'
        ? {
            match: {
              completed: completed,
            },
          }
        : {
            match_all: {},
          };
    return this.client.search({
      index: TASK_INDEX,
      query: taskQuery,
      size: 100,
      sort: {
        createdAt: 'desc',
      },
    });
  }
  async getTaskById(taskId: string): Promise<object> {
    return await this.client.get({
      index: TASK_INDEX,
      id: taskId,
    });
  }
  async createTask(taskName: string): Promise<object> {
    const createdTime = Date.now();
    const response = await this.client.index({
      index: TASK_INDEX,
      document: {
        name: taskName,
        completed: false,
        createdAt: createdTime,
      },
    });
    return {
      id: response._id,
      name: taskName,
      completed: false,
      createdAt: new Date(createdTime).toISOString(),
    };
  }
  async updateTask(taskId: string, taskName: string, completed: boolean): Promise<object> {
    return await this.client.update({
      index: TASK_INDEX,
      id: taskId,
      doc: {
        name: taskName,
        completed: completed,
      },
    });
  }
  async deleteTask(taskId: string): Promise<object> {
    return await this.client.delete({
      index: TASK_INDEX,
      id: taskId,
    });
  }
}
