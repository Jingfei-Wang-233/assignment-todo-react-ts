import { jest } from '@jest/globals';
import { typeDefs } from '../server/schema.js';
import { resolvers } from '../server/resolver.js';
import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server';
import { TaskAPI } from '../server/datasources/task-api.js';

describe('Query test', () => {
  it('should get todo tasks list', async () => {
    // given: mock the dataSources
    const taskAPI = new TaskAPI();
    taskAPI.getTasks = jest.fn().mockResolvedValue([
      {
        id: 1,
        name: 'test',
        completed: false,
      },
      {
        id: 2,
        name: 'test two',
        completed: true,
      },
    ]);
    // configure test server with mocked data sources
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => ({ dataSources: { taskAPI } }),
    });
    // create test client
    const { query } = createTestClient(server);
    // when
    const GET_ALL_TASKS = 'query { getAllTasks { id name completed } }';
    const { data } = await query({ query: GET_ALL_TASKS });
    // then
    expect(taskAPI.getTasks).toHaveBeenCalled();
    expect(data).toHaveProperty('getAllTasks');
    expect(data.getAllTasks.length).toBe(2);
    console.log(data.getAllTasks);
  });

  it('should get task by id', async () => {
    const taskAPI = new TaskAPI();
    // Given
    taskAPI.getTaskById = jest.fn().mockResolvedValue({
      id: 1,
      name: 'test',
      completed: false,
    });
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => ({ dataSources: { taskAPI } }),
    });
    const { query } = createTestClient(server);
    // When
    const GET_SINGLE_TASK = `query getTaskById($id: Int!) {
      getTaskById(id: $id) {
        id
        name
        completed
      }
    }`;
    const { data } = await query({
      query: GET_SINGLE_TASK,
      variables: { id: 1 },
    });
    console.log(data);
    // Then
    expect(data).toHaveProperty('getTaskById');
    expect(taskAPI.getTaskById).toHaveBeenCalled();
    expect(data.getTaskById.name).toBe('test');
  });
});
