const { Product } = require('../models')

class ProductController {
    static async getAllProducts (req, res, next) {
        try {
            const product = await Product.findAll()
            res.status(200).json(product)
        } catch (error) {
            next(error)
        }
    }

    static async createProduct (req, res, next) {
        const { name, price, quantity } = req.body

        try {
            const product = await Product.create({
                name,
                image_url: req.image_url || null,
                price,
                quantity,
                UserId: req.currentUser.id
            })
            res.status(201).json(product)

        } catch (error) {
            next(error)
        }
    }

    static async getOneProduct (req, res, next) {
        const { id } = req.params

        try {
            const product = await Product.findByPk(id)
            res.status(200).json(product)

        } catch (error) {
            next(error)
        }
    }

    static async editProduct (req, res, next) {
        const input = req.body
        const { id } = req.params

        try {
            const product = await Product.update(input, {
                where: {
                    id
                },
                returning: true
            })
            res.status(200).json(product[1][0])
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct (req, res, next) {
        const { id } = req.params

        try {
            const product = await Product.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({
                message: 'data has been deleted!'
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = ProductController