import { createRequestBuilder, features } from "@commercetools/api-request-builder";
import dotenv from "dotenv";

dotenv.config();

const { DEV_PROJECT_KEY } = process.env;
import { client } from "../../client/client.js";
import { TestData } from "../../data.js";

const projectKey = DEV_PROJECT_KEY;

export const resolvers = {
    Query: {
        getAllData() {
            return TestData;
        },

        async queryCustomers() {
            try {
                const customerService = createRequestBuilder({ projectKey }).customers;

                const createGetProjectRequest = {
                    uri: customerService.build(),
                    method: "GET",
                };

                const data = await client.execute(createGetProjectRequest);
                return data.body;
            } catch (error) {
                console.log(error);
            }
        }
    },

    Mutation: {
        createData(parent, args) {
            const newData = args;
            TestData.push(newData);
            return newData;
        },
    },
};
