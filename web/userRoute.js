const express = require('express');
const userController = require('../Controller/userController');
const cardController = require('../Controller/cardController');
const productController = require('../Controller/productControler');
const router = express.Router();

router.get('/', verfiyToken, userController.home);

// get login form
router.get('/login', userController.getlogin);

//login
router.post('/login', userController.login);

// get sign form
router.get('/signin', userController.getsignIn);

// sign
router.post('/signin', userController.signin)

// order now 
router.get('/orderNow/:id', islogin , userController.getOrderNow)

router.post('/orderNow/:id', islogin , userController.orderNow)

// myorders
router.get('/myOrders/:id',islogin,userController.getMyOrders)

// add to card
router.get('/addToCard/:id',islogin,cardController.addtoCard)

//myCard
router.get('/myCard/:id',islogin,cardController.myCard) 

// remove card
router.post('/removeCard/:id',islogin,cardController.removeCard)

// get products
router.get('/products',verfiyToken,productController.allProducts)

// get category product
router.get('/explore/:cat',verfiyToken,productController.getProductByCat)

// logout
router.get('/logout',userController.logout)
// verify token
function verfiyToken(req, res, next) {
    const token = req.cookies.token;
    if (token) {
        req.token = req.cookies.token;
        next();
    } else {
        next();
    }
}

// ckeck if user is logedin or not
function islogin(req, res, next) {
    const token = req.cookies.token;
    if (token) {
        req.token = req.cookies.token;
        next();
    } else {
        res.redirect('/login')
    }
}

module.exports = router