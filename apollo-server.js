const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (object types, enums, input types, etc.)
// that together define the "shape" of your data graph.
const typeDefs = gql`
    type Query {
      quoteOfTheDay: String
      random: Float!
      rollThreeDice: [Int]
    }
`;

// Resolvers define the functions that will be called when a query is executed.
const resolvers = {
  Query: {

    quoteOfTheDay() {
      return Math.random() < 0.5 ? "Take it easy" : "Salvation lies within"
    },
    random() {
      return Math.random()
    },
    rollThreeDice() {
      return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6))
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema definition and your resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});