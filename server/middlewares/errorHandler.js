const errorHandler = (err, req, res, next) => {
    let status
    let errors = []

    switch(err.error) {
        case 'Invalid Token' :
            status = 401
            errors.push(err.error)
            break
        case 'No Access Token' :
            status = 401
            errors.push(err.error)
            break
        case 'Authorization Error' :
            status = 401
            errors.push(err.error)
            break
        case 'data not found' :
            status = 404
            errors.push(err.error)
        case 'SequelizeValidationError' :
            status = 400
            errors.push('Validation Error')
        case 'Login Failed' :
            status = 400
            errors.push('Wrong Email or Password')
        default :
            status = 500
            errors.push('Internal Server Error')
    }
    res.status(status).json({errors})
}

module.exports = errorHandler