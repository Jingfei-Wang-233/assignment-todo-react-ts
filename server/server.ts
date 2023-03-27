import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolver.js';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { TaskAPI } from './es-datasource/esDataSource.js';
import { GraphQLError } from 'graphql';
import { typeDefs } from './schema.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      taskAPI: new TaskAPI(),
    };
  },
  includeStacktraceInErrorResponses: false,
  formatError: (err: GraphQLError) => {
    if (err.extensions.code === ApolloServerErrorCode.INTERNAL_SERVER_ERROR) {
      return new Error('Oops, something went wrong, please wait.');
    }
    if (err.extensions.code === ApolloServerErrorCode.BAD_USER_INPUT) {
      return new Error(err.message);
    }
    if (err.message.includes('Not Found')) {
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
