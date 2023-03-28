import { GraphQLError } from 'graphql';

export const resolvers = {
  Query: {
    getAllTasks: async (_: null, { completed }: { completed?: boolean }, { dataSources }: any) => {
      const res = await dataSources.taskAPI.getTasks(completed);
      return res.hits.hits.map((hit: any) => {
        return hit._source.createdAt === null
          ? {
              id: hit._id,
              name: hit._source.name,
              completed: hit._source.completed,
              createdAt: null,
            }
          : {
              id: hit._id,
              name: hit._source.name,
              completed: hit._source.completed,
              createdAt: hit._source.createdAt,
            };
      });
    },
    getTaskById: async (_: null, { id }: { id: string }, { dataSources }: any) => {
      const res = await dataSources.taskAPI.getTaskById(id);
      return {
        id: res._id,
        name: res._source.name,
        completed: res._source.completed,
        createdAt: res._source.createdAt,
      };
    },
  },
  Mutation: {
    addTask: async (_: null, { name }: { name: string }, { dataSources }: any) => {
      if (name === '') {
        throw new GraphQLError('task name should not be blank', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      return await dataSources.taskAPI.createTask(name);
    },
    updateTask: async (
      _: null,
      { id, name, completed }: { id: string; name: string; completed: boolean },
      { dataSources }: any,
    ) => {
      const res = await dataSources.taskAPI.updateTask(id, name, completed);
      if (res.result === 'noop') {
        throw new GraphQLError('Either taskName or completed status should be updated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      return {
        id: res._id,
        name: name,
        completed: completed,
      };
    },
    deleteTask: async (_: null, { id }: { id: string }, { dataSources }: any) => {
      const res = await dataSources.taskAPI.deleteTask(id);
      return res._id;
    },
  },
};
