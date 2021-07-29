// bring in models --  not sure if I need book. Seems like a funny structure.
const { User } = require ('../models')

const resolvers = {
  Query: {
    getUser: async (parent, params) => {
      console.log(params);
      return User.findOne({ _id: params.id });
    },
    test: () => 'TEST MESSAGE'
  },
}

module.exports = resolvers;