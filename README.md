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
