// const tasks = [
//   {
//     id: 1,
//     name: 'if the plane goes down',
//     completed: false,
//   },
//   {
//     id: 2,
//     name: 'the airport',
//     completed: false,
//   },
//   {
//     id: 3,
//     name: 'will shut down',
//     completed: true,
//   },
//   {
//     id: 4,
//     name: 'new where to go then',
//     completed: false,
//   },
//   {
//     id: 5,
//     name: 'how far I would go',
//     completed: true,
//   },
//   {
//     id: 6,
//     name: 'random access',
//     completed: false,
//   },
//   {
//     id: 7,
//     name: 'when I pass away',
//     completed: true,
//   },
//   {
//     id: 8,
//     name: 'interesting',
//     completed: false,
//   },
//   {
//     id: 666,
//     name: 'what should be the answer',
//     completed: true,
//   },
// ];

export const resolvers = {
  // return an array of tasks that will be used to populate
  // for the render
  // mocked:
  // Query: {
  //   tasks: () => tasks,
  // },
  Query: {
    getAllTasks: (_, args, { dataSources }) => {
      return dataSources.taskAPI.getTasks(args.completed);
    },
    getTaskById: (_, { id }, { dataSources }) => {
      return dataSources.taskAPI.getTaskById(id);
    },
  },
};
