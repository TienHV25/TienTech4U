const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const {authMiddleWare} = require('../middleware/authMiddleWare')

router.post('/sign-up',UserController.createUser)
router.post('/sign-in',UserController.loginUser)
router.post('/log-out',UserController.logoutUser)
router.put('/update-user/:id',authMiddleWare(),UserController.updateUser)
router.delete('/delete-user/:id',authMiddleWare(),UserController.deleteUser)
router.get('/get-user-detail/:id',authMiddleWare(),UserController.getUserDetail)
router.get('/get-user',UserController.getUserAll)
router.post('/refresh-token',UserController.refreshToken)

router.post('/delete-many',UserController.deleteMany)


module.exports = router