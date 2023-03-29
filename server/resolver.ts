import { GraphQLError } from 'graphql';
import { EsDataSources } from './es-datasource';
import { SearchHit } from '@elastic/elasticsearch/lib/api/types';

// define what a context object looks like
type Context = {
  dataSources: EsDataSources;
};

type Args = {
  id: string;
  completed?: boolean;
  name: string;
};

// define what a resolver function looks like
type ResolverFunction = (
  parent: null,
  args: Args,
  context: Context,
) => Promise<object> | Promise<string> | Error;

// Define the top-level resolvers.
type ResolverMap = {
  [fieldName: string]: ResolverFunction;
};

// Define the top-level resolvers.
type Resolvers = {
  Query: ResolverMap;
  Mutation: ResolverMap;
};
export const resolvers: Resolvers = {
  Query: {
    getAllTasks: async (_, { completed }, { dataSources }) => {
      const res = await dataSources.taskAPI.getTasks(completed);
      return res.hits.hits.map((hit: SearchHit<any>) => {
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
              createdAt: new Date(hit._source.createdAt).toISOString(),
            };
      });
    },
    getTaskById: async (_, { id }, { dataSources }) => {
      const res = await dataSources.taskAPI.getTaskById(id);
      return {
        id: res._id,
        name: res._source.name,
        completed: res._source.completed,
        createdAt: new Date(res._source.createdAt).toISOString(),
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
      return dataSources.taskAPI.createTask(name);
    },
    updateTask: async (_, { id, name, completed }, { dataSources }) => {
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
    deleteTask: async (_: null, { id }, { dataSources }) => {
      const res = await dataSources.taskAPI.deleteTask(id);
      return `task ${res._id} has been deleted successfully`;
    },
  },
};
