const cardModel = require('../models/cardModel');
const itemModel = require('../models/itemModel')
const jwt = require('jsonwebtoken');
class cardController {

    // add to card
    static addtoCard = async (req, res) => {
        try {
            const authData = await jwt.verify(req.token, 'secretKey');
            const item = await itemModel.findById({ _id: req.params.id });
            let cardItem = new cardModel({
                _user: authData.jwtUser._id,
                _item: item._id,
                productName: item.productName,
                productPrice: item.price,
                category: item.category,
            })

            const result = await cardItem.save()
            if (result) res.redirect(`/myCard/${authData.jwtUser._id}`)
        } catch (error) {
            console.log(error);
        }
    }

    //... my card
    static myCard = async (req, res) => {
        try {
            const authData = await jwt.verify(req.token, 'secretKey');
            const result = await cardModel.find({ _user: authData.jwtUser._id })
            if (result) {
                res.render('card', { isLogin: true, card: result, data: authData.jwtUser })
            } else {
                res.render('card', { isLogin: true, card: [], data: authData.jwtUser })
            }

        } catch (error) {
            console.log(error);
        }
    }

    // remove form card
    static removeCard = async (req, res) => {
        try {
            const authData = await jwt.verify(req.token, 'secretKey');
            const result = await cardModel.findByIdAndDelete({ _id: req.params.id });
            if (result) {
                res.redirect(`/myCard/${authData.jwtUser._id}`)
            }
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = cardController