const resolvers = {
  Query: {
    getPosts: async (_parent, _args, { dataSources }) => {
      const data = await dataSources.PostAPI.getPosts();
      return data;
    },
  },
};

export { resolvers };
