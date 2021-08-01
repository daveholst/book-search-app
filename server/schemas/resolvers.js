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
        const result = await User.findOne({ _id: context.user._id });
        console.log('me resolover result: ', result);
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
    addUser: async (parent, args) => {
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
      console.log('token', token)
      console.log('user', user);
      return({ token, user });
    },
    // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
    saveBook: async (parent, args, context) => {
      console.log('saveBook Fired')
      console.log('args ', args)

      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          // ! what to put here???
          { $addToSet: { savedBooks: args } },
          { new: true, runValidators: true }
        );
        console.log(updatedUser);
        if (!updatedUser) {
          throw new AuthenticationError('Could not add book to user')
        }
        const token = signToken(updatedUser);
        return(updatedUser.savedBooks[(updatedUser.savedBooks.length -1 )]);

      } catch (error) {
        console.error(error)
      }


    }
  }
};

module.exports = resolvers;