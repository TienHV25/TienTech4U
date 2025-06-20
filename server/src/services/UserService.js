const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const jwtService = require('../services/jwtService')
const createUser = async (newUser) => {
    const {  email, password} = newUser
    try {
        const checkUser = await User.findOne({ email: email })
        if (checkUser) {
            return {
                status: 'ERR',
                message: 'Email này đã được đăng ký!'
            }
        }
        const hash = bcrypt.hashSync(password,10)
        const createdUser = await User.create({
            email,
            password: hash
        })

        if (createdUser) {
            return {
                status: 'OK',
                message: 'SUCCESS',
                data: createdUser
            }
        }
    } catch (e) {
        throw e 
    }
}

const loginUser = async (userLogin) => {
    const { email, password} = userLogin
    try {
        const checkUser = await User.findOne({ email: email })
        if (!checkUser) {
            return {
                status: 'ERR',
                message: 'Tài khoản hoặc mật khẩu không chính xác'
            }
        }
        const comparePassword = bcrypt.compareSync(password,checkUser.password)
        if(!comparePassword) {
            return {
                status: 'ERR',
                message: 'Tài khoản hoặc mật khẩu không chính xác'
            }
        }
        const access_token = jwtService.generalAccessToken(
            {
                id:checkUser.id,
                isAdmin:checkUser.isAdmin
            }
        )
        const refresh_token = jwtService.generalRefreshToken(
            {
                id:checkUser.id,
                isAdmin:checkUser.isAdmin
            }
        )
        return {
            status: 'OK',
            message: 'SUCCESS',
            access_token,
            refresh_token
        }

    } catch (e) {
        throw e   
    }
}

const updateUser = async (userID,data) => {
    try {
        const {email,password, ...otherData } = data
        
        const checkUser = await User.findOne({ _id:userID })
        if (!checkUser) {
            return {
                status: 'ERR',
                message: 'Tài khoản không tồn tại'
            }
        }
        if (email) {
            const existingUser = await User.findOne({ email: email, _id: { $ne: userID } })
            if (existingUser) {
                return {
                    status: 'ERR',
                    message: 'Email đã tồn tại, vui lòng chọn email khác',
                }
            }
        }
        let updateData = { ...otherData }
        if (password) {
            const hashedPassword = bcrypt.hashSync(password, 10)
            updateData.password = hashedPassword
        }
        if (email) {
            updateData.email = email
        }
        const updatedUser = await User.findByIdAndUpdate(
            userID, 
            updateData,
            { new: true }
        )
        if(!updatedUser) {
            return {
                status: 'ERR',
                message: 'Failed to update user'
            }
            }
        return {
            status: 'OK',
            message: 'User updated successfully',
            data: updatedUser
        }
    } catch (e) {
        throw e 
    }
}

const deleteUser = async (userID,data) => {
    try {
        const checkUser = await User.findOne({ _id:userID })
        if (!checkUser) {
            return {
                status: 'ERR',
                message: 'Tài khoản không tồn tại'
            }
        }
        const deletedUser = await User.findByIdAndDelete(
            userID, 
            data
        )
        if(!deletedUser ) {
            return {
                status: 'ERR',
                message: 'Failed to delete user'
            }
            }
        return {
            status: 'OK',
            message: 'User delete successfully'
        }
    } catch (e) {
        throw e 
    }
}

const getUserDetail = async (userID) => {
    try {
        const user = await User.findOne({ _id:userID })
        if (!user) {
            return {
                status: 'ERR',
                message: 'Tài khoản không tồn tại'
            }
        }
        return {
            status: 'OK',
            message: 'Get user successfully',
            data: user
        }
    } catch (e) {
        throw e 
    }
}

const getUserAll = async () => {
    try {
        const user = await User.find()
        if (!user) {
            return {
                status: 'ERR',
                message: 'Tài khoản không tồn tại'
            }
        }
        return {
            status: 'OK',
            message: 'Get user successfully',
            data: user
        }
    } catch (e) {
        throw e 
    }
}


module.exports = {createUser,loginUser,updateUser,deleteUser,getUserDetail,getUserAll}