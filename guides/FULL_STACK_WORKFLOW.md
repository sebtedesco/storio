# Full Stack Development Workflow

So-called "full stack" web development is also known as N-Tier, multilayered, or [Mutlitier](https://en.wikipedia.org/wiki/Multitier_architecture) Architecture. The most common form of this style of development is the classic 3-tier architecture, involving a [client](https://en.wikipedia.org/wiki/Client_(computing)) application, a [web server](https://en.wikipedia.org/wiki/Web_server), and a [database management system (DBMS)](https://en.wikipedia.org/wiki/Database#Database_management_system).

Your LAMP & React Project is a classic 3-tier system where your **code in the browser is the client**, **Apache and PHP make up the web server**, and **MySQL is the DBMS**.

## Data Flow

Many features of your project will follow a common flow.

```
       [1]           [2]                [3]           [4]
Client -> Web Server -> Database Server -> Web Server -> Client
```

1. Your client code will **issue an HTTP request** to your web server, be it Apache or PHP's built in development server.
1. Your web server code will make some decisions based on different aspects of the request it received, _e.g._ the request method, target, or body. It then may **send a SQL query** to your database server. While this is happening, your client code is still waiting for a response from the web server...
1. The database server executes the query and then **responds to the web server with a result set** that matches the query it received. Now the web server has its answer, but the client is still waiting for a response from the web server...
1. Lastly, the web server can now **respond to the original HTTP request** it received from the client.

Once you wrap your head around this little game of telephone, the next step is to adopt a development strategy that doesn't fight it!

## Development Strategies

There are two common scenarios in which you will be working on functionality that spans the entire stack (client / server / database). When you read these two approaches, you might notice some overlap. This is because the main differences is how developers collaborate on a feature.

### Warning!

As a general rule, **Never, ever use your own client application to test your own server code.** A major aspect of debugging is narrowing down problems to a specific part of the codebase. If something is broken, you should immediately determine if it's a back end problem, or if the back end is not behaving as the front end is assuming it will.

### Solo Build (Must Read!)

When you are building (or debugging) a full stack feature by yourself, development is fairly straightforward. The approach is to work your way forward from the data layer, to the server, to the client.

This approach lets you build on layers that you have confirmed are working. When debugging, **you should also check for problems in this order**.

1. Modify your database _just enough_ to satisfy the functionality you are trying to add.
1. Write a test query directly against your database to ensure that you can get the data you need to satisfy the functionality that you are trying to add.
1. Write an endpoint that handles an HTTP request and sends the same query to the database, returning the expected data in the response. Test your endpoint as you build it bit-by-bit **using a proven client application YOU DID NOT WRITE**, like HTTPie or Postman.
1. Write the client code that interacts with the endpoint you just added, like a React component making a request with `fetch()`.

### Team Build

It is common for full stack features to be built by two or more team members. Often this means splitting responsibility by application layer (client / server / database). **Clear, decisive communication** is paramount when dividing labor along these lines. Each layer of the system is making assumptions about its adjacent layer(s).

This means that team members must closely coordinate on their expectations of one another.

For example, if you are building the client portion of the functionality, then you and the server developer must agree on things like:

1. What data does the **client** need for this feature?
1. What **`/api/resource`** should the client send its request to?
1. What **request method** should the client use?
1. Should the **client include anything** in the request **body** or **`?query=string`**?
1. What types of **responses** will the server return?
1. Is it possible that the server will respond with `404 Not Found` or `400 Bad Request`?
1. What **`Content-Type`** will the response be in?
1. What will the structure of the data be in? (Hint: the structure that is most convenient for the client)

#### Front End Developer

The client developer can simply hard-code the data until the required data is known. For example, instead of using `fetch()` to get data for a React component's state, just call `setState()` immediately in `componentDidMount()` with some dummy data until the back end is ready. Then go back and modify the component.

#### Back End Developer

The server developer should basically work on steps 1-3 of the **Solo Build** steps, keeping the client developer up-to-date on their progress. When they believe that the endpoint is ready, the server developer should show the client developer their test results (with HTTPie or Postman) so that both devs understand how the front end and back end should communicate.
