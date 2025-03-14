require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { createConnection, getRepository} = require("typeorm");
const cors = require("cors");

const authSchema = require("./schema/auth/authSchema");
const musicSchema = require("./schema/music/musicSchema");
const resolvers = require("./resolvers");
const authMiddleware = require("./middlewares/authMiddleware");
const dbConfig = require("./config/db");
const cookieParser =  require("cookie-parser")

const uploadAudioFile  = require('./middlewares/upload/uploadFiles');
const uploadAudio = require('./resolvers/upload/uploadAudio');
const path = require('path');
const {GraphQLSchema} = require("graphql/type");

const {User} = require("./entities/User");

const {Music} = require("./entities/Music");

const corsOptions = {
    origin: ['http://localhost:5173',' http://172.18.0.1:5173','http://192.168.0.183:5173', 'https://studio.apollographql.com'],
    credentials: true
};

(async () => {
    const app = express();
    app.use(express.json());
    app.use(cookieParser());

    app.use(cors(corsOptions));

    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    app.post('/upload', uploadAudioFile, uploadAudio)

    await createConnection(dbConfig);

    const server = new ApolloServer({
        typeDefs:  [authSchema,musicSchema],
        resolvers,
        context: ({ req, res }) => ({
            db: {
                User: getRepository(User),
                Music: getRepository(Music)
            },
            user: { id: 1} || authMiddleware(req),
            req,
            res
        }),
    });

    app.get('/api/auth/check', (req, res) => {
        if (req.cookies.token) {
            console.log('user check',req.cookies.token);
            res.sendStatus(200);
        } else {
            console.log('user check',req.cookies.token);
            res.sendStatus(200);
        }
    });

    await server.start();
    server.applyMiddleware({ app, cors: corsOptions });

    const PORT = process.env.PORT || 4000;
    const HOST = '192.168.0.183';
    app.listen(PORT,HOST ,() => {
        console.log(`Сервер запущен на  http://${HOST}:${PORT}/graphql`);
    });
})();