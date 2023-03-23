import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema.js';
import { resolvers } from './resolver.js';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { ElasticsearchDataSource } from './es-datasource/esDataSource.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      // taskAPI: new TaskAPI(),
      elasticSearch: new ElasticsearchDataSource(),
    };
  },
  includeStacktraceInErrorResponses: false,
  formatError: (err) => {
    if (err.extensions.code === ApolloServerErrorCode.INTERNAL_SERVER_ERROR) {
      return new Error('Oops, something went wrong, please wait.');
    }
    if (err.extensions.code === ApolloServerErrorCode.BAD_USER_INPUT) {
      return new Error('Invalid Input!');
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
