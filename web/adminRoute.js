const express = require('express');
const adminController = require('../Controller/adminController');
const router = express.Router();
const multer = require('multer');
const uuid = require('uuid');
const { logout } = require('../Controller/adminController');
// ...image upload middleware
const DIR = './public/productImages';

// ...image upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR);
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid.v4() + '-' + fileName)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})

router.get('/', verfiyToken, adminController.adminDash);

router.get('/login' , adminController.getAdminLogin);

router.post('/login',  adminController.adminLogin)

router.get('/profile', islogin, adminController.adminDash);

router.get('/addProduct', islogin, adminController.getAddProduct);

router.post('/addProduct', upload.single('image'), islogin ,adminController.addProduct);

router.get('/manageProducts', islogin, adminController.manageProducts);

router.get('/manageorders', islogin, adminController.manageorders)

// delete item
router.post('/deleteProduct/:id', adminController.deleteProduct)

// order confirm
router.post('/confirmOrder/:id', adminController.orderConfrim)

// delete order
router.post('/deleteOrder/:id',adminController.orderDelete);

// logout
router.get('/logout',adminController.logout)

// verify token
function verfiyToken(req, res, next) {
    const token = req.cookies.adminToken;
    if (token) {
        req.token = req.cookies.adminToken;
        next();
    } else {
        res.redirect('/admin/login')
    }
}

// ckeck if admin is loged in or not
function islogin(req, res, next) {
    const token = req.cookies.adminToken;
    if (token) {
        req.token = req.cookies.adminToken;
        next();
    } else {
        res.redirect('/admin/login')
    }

}
module.exports = router 