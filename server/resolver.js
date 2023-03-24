import { GraphQLError } from 'graphql';

export const resolvers = {
  // Query: {
  //   getAllTasks: (_, args, { dataSources }) => {
  //     return dataSources.taskAPI.getTasks(args.completed);
  //   },
  //   getTaskById: (_, { id }, { dataSources }) => {
  //     return dataSources.taskAPI.getTaskById(id).catch((err) => console.log(err.message));
  //   },
  // },
  // Mutation: {
  //   addTask: async (_, { name }, { dataSources }) => {
  //     if (name === '') {
  //       throw new GraphQLError('task name should not be empty!', {
  //         extensions: {
  //           code: 'BAD_USER_INPUT',
  //         },
  //       });
  //     }
  //     const newTask = await dataSources.taskAPI.addTask(name);
  //     return {
  //       code: 201,
  //       success: true,
  //       message: `Successfully add new task named ${name}`,
  //       task: newTask,
  //     };
  //   },
  //   markTask: async (_, { id, name, completed }, { dataSources }) => {
  //     const updatedTask = await dataSources.taskAPI.updateTask(id, name, completed);
  //     return {
  //       code: 200,
  //       success: true,
  //       message: `You have updated task ${id} successfully`,
  //       task: updatedTask,
  //     };
  //   },
  // },
  Query: {
    getAllTasks: async (_, __, { dataSources }) => {
      return await dataSources.elasticSearch.getTasks();
    },
    getTaskById: async (_, { id }, { dataSources }) => {
      return await dataSources.elasticSearch.getTaskById(id);
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
      console.log(name);
      return await dataSources.elasticSearch.createTask(name);
    },
    updateTask: async (_, { id, name, completed }, { dataSources }) => {
      const res = await dataSources.elasticSearch.updateTask(id, name, completed);
      console.log(res);
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
  },
};
