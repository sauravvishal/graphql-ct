import express from "express";
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";

import { typeDefs } from "./graphql/schemas/schema.js";
import { resolvers } from "./graphql/resolvers/resolver.js";

dotenv.config();

class App {
    async startServer() {
        try {
            const app = express();
            const server = new ApolloServer({ typeDefs, resolvers });
            await server.start();
            server.applyMiddleware({ app, path: '/graphql' });

            const httpServer = createServer(app);

            httpServer.listen(process.env.PORT, () => {
                console.log(`Server is running on port ${process.env.PORT}`);
            });
        } catch (error) {
            console.log("Internal Server Error", error);
        }
    }
}

export const app = new App();