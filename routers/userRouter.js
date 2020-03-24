const express = require("express")

const router = express.Router()

const userDB = require("../models/user.model")

router.get("/", (req,res) => {
    userDB
    .find()
    .then(user => {
        res.json(user)
    })
    .catch(error => res.send(error))
})

module.exports = router