const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User')

const createToken = (doc) => {
  const token = jwt.sign(
    {email: doc.email},
    'Fp21nsEbDT',
    {expiresIn: '14d'}
  );
  return token;
}

router.post('/register', (req,res) => {
  const { email, password } = req.body;
  User.findOne({email})
    .then(doc => {
      if(!doc) {
        const email_verification = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
        if(email_verification.test(email)) {
          if(password.length >= 6) {
            bcrypt.hash(password, 10, function(err, hash) {
              User.create({email, password:hash})
                .then(newUser => {
                  const token = createToken(newUser);
                  return res.status(200).send({
                    success: true,
                    timestamp: Date.now(),
                    message: "Successful registration",
                    jwt: token
                  })
                })
            })
          } else {
            return res.status(200).send({
              success: false,
              timestamp: Date.now(),
              message: "Invalid password"
            })
          }
        } else {
          return res.status(200).send({
            success: false,
            timestamp: Date.now(),
            message: "Invalid email"
          })
        }
      } else {
        return res.status(200).send({
          success: false,
          timestamp: Date.now(),
          message: "Email is already registered"
        })
      }
    })
    .catch(err => {
      return res.status(200).send({
        success: false,
        timestamp: Date.now(),
        message: "Unknown error"
      })
    })

})

router.post('/login', (req,res) => {
  const {email, password} = req.body;
  User.findOne({email})
    .then(doc => {
      if(!doc) {
        return res.status(200).send({
          success: false,
          timestamp: Date.now(),
          message: "Email doesn't exist"
        })
      } else {
        //check
        bcrypt.compare(password, doc.password, function(err, match) {
          if(match) {
            const token = createToken(doc);
            return res.status(200).send({
              success: true,
              timestamp: Date.now(),
              message: "Successful login",
              jwt: token
            })
          } else {
            return res.status(200).send({
              success: false,
              timestamp: Date.now(),
              message: "Wrong password"
            })
          }
        })
      }
    })
    .catch(err => {
      return res.status(200).send({
        success: false,
        timestamp: Date.now(),
        message: "Unknown error"
      })
    })
})

router.post('/forgotPassword', (req,res) => {
  const { email } = req.body;
  User.findOne({email})
    .then(doc => {
      if(!doc) {
        return res.status(200).send({
          success: false,
          timestamp: Date.now(),
          message: "Email does not exist"
        })
      } else {
        // send an email link to new password
      }
    })
})


router.post('/changePassword', (req, res) => {

})

router.post('/changeRole', (req,res) => {
  
})


module.exports = router;