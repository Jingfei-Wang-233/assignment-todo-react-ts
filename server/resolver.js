import { GraphQLError } from 'graphql';

export const resolvers = {
  Query: {
    getAllTasks: async (_, __, { dataSources }) => {
      const res = await dataSources.elasticSearch.getTasks();
      return res.hits.hits.map((hit) => ({
        id: hit._id,
        name: hit._source.name,
        completed: hit._source.completed,
      }));
    },
    getTaskById: async (_, { id }, { dataSources }) => {
      const res = await dataSources.elasticSearch.getTaskById(id);
      return {
        id: res._id,
        name: res._source.name,
        completed: res._source.completed,
      };
    },
  },
  Mutation: {
    addTask: async (_, { name }, { dataSources }) => {
      if (name === '') {
        throw new GraphQLError('task name should not be blank', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      return await dataSources.elasticSearch.createTask(name);
    },
    updateTask: async (_, { id, name, completed }, { dataSources }) => {
      const res = await dataSources.elasticSearch.updateTask(id, name, completed);
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
    deleteTask: async (_, { id }, { dataSources }) => {
      const res = await dataSources.elasticSearch.deleteTask(id);
      return res._id;
    },
  },
};
