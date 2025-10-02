# GraphQL

## The problem that GraphQL solves
```

In case of REST API, we have a client and a nodeJS server which has some API endpoints, 
If the user wants to get some resource, then what the user will do is make API calls to the Server Side Application
Our Server Side Application will respond with returning all the To-Do

In this case we have no control over information and we will end up fetching way more data than we need, which result in wasting of bandwidth
This problem is referred to as Over-fetching
Let's say we have multiple clients,
some clients only want the ID of all the todos
some only want name, some only want when they were created at

Another problem that we encounter in simple Rest API is Under-fetching
Let's say, each Todo entry has a user_id stored referring to the user who created the ToDo
If we want the name of the users, we may need to make a separate API call to the server, and even that user mat have information more than name such as address, phone number, etc...

So for simply showing ToDo's list in our application and showing the name of the users involved in creating of each ToDo item, we need to make 2 API calls, which also resulted in under-fetching and over-fetching
```

```

GraphQL solves this problem
GraphQL is different from Rest API and slower
It begins with client specifying the data it wants
The client specifies the model and the data within it to solve the over-fetching part of REST API
and the client can also create nested queries to work around the under-fetching part of REST AOU 
```

```

To install GraphQL we will use Apollo, Apollo maintains a set for libraries used for making applications around GraphQL
We can implement GraphQL without Apollo, as GraphQL at its core is simply a specification
Refer to this link for initializing GraphQL using Apollo: https://www.apollographql.com/

Go to : https://www.apollographql.com/docs/apollo-server/getting-started, to setup Apollo Server
there we will find command: npm install @apollo/server graphql
executing this command in the terminal will start setup of our GraphQL server
refer to server/server.js for further walkthrough 
```

```
Now we will use the Apollo Client to use GraphQL on React
Initialize a react project using vite

Navigate to URL for React docs: https://www.apollographql.com/docs/react/get-started
there we will find command: npm install @apollo/client graphql rxjs
Now follow the the documentation after that
```



## Threads Clone Backend using GraphQL
```
This is where we will create a Backend which is well structured for GraphQL implementation
We will have the Threads App launched by Meta in 2023 as a Case Study to understand How an Actual GraphQL server looks like
```
```
First a small Recall of GraphQL and planning of upcoming project

In GraphQL we mainly have two things
Queries and Mutations

Queries are used for all the READ operations
Whereas Mutations are used for all the CREATE, UPDATE and DELETE operations

So for a Threads app, if a used wants to READ the threads of other users or of his own, he will call the specific queries defined in the Backend and if the user wants to CREATE, UPDATE or DELETE a thread , they will use Mutations defined in the Server Side Application

In these Queries and Mutation we add our own Schema, we have a Schema layer
A Schema is a layer which stands before the Queries and Mutations 
So an example schema would look like
Thread {
    id
    title
    description
    userId
}

User {
    id
    name
    email
    profileImage
}

So in GraphQL whenever we want to fetch any data, we need to specify what specific data do we need

In Queries and Mutations each have their own, something called as resolvers
Resolvers are the actual code that is executed
When the Frontend passes a Query or a Mutation it calls in the resolver in our Backend using the same name as it is specified, so we can say that resolvers also possess the capability to specify new routes or endpoints

Now no matter how we return data in our controller or function, the Schema layer will simply return the data in which the Client Side Application has requested

Now in the resolver we can simply write the Data Fetching Logic or other operations, but it is not recommended, as this approach results in Tight Coupling of Data

When we may need to break a monolithic application utilizing GraphQL to Microservices Application also utilizing GraphQL, we will have extreme difficulties in reusing the resolvers
So approaching the development and design of resolvers in an over complicated way might be a great idea for a longer run
```

```
Now to solve the Tight Coupling we solved above, we will introduce a Service Layer
Service Layer will be responsible for performing all the CRUD operations
So continuing with the current scenario where we have a Thread entity and a User entity, we can create two services `threadService.js` and `userService.js`
threadService.js will contain all the CRUD operations around thread and userService will contain all the CRUD operations around user

so now in queries instead of passing raw Database queries we can now call, threadService.readAllThreads();
```