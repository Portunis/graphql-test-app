require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { createConnection } = require("typeorm");
const cors = require("cors");

const typeDefs = require("./schema/authSchema");
const resolvers = require("./resolvers/authResolver");
const authMiddleware = require("./middlewares/authMiddleware");
const dbConfig = require("./config/db");

(async () => {
    const app = express();
    app.use(express.json());


    app.use(authMiddleware);

    await createConnection(dbConfig);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ user: req.user }),
    });

    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Сервер запущен на  http://localhost:${PORT}/graphql`);
    });
})();