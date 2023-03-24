import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from '../server/schema.js';

describe('schema', () => {
  describe('typeDefs', () => {
    it('should define a valid schema', () => {
      const schema = makeExecutableSchema({ typeDefs });
      expect(schema).toBeDefined();
    });
  });
});
