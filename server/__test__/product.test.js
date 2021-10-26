const request = require('supertest')
const app = require('../app')
const { passwordHasher, tokenGenerator, passwordDecoder } = require('../helpers/index')
const { sequelize, User } = require('../models')
const { queryInterface } = sequelize


let userToken
let productId
let userEmail


beforeAll((done) => {
   queryInterface
      .bulkInsert(
         'Users',
         [
            {
                full_name: 'Sun Matahari',
                email: 'matahari@mail.com',
                password: passwordHasher('12345678'),
                createdAt: new Date(),
                updatedAt: new Date()
            }
         ],
         { returning: true }
      )
      .then((user) => {
        userEmail = user[0].email
         return User.findOne({
            where: {
               email: userEmail
            }
         })
      })
      .then((user) => {
        userToken = tokenGenerator({
            id: user.id,
         })
         done()
     })
      .catch((err) => done(err))
})


describe('Create Product POST /products', () => {
   describe('Success Create Product', () => {
      test('Response when successfully creating a product with access_token and the required fields are filled in correctly', (done) => {
         request(app)
            .post('/products')
            .set('access_token', userToken)
            .send({
               name: 'Macbook Pro',
               price: 17000000,
               quantity: 30
            })
            .end((err, res) => {
               const { body, status } = res
               if (err) {
                  return done(err)
               }
               expect(body).toHaveProperty('name', 'Macbook Pro')
               expect(body).toHaveProperty('quantity', 30)
               expect(body).toHaveProperty('price', 17000000)
               productId = body.id
               done()
            })
      })
   })
   describe('Success Getting All Product', () => {
    test('Response when successfully getting products with access_token', (done) => {
       request(app)
          .get('/products')
          .set('access_token', userToken)
          .end((err, res) => {
             const { body, status } = res
             if (err) {
                return done(err)
             }
             expect(status).toBe(200)
             done()
          })
    })
 })
 describe('Failed Getting All Product', () => {
    test('Response when failed getting products because there is no access_token', (done) => {
       request(app)
          .get('/products')
          .end((err, res) => {
             const { body, status } = res
             if (err) {
                return done(err)
             }
             expect(status).toBe(401)
             done()
          })
    })
 })
 describe('Success Getting One Product', () => {
    test('Response when successfully getting one product product with access_token', (done) => {
       request(app)
          .get(`/products/${productId}`)
          .set('access_token', userToken)
          .end((err, res) => {
             const { body, status } = res
             if (err) {
                return done(err)
             }
             expect(status).toBe(200)
             done()
          })
    })
 })
 describe('Failed Getting One Product', () => {
    test('Response when failed getting one product product because there is no access_token', (done) => {
       request(app)
          .get(`/products/${productId}`)
          .end((err, res) => {
             const { body, status } = res
             if (err) {
                return done(err)
             }
             expect(status).toBe(401)
             done()
          })
    })
 })
   describe('Failed Create Product', () => {
      test('Response when failed to create a product because there is no access_token', (done) => {
         request(app)
            .post('/products')
            .send({
                name: 'Macbook Pro',
                price: 17000000,
                quantity: 30
            })
            .end((err, res) => {
               const { body, status } = res
               if (err) {
                  return done(err)
               }
               expect(status).toBe(401)
               expect(body).toHaveProperty('errors', [
                  'No Access Token'
               ])
               done()
            })
      })
   })
   test('Response when failed to create a product because the column was not filled in correctly, for example, the name was not filled in, the price was filled with a minus value and the quantity was filled with a string', (done) => {
      request(app)
         .post('/products')
         .set('access_token', userToken)
         .send({
            name: 'Macbook Pro',
            price: 17000000,
            quantity: 'kosong'
         })
         .end((err, res) => {
            const { body, status } = res
            if (err) {
               return done(err)
            }
            expect(body).toHaveProperty('errors', [
                'Internal Server Error'
            ])
            done()
         })
   })
})

describe('Update Product PUT /products/:id', () => {
   describe('Success Update Product', () => {
      test('Response when successfully updating a product with access_token and the required fields are filled in correctly', (done) => {
         request(app)
            .put(`/products/${productId}`)
            .set('access_token', userToken)
            .send({
                name: 'Macbook Air',
                price: 17000000,
                quantity: 30
            })
            .end((err, res) => {
               const { body, status } = res
               if (err) {
                  return done(err)
               }
               expect(body).toHaveProperty('name', 'Macbook Air')
               expect(body).toHaveProperty('price', 17000000)
               expect(body).toHaveProperty('quantity', 30)
               done()
            })
      })
   })
   describe('Failed Update Product', () => {
      test('Response when failed to update a product because there is no access_token', (done) => {
         request(app)
            .put(`/products/${productId}`)
            .send({
                name: 'Macbook Air',
                price: 17000000,
                quantity: 30
            })
            .end((err, res) => {
               const { body, status } = res
               if (err) {
                  return done(err)
               }
               expect(status).toBe(401)
               expect(body).toHaveProperty('errors', [
                  'No Access Token'
               ])
               done()
            })
      })
   })
})

describe('Delete Product DELETE /products/:id', () => {
   describe('Success Delete Product', () => {
      test('Response when successfully deleting a product with access_token', (done) => {
         request(app)
            .delete(`/products/${productId}`)
            .set('access_token', userToken)
            .end((err, res) => {
               const { body, status } = res
               if (err) {
                  return done(err)
               }
               expect(body).toHaveProperty(
                  'message',
                  'data has been deleted!'
               )
               done()
            })
      })
   })
   describe('Failed Delete Product', () => {
    test('Response when failed to delete a product because there is no access_token', (done) => {
       request(app)
          .delete(`/products/${productId}`)
          .end((err, res) => {
             const { body, status } = res
             if (err) {
                return done(err)
             }
             expect(body).toHaveProperty('errors', [
                'No Access Token'
             ])
             done()
          })
    })
 })
   describe('Failed Update Product', () => {
      test('Response when failed to delete a product because there is no access_token', (done) => {
         request(app)
            .put(`/products/${productId}`)
            .end((err, res) => {
               const { body, status } = res
               if (err) {
                  return done(err)
               }
               expect(status).toBe(401)
               expect(body).toHaveProperty('errors', [
                  'No Access Token'
               ])
               done()
            })
      })
   })
})