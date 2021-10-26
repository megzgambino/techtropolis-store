const router = require('express').Router()
const multer = require('multer')
const upload = multer()
const { authentication, authorization } = require('../middlewares/auth')

const UserController = require('../controllers/UserController')
const ProductController = require('../controllers/ProductController')
const { uploadImage } = require('../middlewares/imageKit')


//User's endpoint
router.post('/register', UserController.register)
router.post('/login', UserController.login)

//Product's endpoint
router.use(authentication)
router.get('/products', ProductController.getAllProducts)
router.post(
    '/products', 
    upload.single('image_url'),
    uploadImage, ProductController.createProduct)
router.get('/products/:id', ProductController.getOneProduct)
router.put('/products/:id', authorization, ProductController.editProduct)
router.delete('/products/:id', authorization, ProductController.deleteProduct)


module.exports = router