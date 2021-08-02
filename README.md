# Book Search App

This is a Book Collection Tracking app. It leverages the google books search API so users can login, search for books and then add them to their personal collection. The collection is store in a noSQL database that is persistent and available anywhere in the world.
## Table of Contents:

- [Live Deploy](#Live-Deploy)
- [Screenshots](#Screenshots)
- [Technology Stack](#Technology-Stack)
- [Usage](#Usage)
- [Tests](#Tests)
- [Questions](#Questions)

## Live Deploy

A live deploy of this app can be found on Heroku at: https://holst-book-search.herokuapp.com/

## Screenshots

#### Animated Gif Screenshot:

![gif of book search app](./assets/book-search.gif)

## Technology Stack

- heroku: https://www.heroku.com/
- mongo atlas: https://www.mongodb.com/cloud/atlas
- mongoose: https://www.npmjs.com/package/mongoose
- create-react-app: https://reactjs.org/docs/create-a-new-react-app.html
- express: https://www.npmjs.com/package/express
- apollo-server-express: https://www.npmjs.com/package/apollo-server-express
- apollo: https://www.apollographql.com/docs/
- graphQl: https://graphql.org/

## Usage

This software needs access to a mongoDB database for storage of persistent information. For local deployment/testing all database credentials should be stored in `.env`. An example has been provided.

To use the program locally in development mode, simply run the program from your preferred terminal and follow the prompts.

```bash
npm run develop
```
## Tests

No tests have been written for this software.

## Questions

If you have any further questions you can get in contact with the creator through the following methods:

- https://github.com/daveholst/
- contact@daveholst.dev
