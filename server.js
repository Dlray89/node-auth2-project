const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const sessions = require("express-session")


// const userRouter = require("./routers/userRouter")
// const authRouter = require("./auth/auth.router")

const server = express()

const sessionConfig = {
    name: "userCookie",
    secret: "These cookies are safe",
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOonly: true,
    }

}


server.use(helmet())
server.use(morgan("dev"))
server.use(cors())
server.use(sessions(sessionConfig))
// server.use("/api/auth", authRouter)
// server.use("/api/users", userRouter)

server.use(express.json())

server.get("/", (req,res) => {
    res.status(200).json({message: `looking good! Now work on routers and models`})
})


module.exports = server