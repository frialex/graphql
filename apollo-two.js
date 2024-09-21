const { gql, ApolloServer } = require('apollo-server');

const posts = [
  {
    id: 1,
    title: 'first post',
    authorId: 1,
  },
  {
    id: 2,
    title: 'second post',
    authorId: 1,
  },
  {
    id: 3,
    title: 'third post',
    authorId: 2,
  },
];

const comments = [
    { id: 1,
      postId: 1,
      text: ' first comment',
      authorId: 1
    },
    { id: 2,
      postId: 1,
      text: ' second comment',
      authorId: 1
    },
    { id: 3,
      postId: 2,
      text: ' third comment',
      authorId: 1
    }
   ];

const authors = [{ id: 1, name: 'Frison Alexander' }];

const typeDefs = gql`
  type Comments{
   id: ID!
   postId: ID!
   authorId: ID!
   text: String!
  }

  type Post {
    id: ID!
    title: String!
    authorId: ID!
    comments: [Comments]
  }

  type Author {
    id: ID!
    name: String!
    posts: [Post]
  }

  type Query {
    authors: [Author]
    posts(id: ID!): [Post]
    author(id: ID!): Author
  }

`;

const resolvers = {
  Query: {
    author: (obj, args, context, info) => {
      return authors.find((author) => author.id == args.id);
    },
    authors: () => {
      return authors;
    },
    posts: (obj, args, context, info) => {
      return posts.filter((post) => post.id == args.id)
    }
  },
  Author: {
    posts: (author) => {
      return posts.filter((post) => post.authorId === author.id);
    },
  },
  Post: {
    comments: (post) => {
      return comments.filter((comment) => comment.postId === post.id);
    },
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(4000).then(({ url }) => {
  console.log(`Server started at ${url}`);
});