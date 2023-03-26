import User from "../models/User";
import JwtService from "../services/jwt.service";
import * as Yup from "yup";
import { Errors } from "../utils/errors";
import bcrypt from "bcryptjs";

let loginController = {
    login: async (req, res) => {
        try {
            const schema = Yup.object().shape({
                username: Yup.string().required(),
                password: Yup.string().required()
            });

            if (!(await schema.isValid(req.body)))
                return res.status(400).json({ error: Errors.VALIDATION_FAILS });

            let { username, password } = req.body;

            const user = await User.findOne({ where: { username } });

            // console.log(user.password);
            // const checkPw = await bcrypt(password, user.password);
            // console.log(checkPw);

            if (!user) return res.status(400).send({ error: Errors.NONEXISTENT_USER });

            if (!(await user.checkPassword(password)))
                return res.status(401).send({ error: Errors.WRONG_PASSWORD });

            const token = JwtService.jwtSign(user.id);

            return res.status(200).json({
                status: 200,
                data: {
                    name: user.name,
                    username: user.username,
                    token: token,
                    expired: parseInt(process.env.SERVER_JWT_TIMEOUT)
                },
                message: "Login Successful"
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: Errors.SERVER_ERROR });
        }
    },

    logout: async (req, res) => {
        try {
            console.log(res);
            JwtService.jwtBlacklistToken(JwtService.jwtGetToken(req));

            res.status(200).json({ message: "Logout Success" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: Errors.SERVER_ERROR });
        }
    }
};

export default loginController;
