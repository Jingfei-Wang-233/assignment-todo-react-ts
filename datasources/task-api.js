import { RESTDataSource } from 'apollo-datasource-rest';

export class TaskAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:8080/';
  }
  // 如果在这里我想要给getTask传一个可以为空的参数completed，要怎么做？
  // 不过好像没什么必要
  getTasks(completed) {
    if (completed == null) {
      return this.get('tasks');
    }
    return this.get(`tasks/?completed=${completed}`);
  }
  getTaskById(id) {
    return this.get(`tasks/${id}`);
  }
  addTask(name) {
    return this.post('tasks', { name: name });
  }
}
