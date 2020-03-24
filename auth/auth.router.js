const bcrypt = require("bcryptjs");

const router = require("express").Router();
const authDB = require("../models/user.model");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
  const userinfo = req.body;

  //hashpassword
  const ROUNDS = process.env.HASHING_ROUNDS || 8;
  const hash = bcrypt.hashSync(userInfo.password, ROUNDS);

  unserInfo.password = hash;

  authDB
    .add(userInfo)
    .then(users => {
      res.status(201).json(users);
    })
    .catch(error => {
      res
        .status(401)
        .json({
          errorMessage: `${error} your registeration failed! Something went wrong with your registration`
        });
    });
});

router.post("/login", (req,res) => {
    const { username, password } = req.body

    authDB.findBy({ username })
    .first()
    .then(user => {
        if (user && bcrypt.hashSync(password, user.password)) {
            const token = generateToken(user)

            res.status(200).json({
                message: `welcome ${user.username}`,
                token,
            });
        } else {
            res.status(401).json({message: "invaild credentials" })
        }
    })
    .catch(error => {
        res.status(500).json({errorMessage: `${error}` })
    })
})

function generateToken(user) {
    const payload = {
        username: user.username
    }

    const secret = process.env.JWT_SECRET || "is it safe"
    const options = {
        expiresIn: "1h"
    }

    return jwt.sign(paylod, secret, options)
}

module.exports = router;
