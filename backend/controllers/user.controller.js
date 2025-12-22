import jwt from "jsonwebtoken";
import user from "../modules/user.module.js";
import bcrypt from "bcrypt"

export async function createUser(req, res) {

    try {

        const body = req.body;

        const hashedPass = await bcrypt.hash(body.password, 10);
        body.password = hashedPass;


        const addedUser = await user.create(body);

        const data = {
            id: addedUser._id
        }
        const token = jwt.sign(data, process.env.jwt_secret)

        res.json({
            success: true,
            data: addedUser,
            token: token
        })
    }
    catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
}

export const login = async (req, res) => {

    const body = req.body
    console.log(body);
    const username = body.username;


    try {


        const logUser = await user.findOne({
            username: username,
        })

        if (!logUser) {
            res.json({
                success: false,
                message: "User doesn't exist"
            })
            return;
        }
        console.log(body.password)
        console.log(logUser)

        const result = await bcrypt.compare(body.password, logUser.password)
        console.log(result)
        if (!result) {
            return res.json({
                success: false,
                message: "Incorrect password"
            })

        }


        const data = {
            id: logUser._id
        }
        const token = jwt.sign(data, process.env.jwt_secret)

        res.json({
            success: true,
            token: token
        })
    }
    catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
}

export const getLoggedAuthor = async (req, res) => {
    try {
        const loggedUser = req.user

        if (!loggedUser) {
            return res.json({
                success: false,
                message: "User not Logged in"
            })
        }

        const id = loggedUser._id;

        const userData = await user.findById(id)
        if (!userData) {
            return res.json({
                success: false,
                message: "User not Exist"
            })
        }

        res.json({
            success: true,
            data: userData
        })
    }
    catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
}

