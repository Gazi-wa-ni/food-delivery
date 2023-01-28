const itemModel = require('../models/itemModel')
const adminModel = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const orderModel = require('../models/orderModel');
class adminController {

    static getAdminLogin = (req, res) => {

        res.render('adminlogin')
    }

    static adminLogin = async (req, res) => {
        try {

            const { email, password } = req.body;
            const admin = await adminModel.findOne({ email: email });
            if (password === admin.password) {
                // ...create credentials
                const jwtAdmin = {
                    _id: admin._id,
                    name: admin.name,
                    email: admin.email
                }
                const token = await jwt.sign({ jwtAdmin }, 'secretKey', { expiresIn: '10days' });
                if (token) {
                    res.cookie("adminToken", token, { maxAge: 15 * 24 * 60 * 60 * 1000, path: "/admin" }, { httpOnly: true });
                    res.redirect('/admin/profile')
                }

            } else {
                res.render('login', { msg: "emial id or password is not valid" })
            }
        } catch (error) {
            console.log(error);
        }
    }


    static adminDash = async (req, res) => {
        try {
            const result = await adminModel.find();
            res.render('adminProfile', { data: result })
        } catch (error) {
            console.log(error);
        }

    }

    static getAddProduct = (req, res) => {
        res.render('addProduct', { msg: false })
    }

    static addProduct = async (req, res) => {
        // ... add product here
        try {
            const { productName, price, category } = req.body;
            const item = new itemModel({
                productName: productName,
                price: price,
                category: category,
                image: req.file.filename
            })

            const result = await item.save();
            if (result) {
                res.redirect('/admin/manageProducts')
            } else {
                res.render('addProduct', { msg: "field to addd item" })
            }
        } catch (error) {
            console.log(error);
        }
    }

    static manageProducts = async (req, res) => {
        try {
            const result = await itemModel.find();
            res.render('manageProducts', { data: result })
        } catch (error) {

        }
    }

    static manageorders = async (req, res) => {
        try {
            const result = await orderModel.find();
            res.render('manageOrders', { data: result })
        } catch (error) {
            console.log(error);
        }
    }

    // delete product
    static deleteProduct = async (req, res) => {
        try {
            const result = await itemModel.findByIdAndDelete({ _id: req.params.id });
            const imageOne = result.image;
            if (result) {
                fs.unlinkSync(path.join(__dirname, '../public/productImages' + `/${imageOne}`));
                res.redirect("/admin/manageProducts")
            }

        } catch (error) {
            console.log(error);
        }
    }

    // orderConfrim
    static orderConfrim = async (req, res) => {
        try {
            const result = await orderModel.updateOne({ _id: req.params.id }, {
                $set: {
                    status: "order confirmed"
                }
            })
            if (result) {
                res.redirect("/admin/manageorders")
            }
        } catch (error) {
            console.log(error);
        }
    }

    // deleteOrder
    static orderDelete = async (req, res) => {
        try {
            const result = await orderModel.deleteOne({ _id: req.params.id });
            if (result) {
                res.redirect("/admin/manageorders")
            }
        } catch (error) {
            console.log(error);
        }
    }

    // logout
    static logout = async (req, res) => {
        try {
            res.clearCookie("adminToken", { path: "/admin" });
            res.redirect('/')
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = adminController