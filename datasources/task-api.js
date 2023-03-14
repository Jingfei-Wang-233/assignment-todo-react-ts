import { RESTDataSource } from 'apollo-datasource-rest';

export class TaskAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:8080/';
  }
  // 如果在这里我想要给getTask传一个可以为空的参数completed，要怎么做？
  // 不过好像没什么必要
  getTasks() {
    return this.get('tasks');
  }
}
