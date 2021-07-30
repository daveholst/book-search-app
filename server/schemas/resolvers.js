// bring in models --  not sure if I need book. Seems like a funny structure.
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models')
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    // ! do I need this in here????
    me: async (parent, _args, context) => {
      console.log('my user context :( ',context.user);

      if (context.user) {
        const result = await User.findOne({ _id: context.user._id }).populate('thoughts');
        // console.log(result);
        return result;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // get a single user by either their id or their username
    getSingleUser: async (parent, {_id, username}) => {
      const foundUser = await User.findOne({
        $or: [{ _id: _id }, { username: username }],
      });
    if (!foundUser) {
      throw new AuthenticationError('Cannot find a user with this id!')
      }
      return foundUser
    },


  },
  Mutation: {

      // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
    createUser: async (parent, args) => {
      console.log('CREATE USER FIRED');
      const user = await User.create(args);

      if (!user) {
        throw new AuthenticationError('Could not create user')
      }
      const token = signToken(user);
      return({ token, user });
    },
    // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
    login: async (parent, args) => {
      const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });
      if (!user) {
        throw new AuthenticationError('Could not Find user')
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect Password')
      }
      const token = signToken(user);
      return({ token, user });
    },
  }
};

module.exports = resolvers;