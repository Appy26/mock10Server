const express = require('express');
const userRoute = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {userModel}=require('../models/user.model');

userRoute.get('/', async(req, res) => {
   try {
       let user = await userModel.find()
       res.send({"msg":user})
   } catch (error) {
       res.send({ "msg": error.message })
   }
})

userRoute.post('/register', async (req, res) => {
    try {
        let { username, email, password } = req.body
        bcrypt.hash(password, 8, async function (err, hash) {
            if (err) {
      res.send({ "msg": "enter correct credentials" })
            } else {
                const user = await userModel({ username, email, password:hash })
                user.save()
                res.send({ "msg": "successfully registered" }) 
  }
        });
        
    } catch (error) {
        res.send({ "msg": error.message})
    }
})

userRoute.post('/login', async (req, res) => { 
    try {

        let {email, password } = req.body
        let user = await userModel.find({ email })
        console.log(user)
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password,function (err, result) {
                if (err) {
                    res.send({ "msg": "enter correct credentials" })
                } else {
                    let token = jwt.sign({ user: 'user[0]._id' }, 'mock10');
                    res.send({ "msg": "Successfully login", token })
                }
            })
        }
        } catch (error) {
        res.send({ "msg": error.message })
    }
})

module.exports = userRoute