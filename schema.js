import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    "query to get tasks"
    getAllTasks(completed: Boolean): [Task!]
    "fetch a specific task by Id"
    getTaskById(id: Int!): Task
  }
  "a type entity correspond to type Task at client side"
  type Task {
    id: Int
    name: String!
    completed: Boolean!
  }
`;
