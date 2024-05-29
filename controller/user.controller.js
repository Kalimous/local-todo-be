const User = require("../model/User");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw new Error("이미 가입이 된 유저입니다.");
        }
        const salt = bcryptjs.genSaltSync(saltRounds);
        const hash = bcryptjs.hashSync(password, salt);
        const newUser = new User({ name, email, password: hash });
        await newUser.save();
        res.status(200).json({ status: "success" });
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
};

userController.loginWithEmail = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne(
            { email },
            "-createdAt -updatedAt -__v"
        );

        if (user) {
            const isEqual = bcryptjs.compareSync(password, user.password);
            if (isEqual) {
                const token = user.generateToken();
                res.status(200).json({ message: "success", user, token });
            } else {
                throw new Error("패스워드가 일치하지 않습니다.");
            }
        } else {
            throw new Error("계정이 존재하지 않습니다.");
        }
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message }); // 누락된 닫는 중괄호 및 소괄호 추가
    }
};

userController.getUser = async (req, res) => {
    try {
        const { userId } = req;
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("유저를 찾을 수 없습니다.");
        }
        res.status(200).json({ status: "success", user });
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
};

module.exports = userController;
