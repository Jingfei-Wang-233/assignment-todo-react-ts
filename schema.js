import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    "query to get tasks"
    getAllTasks(completed: Boolean): [Task!]
    "fetch a specific task by Id"
    getTaskById(id: Int!): Task
  }
  type Mutation {
    "add a new task with taskName with default completed false"
    addTask(name: String!): TaskResponse!
    markTask(id: Int!, name: String!, completed: Boolean!): TaskResponse!
  }
  "a type entity correspond to type Task at client side"
  type Task {
    id: Int
    name: String!
    completed: Boolean!
  }
  type TaskResponse {
    "similar to HTTP status code"
    code: Int!
    "indicate whether the mutation is successful"
    success: Boolean!
    "message for UI"
    message: String!
    "newly added task"
    task: Task
  }
`;
