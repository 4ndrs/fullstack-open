import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { ApolloServer } from "apollo-server-express";
import { useServer } from "graphql-ws/lib/use/ws";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import http from "http";
import jwt from "jsonwebtoken";

import User from "./models/user.js";
import resolvers from "./resolvers.js";
import typeDefs from "./schema.js";

dotenv.config({ path: "./.env.local" });

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.SECRET;

console.log("connecting to ", MONGODB_URI);

try {
  mongoose.set("strictQuery", true);
  await mongoose.connect(MONGODB_URI);
} catch (exception) {
  console.log("error connecting to MongoDB", exception.message);
  process.exit(1);
}

mongoose.set("debug", true);

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id).populate(
          "friends"
        );

        return { currentUser };
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: "/",
  });

  const PORT = 4000;

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  );
};

start();
