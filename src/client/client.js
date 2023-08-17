import { createClient } from "@commercetools/sdk-client";

import { createAuthMiddlewareForClientCredentialsFlow } from "@commercetools/sdk-middleware-auth";
import { createHttpMiddleware } from "@commercetools/sdk-middleware-http";
// import { SdkAuth } from "@commercetools/sdk-auth"
import fetch from "node-fetch";

import dotenv from "dotenv";

dotenv.config();

console.log("Getting started with commercetools Nodejs SDK");

const { DEV_CLIENT_ID, DEV_CLIENT_SECRET, DEV_PROJECT_KEY, DEV_API_URL, DEV_AUTH_URL, DEV_SCOPES } = process.env;

const projectKey = DEV_PROJECT_KEY

// Create a httpMiddleware for the your project AUTH URL
const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: DEV_AUTH_URL,
    projectKey,
    credentials: {
        clientId: DEV_CLIENT_ID,
        clientSecret: DEV_CLIENT_SECRET,
    },
    scopes: [DEV_SCOPES],
    fetch,
});

// Create a httpMiddleware for the your project API URL
const httpMiddleware = createHttpMiddleware({
    host: DEV_API_URL,
    fetch,
});

// Create a client using authMiddleware and httpMiddleware
export const client = createClient({
    middlewares: [authMiddleware, httpMiddleware],
});