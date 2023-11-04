import gql from "graphql-tag";
const typeDefs = gql`
  type Post {
    userId: Int
    id: Int
    title: String 
    body: String
  }

  type Query {
    getPosts: Post
  }
`;

export { typeDefs };
