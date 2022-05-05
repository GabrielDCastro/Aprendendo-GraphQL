const { ApolloServer, gql } = require('apollo-server');

//! é para não permitir null, meio que o faz obrigatório

const typeDefs = gql`
    type User{
        _ID: ID! #Poderia ser String, pois é uma hash, string ou number(dependendo da linguagem), mas o graphql já trata o atributo ID independente do tipo
        name: String!
        email: String!
        active: Boolean!
    }

    type Post{
        _id: ID!
        title: String!
        content: String!
        authot: User!
    }

    type Query{
        hello: String
        users: [User!]!
        getUserByEmail(email: String!): User!
    }

    type Mutation{
        createUser(name: String!, email: String!): User!
    }
`;

const users = [
    { _id: String(Math.random()), name: 'Gabriel', email: 'gabriel@email.com', active: true },
];

const resolvers = {
    Query: {
        hello: () =>'hello world',
        users: () => users,
        getUserByEmail: (_, args) => {
            return users.find((user) => user.email == args.email);
        },
    },
    Mutation: {
        createUser: (_, args) =>{
            const newUser = {
                _ID: String(Math.random()),
                name: args.name,
                email: args.email,
                active: true,
            };

            users.push(newUser);
            return newUser;
        }        
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`server startou no ${url}`));