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
    getAllTasks: (_, __, { dataSources }) => {
      return dataSources.elasticSearch.getTasks();
    },
  },
};
