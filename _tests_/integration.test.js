import { jest } from '@jest/globals';
import { typeDefs } from '../server/schema.js';
import { resolvers } from '../server/resolver.js';
import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server';
import { TaskAPI } from '../server/datasources/task-api.js';

describe('integration test', () => {
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
    });

    it('should get task by id', async () => {
      const taskAPI = new TaskAPI();
      // Given
      taskAPI.getTaskById = jest.fn().mockResolvedValue({
        id: 2,
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
        variables: { id: 2 },
      });
      // Then
      expect(data).toHaveProperty('getTaskById');
      expect(taskAPI.getTaskById).toHaveBeenCalledWith(2);
      expect(data.getTaskById.name).toBe('test');
    });
  });
  describe('Mutation test', () => {
    it('should return created task', async () => {
      const taskAPI = new TaskAPI();
      const taskName = 'new task';
      const newTask = {
        id: 3,
        name: taskName,
        completed: false,
      };
      taskAPI.addTask = jest.fn().mockResolvedValue(newTask);
      const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({ dataSources: { taskAPI } }),
      });
      const ADD_NEW_TASK = `mutation addTask($name: String!) {
      addTask(name: $name) {
        task {
          id
          name
          completed
        }
        success
        message
        code
      }
    }`;
      const { mutate } = createTestClient(server);
      const { data } = await mutate({ mutation: ADD_NEW_TASK, variables: { name: taskName } });
      expect(data).toHaveProperty('addTask');
      // expect(data.addTask.task).toBe({});
      expect(data.addTask.code).toBe(201);
      expect(data.addTask.success).toBe(true);
      expect(data.addTask.message).toBe(`Successfully add new task named ${taskName}`);
      expect(data.addTask.task).toMatchObject(newTask);
    });
    it('should throw error when name is empty', async () => {
      const taskAPI = new TaskAPI();
      const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({ dataSources: { taskAPI } }),
      });
      const { mutate } = createTestClient(server);

      const ADD_NEW_TASK = `mutation addTask($name: String!) {
      addTask(name: $name) {
        task {
          id
          name
          completed
        }
        success
        message
        code
      }
    }`;
      const { errors } = await mutate({
        mutation: ADD_NEW_TASK,
        variables: {
          name: '',
        },
      });
      expect(errors[0].message).toBe('task name should not be empty!');
    });
  });
});
