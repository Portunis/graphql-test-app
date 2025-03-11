const bcrypt = require("bcryptjs");
const { getRepository } = require("typeorm");
const { generateToken } = require("../../utils/tokenUtils");
const User = require("../../entities/User");

const authResolver = {
    Query: {
        user: async (_, __, { user }) => {
            if (!user) throw new Error("Неавторизован");

            const foundUser = await getRepository(User).findOne({ where: { id: user.id } });

            if (!foundUser) throw new Error("Пользователь не найден");

            return foundUser;
        }
    },

    Mutation: {
        register: async (_, { email, password}, {res}) => {
            const userRepository = getRepository(User);
            const existingUser = await userRepository.findOne({ where: { email } });

            if (existingUser) throw new Error("Пользователь уже существует");

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = userRepository.create({ email, password: hashedPassword });

            await userRepository.save(newUser);

            const token = generateToken(newUser);

            console.log('token', token);

            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
                maxAge: 7 * 24 * 60 * 60 * 365,
            });
            return { id: newUser.id, email: newUser.email };
        },

        login: async (_,{ email, password }, { res }) => {
            const userRepository = getRepository(User);
            const user = await userRepository.findOne({ where: { email } });

            if (!user) throw new Error("Пользователь не найден");

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) throw new Error("Неверный пароль");

            const token = generateToken(user);

            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
            });

            return { id: user.id, email: user.email };
        },
    },
};

module.exports = authResolver;
