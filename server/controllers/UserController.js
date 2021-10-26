const { User } = require('../models')
const { passwordDecoder, tokenGenerator } = require('../helpers/index')

class UserController {
    static async register (req, res, next) {
        const { full_name, email, password } = req.body
        try {
            const user = await User.create({
                full_name,
                email,
                password
            })
            res.status(201).json({
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                password: user.password
            })
            
        } catch (error) {
            next(error)
        }
    }

    static async login (req, res, next) {
        const { email, password } = req.body
        try {
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) throw {error: 'No User Exist!'}
            const isTrue = passwordDecoder(password, user.password)
            if (!isTrue) throw {error: 'Login Failed'}
            const access_token = tokenGenerator({
                id: user.id
            })
            res.status(200).json({
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                access_token: access_token
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController