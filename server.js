const express = require('express');
const {graphqlHTTP} = require("express-graphql");
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
} = require('graphql');
const cors = require("cors");
const {Client} = require("pg");

const app = express();

app.use(cors()); // to allow other origins access to server

const client = new Client({ //postgres client
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "md914841",
    database: "postgres"
})
client.connect();


function deleteUser(username){
    const query = `delete from users where username='${username}'`;
    client.query(query);
}

function addUser(username, password) {
    const query = `insert into users (username, password) values ('${username}', '${password}')`;
    client.query(query);
}

function updateUser(oldUser, newVal){
    const query = `update users set ${newVal} where username = '${oldUser}'`;
    client.query(query)
}

function selectUser(username){
    const query = `select * from users where username='${username}'`;
    return new Promise((resolve, reject) => {
        client.query(query, (err, res) => {
            if (!err){
                resolve(res.rows);
            } else {
                reject(err);
            }
        })
    })
    
}

const UserType = new GraphQLObjectType({
    name: "User",
    description: "User info",
    fields: ({
        username: {type: GraphQLString},
        password: {type: GraphQLString},
    })
})

// for get
const rootQuery = new GraphQLObjectType({
    name: "Query",
    description: "Root query",
    fields: () => ({
        user: {
            type: UserType,
            description: "One user",
            args: {
                username: {type: GraphQLString}
            },
            resolve: async (parent, args) => {
                try {
                    const result = await selectUser(args.username);
                    return {username: result[0].username, password: result[0].password};
                } catch (err) {
                    return null;
                }
            }
        }
    })
})

// for delete, update, and add
const rootMutation = new GraphQLObjectType({
    name: "Mutation",
    description: "Root mutation",
    fields: () => ({
        addUser: {
            type: UserType,
            description: "Add a user",
            args:{
                username: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve: async (parent, args) => {
                try {
                    addUser(args.username, args.password);
                } catch (err) {
                    console.log(err);
                }
            }
        },
        deleteUser: {
            type: UserType,
            description: "Remove a user",
            args: {
                username: {type: GraphQLString},
            },
            resolve: async (parent, args) => {
                try{
                    deleteUser(args.username);
                }
                catch(err){
                    console.log(err);
                }
            }
        },
        updateUser: {
            type: UserType,
            description: "Update a user",
            args: {
                oldUser: {type: GraphQLString},
                newUser: {type : GraphQLString},
                newPassword: {type: GraphQLString},
            },
            resolve: async (parent, args) => {
                try{
                    updateUser(args.oldUser, `username = '${args.newUser}', password = '${args.newPassword}'`);
                }
                catch(err){
                    console.log(err);
                }
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(5000., () => console.log("Server running"))