// dependency imports
import express from "express";// used to initialize a backend server using express framework
import bodyParser from "body-parser";// used to parse incoming request bodies in a middleware before your handlers, available under the req.body property.
import cors from "cors";// used to enable CORS (Cross-Origin Resource Sharing) in your Express application, allowing your server to handle requests from different origins.
import { ApolloServer } from "@apollo/server";
// import { expressMiddleware } from '@apollo/server/express4';// This package has been depreciated since the launch of apollo v5
import { expressMiddleware } from '@as-integrations/express5';// we installed the express5 version since our expressJS backend is using express version 5

// file imports

const startServer = async() => {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    const server = new ApolloServer({
        // we need to specify the data type of our keys in out schema, it is compulsory, typeDef is simply a string
        /*
        ID data type refers to anything
        exclamation mark (!) means that this field is non-nullable, meaning it must always have a value and cannot be null.

        After defining the ToDo type, we define a Query type. In GraphQL, the Query type is used to specify the read operations that clients can perform on the data.

        Whenever we want to read something from a GraphQL server we Query, and whenever we want to create, update or delete something from a GraphQL server we use Mutation

        In the below query, we are specifying graphQL that there can be a query called readTodos, and in that we need to return an array of ToDo items, and each ToDo item should follow the structure defined in the ToDo type above

        Now if we open localhost:8000/graphql, we will see a webpage open where we can pass GraphQLK queries and mutations
        when we pass readTodos query, it will return an empty array as we have not defined any resolvers yet, we write the logic to fetch Todos in resolvers 


        ***
        Now as we also want users to be aggregated with each Todo, for that we will
        Create another Type called User

        Now instead of userId: ID!, we will write user: User
        And now in the resolvers outside the Query key we will create another key called ToDo, because the type name in typeDefs is ToDo
        ***
        */ 
        typeDefs: `
        type User {
        id: ID!
        name: String!
        email: String!
        
        }

        type ToDo {
            id: ID!
            title: String!
            completed: Boolean!
            user: User
            }

        type Query {
            readTodos: [ToDo!]!
            readUsers: [User!]!
            readUserById(id: ID!): User
        }
        `,
        resolvers: {
            /*
            In this we specify functions with the same name as the queries and mutations we define in typeDefs
            */
           ToDo: {
            // by creating a ket with the same name and also specifying the user key, we are basically, saying execute this callback function if someone tries to get users of a todo
            user: (todo) => users.find(user => user.id === todo.userId)// now if we run the query: query GetAllTodos{ readTodos { title user { name email}}}, we will get the user details along with each todo
           },
           Query: {
            readTodos: () => [{id: 1, title: "First Todo", completed: false}, {id: 2, title: "Second Todo", completed: true}],// for now we are returning a hardcoded array with a single object
            // Now in our http://locahost:8000/graphql if we run the readTodos query, by writing: query GetAllTodos{ readTodos { title}}, we will get the above hardcoded array as response, and in that we will only get the title of each todo as we specified in the query
            readUsers: () => [{id: 1, name: "John Doe", email: "john@doe.com"}],//query GetAllTodos{ readTodos { title completed} readUsers { name email}}
            readUserById: (parent, {id}, context, info) => {// the parameters are as follows (parent, args, context, info)
                return [{id: 1, name: "John Doe", email: "john@doe.com"}].filter((item, index) => item.id === parseInt(id))[0];
                },//query GetAllTodos($getUserId: ID!){ readUser(id: $getUserId) { name email}}, now in variables we need to pass the ID, lets say 1 and we will get the filtered User
           }
        }
    });// It accepts Object as a Parameter, in this object we will pass typeDefs and resolvers
    // Basically here now what we are doing is using GraphQL, and to use GraphQL, the server should already know the operations you want it to perform
    // Just like in  REST API, we define endpoints, here in GraphQL we define Schemas, typeDefs and resolvers

    await server.start();// Starts the GraphQL server

    app.use("/graphql", expressMiddleware(server));// Any request to /graphql will be handled by expressMiddleware(server)

    app.listen(4000, () => {
        console.log("Server is running on http://localhost:4000/graphql");
    });

}

startServer();