const userRouter = require('express').Router();
const userController = require('../controllers/userController');
const { userAuth } = require('../middlewares/userAuth');
const { upload } = require('../middlewares/uploadImage');

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/profile', userAuth, userController.getProfile);
userRouter.post('/profile/photo', [ userAuth, upload.single('image')], userController.uploadProfilePic);

module.exports = userRouter;
