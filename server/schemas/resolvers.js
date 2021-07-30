// bring in models --  not sure if I need book. Seems like a funny structure.
const { User } = require ('../models')

const resolvers = {
  Query: {
    getUser: async (parent, params) => {
      try {
        console.log(params);
        return User.findOne({ _id: params.id });

      } catch (error) {
        console.error(error);
      }
    },
  },
};

module.exports = resolvers;