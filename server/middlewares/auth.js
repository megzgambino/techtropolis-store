const { tokenDecoder } = require('../helpers/index')
const { User, Product } = require('../models')

function authentication (req, res, next) {
    const { access_token } = req.headers

    if (!access_token) return next({error: 'No Access Token'})

    try{
        const decodedToken = tokenDecoder(access_token)

        User.findByPk(decodedToken.id)
            .then((user) => {
                if (!user) {
                    throw {error: 'Invalid Token'}
                } else {
                    req.currentUser = {
                        id: user.id
                    }
                    next()
                }
            })
            .catch(err => next(err))
    } catch(err) {
        next(err)
    }
}

function authorization (req, res, next) {
    const id = +req.params.id

    Product.findByPk(id)
    .then((prod) => {
        if (!prod) {
            throw {error: 'Authorization Error'} 
        } else {
            if (prod.UserId === req.currentUser.id) {
                next()
            } else {
                throw {error: 'Authorization Error'}
            }
        }
    })
    .catch(err => next(err))
}

module.exports = {
    authentication,
    authorization
}