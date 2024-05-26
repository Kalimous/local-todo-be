const User = require('../model/User')
const bcrypt = require('bcrypt')
const saltRounds = 10

const userController = {};

userController.createUser = async (req, res) => {
    try {
        const {email, name, password} = req.body;
        const user = await User.findOne({email})
        if (user) {
            throw new Error('이미 가입이 된 유저입니다.')
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User({name, email, password:hash})
        await newUser.save()
        res.status(200).json({status: 'success'})
    } catch(err){
        res.status(400).json({message: 'fail', error: err.message})
    }
}

userController.loginWithEmail = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email}, "-createdAt -updatedAt -__v");

        if(user){
            const isEqual = bcrypt.compareSync(password, user.password)
            if(isEqual) {
                const token = user.generateToken();
                res.status(200).json({message: 'success', user, token})
            } else {
                throw new Error('incorrect password')
            }
        } else {
            res.status(400).json({message: 'user not found'})
        }
    } catch (err) {
        res.status(400).json({message: 'fail', error: err.message})
    }
}

module.exports = userController;