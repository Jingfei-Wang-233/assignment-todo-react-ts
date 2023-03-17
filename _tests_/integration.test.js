// import { jest } from '@jest/globals';
import { typeDefs } from '../server/schema.js';
import { resolvers } from '../server/resolver.js';
import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server';
import { TaskAPI } from '../server/datasources/task-api.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      taskAPI: new TaskAPI(), //是否应该 把datasources给mock掉，还是直接把整个server给mock
    };
  },
});
describe('Query test', () => {
  it('should get todo tasks list', async () => {
    // given
    const { query } = createTestClient(server);
    const GET_ALL_TASKS = 'query { getAllTasks(completed: false) { id name completed } }';
    // when
    const { data } = await query({ query: GET_ALL_TASKS });
    // then
    expect(data).toHaveProperty('getAllTasks');
    expect(Array.isArray(data.getAllTasks)).toBe(true);
  });
});
