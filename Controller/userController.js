const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const itemModel = require('../models/itemModel');
const orderModel = require('../models/orderModel');
class userController {
    static home = async (req, res) => {
        try {
            const data = await itemModel.find().limit(8);
            if (req.token) {
                const authData = await jwt.verify(req.token, 'secretKey');
                if (authData) {
                    res.render('home', { isLogin: true, items: data, data: authData.jwtUser });
                }
            } else {
                res.render('home', { isLogin: false, items: data });
            }

        } catch (error) {
            console.log(error);
        }
    }

    // get login form
    static getlogin = (req, res) => {
        res.render('login', { msg: false })
    }

    //login 
    static login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email });
            console.log(password);
            if (password === user.password) {
                // ...create credentials
                const jwtUser = {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
                const token = await jwt.sign({ jwtUser }, 'secretKey', { expiresIn: '10days' });
                if (token) {
                    res.cookie("token", token, { maxAge: 15 * 24 * 60 * 60 * 1000 }, { httpOnly: true });
                    res.redirect('/')
                }

            } else {
                res.render('login', { msg: "emial id or password is not valid" })
            }
        } catch (error) {
            console.log(error);
        }
    }

    // get sign in form
    static getsignIn = (req, res) => {
        res.render('signIn', { msg: false })
    }

    // signin
    static signin = async (req, res) => {
        try {

            const { name, email, password } = req.body;
            // .. check if email is already exists
            const checkUser = await userModel.findOne({ email });
            if (checkUser) {
                res.render("signIn", { msg: "this email id is already register" })
            } else {
                const user = new userModel({
                    name: name,
                    email: email,
                    password: password
                })
                const result = await user.save();
                // ...create credentials
                const jwtUser = {
                    _id: result._id,
                    name: result.name,
                    email: result.email
                }
                if (result) {
                    const token = await jwt.sign({ jwtUser }, 'secretKey', { expiresIn: '10days' });
                    if (token) {
                        res.cookie("token", token, { maxAge: 15 * 24 * 60 * 60 * 1000, path: "/" }, { httpOnly: true });
                        res.redirect('/')
                    }
                }
                else {
                    res.render('signIn', { msg: "Sigin after some time" })
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    //...order now page
    static getOrderNow = async (req, res) => {
        try {

            if (req.token) {
                const authData = await jwt.verify(req.token, 'secretKey');
                if (authData) {
                    res.render('orderNow', { isLogin: true, data: authData.jwtUser });
                }
            } else {
                res.render('orderNow', { isLogin: false, data: authData.jwtUser });
            }
        } catch (error) {
            console.log(error);
        }
    }

    // ...get order details
    static orderNow = async (req, res) => {
        try {
            const item = await itemModel.findById({ _id: req.params.id });
            const { name, cityName, streetAddress, zipCode, qty, phno } = req.body;
            const authData = await jwt.verify(req.token, 'secretKey');

            const order = new orderModel({
                _user: authData.jwtUser._id,
                _item: item._id,
                name: name,
                productName: item.productName,
                productPrice: item.price,
                category: item.category,
                cityName: cityName,
                streetAddress: streetAddress,
                zipCode: zipCode,
                qty: qty,
                phno: phno

            })
            const result = await order.save();
            if (result) {
                res.redirect(`/myOrders/${authData.jwtUser._id}`)
            }

        } catch (error) {
            console.log(error);
        }
    }

    // getMyorders
    static getMyOrders = async (req, res) => {
        try {
            const authData = await jwt.verify(req.token, 'secretKey');
            const order = await orderModel.find({ _user: req.params.id });
            if (order) {
                res.render('ourOrders', { isLogin: true, order: order, data: authData.jwtUser })
            }

        } catch (error) {
            console.log(error);
        }
    }

    // logout
    static logout = (req, res) => {
        try {
            res.clearCookie("token", { path: "/" });
            res.redirect('/')
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = userController