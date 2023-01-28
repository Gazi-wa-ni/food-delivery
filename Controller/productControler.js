const itemModel = require('../models/itemModel')
const jwt = require('jsonwebtoken')

class productController {

    static allProducts = async (req, res) => {
        try {
            const data = await itemModel.find();
            if (req.token) {
                const authData = await jwt.verify(req.token, 'secretKey');
                if (data)
                    res.render('products', { isLogin: true, items: data, data: authData.jwtUser })
                else
                    res.render('products', { isLogin: true, items: [], data: authData.jwtUser })
            } else {
                res.render('products', { isLogin: false, items: data });
            }

        } catch (error) {
            console.log(error);
        }
    }

    static getProductByCat = async (req, res) => {
        try {
            const data = await itemModel.find({
                category: req.params.cat
            });

            if (req.token) {
                const authData = await jwt.verify(req.token, 'secretKey');

                if (data)
                    res.render('products', { isLogin: true, items: data, data: authData.jwtUser })
                else
                    res.render('products', { isLogin: true, items: [], data: authData.jwtUser })
            } else {
                res.render('products', { isLogin: false, items: data });
            }

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = productController