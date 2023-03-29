import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolver.js';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { TaskAPI } from './es-datasource/esDataSource.js';
import { GraphQLError } from 'graphql';
import { typeDefs } from './schema.js';
import { EsDataSources } from './es-datasource';

const dataSources = () =>
  ({
    taskAPI: new TaskAPI(),
  } as EsDataSources);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  includeStacktraceInErrorResponses: false,
  formatError: (err: GraphQLError) => {
    if (err.extensions.code === ApolloServerErrorCode.BAD_USER_INPUT) {
      return new Error(err.message);
    }
    if (err.message.includes('not_found')) {
      return new Error('Task not exist!');
    }
    return err;
  },
});
server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at http://localhost:4000
`);
});
