const bcrypt = require("bcryptjs");
const { getRepository } = require("typeorm");
const { generateToken } = require("../utils/tokenUtils");
const User = require("../entities/User");

const authResolver = {
    Query: {
        me: async (_, __, { user }) => {
            if (!user) throw new Error("Неавторизован");
            return getRepository(User).findOne({ id: user.id });
        },
    },

    Mutation: {
        register: async (_, { email, password }) => {
            const userRepository = getRepository(User);
            const existingUser = await userRepository.findOne({ where: { email } });

            if (existingUser) throw new Error("Пользователь уже существует");

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = userRepository.create({ email, password: hashedPassword });

            await userRepository.save(newUser);
            return { id: newUser.id, email: newUser.email, token: generateToken(newUser) };
        },

        login: async (_, { email, password }) => {
            const userRepository = getRepository(User);
            const user = await userRepository.findOne({ where: { email } });

            if (!user) throw new Error("Пользователь не найден");

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) throw new Error("Неверный пароль");

            return { id: user.id, email: user.email, token: generateToken(user) };
        },
    },
};

module.exports = authResolver;
