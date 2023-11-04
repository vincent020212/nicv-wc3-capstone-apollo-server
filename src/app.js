import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import typeDefs from "./schemas/index.js";
import { resolvers } from "./resolvers/index.js";
import {
  depthLimitValidator,
  queryComplexityValidator,
} from "./utils/graphql/index.js";
import { PostAPI } from "./datasources/post/post.js";

const app = express();
const httpServer = http.createServer(app);

async function startServer() {
  dotenv.config();

  const port = process.env.NICV_WECAMP_3_APOLLO_SERVER_PORT;
  const graphqlPath =
    process.env.NICV_WECAMP_3_APOLLO_SERVER_GRAPHQL_URI || "/graphql";

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart(requestContext) {
          console.log(
            "Apollo server starting with Config",
            requestContext.apollo
          );
        },
      },
    ],
    // validationRules: [depthLimitValidator(), queryComplexityValidator()],
  });

  await server.start();

  app.use(
    graphqlPath,
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const { headers = {} } = req;
        console.log(headers);
        const contextValue = {
          headers,
        };
        return {
          dataSources: {
            PostAPI: new PostAPI({ contextValue }),
          },
        };
      },
    })
  );

  app.get("/", function (req, res) {
    res.send("Hello World!");
  });

  httpServer.listen(port, function () {
    console.log("Example app listening on port ", port);
  });
}

startServer();
