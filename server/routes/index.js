const router = require('express').Router()

const { authentication, authorization } = require('../middlewares/auth')

const UserController = require('../controllers/UserController')
const ProductController = require('../controllers/ProductController')

//User's endpoint
router.post('/register', UserController.register)
router.post('/login', UserController.login)

//Product's endpoint
router.use(authentication)
router.get('/products', ProductController.getAllProducts)
router.post('/products', ProductController.createProduct)
router.get('/products/:id', authorization, ProductController.getOneProduct)
router.put('/products/:id', authorization, ProductController.editProduct)
router.put('/products/:id', authorization, ProductController.deleteProduct)