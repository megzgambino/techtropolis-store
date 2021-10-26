const request = require('supertest')
const app = require('../app')
const { passwordHasher } = require('../helpers/index')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

beforeAll((done) => {
   queryInterface
      .bulkInsert('Users', [
         {
            full_name: 'Mark Zuckerberg',
            email: 'user1@mail.com',
            password: passwordHasher('12345678'),
            createdAt: new Date(),
            updatedAt: new Date()
         }
      ])
      .then(() => done())
      .catch((err) => done(err))
})

afterAll((done) => {
   queryInterface
      .bulkDelete('Users')
      .then((response) => done())
      .catch((err) => done(err))
})

describe('Login User POST /login', () => {
   describe('Success Login', () => {
      test('Response when login is successful and sends access_token', (done) => {
         request(app)
            .post('/login')
            .send({
               email: 'user1@mail.com',
               password: '12345678',
            })
            .end((err, res) => {
               const { body, status } = res
               if (err) {
                  return done(err)
               }
               expect(status).toBe(200)
               expect(body).toHaveProperty('email', 'user1@mail.com')
               expect(body).toHaveProperty('access_token')
               expect(body.access_token).toEqual(expect.any(String))
               done()
            })
      })
   })
   describe('Failed Login', () => {
      test('Response when email is correct, password is wrong', (done) => {
         request(app)
            .post('/login')
            .send({
               email: 'user1@mail.com',
               password: '12345670',
            })
            .end((err, res) => {
               const { body, status } = res
               if (err) {
                  return done(err)
               }
               expect(body).toHaveProperty('errors', [
                "Wrong Email or Password",
                "Internal Server Error"
               ])
               done()
            })
      })
      test('Response when the email is not in the database', (done) => {
         request(app)
            .post('/login')
            .send({
               email: 'user99@mail.com',
               password: '12345678',
            })
            .end((err, res) => {
               const { body, status } = res
               if (err) {
                  return done(err)
               }
               expect(body).toHaveProperty('errors', ["Internal Server Error"])
               done()
            })
      })
      test('Response when email and password are not entered', (done) => {
         request(app)
            .post('/login')
            .send({
               email: '',
               password: '',
            })
            .end((err, res) => {
               const { body, status } = res
               if (err) {
                  return done(err)
               }
               expect(body).toHaveProperty('errors', ["Internal Server Error"])
               done()
            })
      })
   })
})

describe('Register User POST /register', () => {
    describe('Success Register', () => {
       test('Response when register is successful', (done) => {
          request(app)
             .post('/register')
             .send({
                full_name: 'Tom Brady',
                email: 'user1@mail.com',
                password: '12345678',
             })
             .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                expect(status).toBe(201)
                expect(body).toHaveProperty('email', 'user1@mail.com')
                expect(body.id).toEqual(expect.any(Number))
                done()
             })
       })
    })
    describe('Failed Register', () => {
       test('Response when email validation on Sequelize does not meet', (done) => {
          request(app)
             .post('/register')
             .send({
                full_name: 'Tom Brady',
                email: 'user1@mail.com',
                password: '123',
             })
             .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                expect(body).toHaveProperty('errors', [
                 "Internal Server Error"
                ])
                done()
             })
       })
       test('Response when full_name, email and password are not entered', (done) => {
          request(app)
             .post('/register')
             .send({
                full_name: '',
                email: '',
                password: '',
             })
             .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                expect(body).toHaveProperty('errors', ["Internal Server Error"])
                done()
             })
       })
    })
 })