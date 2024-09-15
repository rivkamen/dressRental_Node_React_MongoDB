const Admin = require("../models/Admin")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password)
        return res.status(400).json({ message: 'required field is missing' })
    const user = await Admin.findOne({ username }).lean()
    if (user) {
        const match = await bcrypt.compare(password, user.password)
        if (match) {
            const userInfo = { _id: user._id, username: user.username }
            const token = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
            return res.json({ token: token })
        }
        else
            return res.status(401).json({ message: "unauthorized" })
    }
    else
        res.status(401).json({ message: "unauthorized" })
}
const register = async (req, res) => {


    const { password, username, email } = req.body
    if (!username || !password) {
        return res.status(400).json({ message: 'required field is missing' })
    }

    const duplicate = await Admin.findOne({ username: username }).lean()
    if (duplicate)
        return res.status(409).json({ message: "duplicate username" })

    if (password == process.env.ADMIN) {
        const hashedPwd = await bcrypt.hash(password, 10)
        const userObject = { password: hashedPwd, username, email }
        const user = await Admin.create(userObject)
        if (user) {
            return res.status(201).json({
                success: true,
                message: `user ${user.username} created successfuly`,
            })
        }
        else
            return res.status(400).json({ message: "failed" })
    }
    return res.status(401).json({ message: "unauthorized" })
}

module.exports = { login, register }