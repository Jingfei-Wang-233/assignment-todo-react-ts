import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    "query to get tasks"
    tasks: [Task!]
  }
  "a type entity correspond to type Task at client side"
  type Task {
    id: Int
    name: String!
    completed: Boolean!
  }
`;
