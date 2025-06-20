require('dotenv').config()
UserService = require('../services/UserService')
const jwtService = require('../services/jwtService')

const createUser = async(req,res) => {
    try {
        const { email,password,confirmPassword } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if(!email || !password || !confirmPassword)
        {
            return res.status(400).json({
                status:'ERR',
                message: 'Đây là thông tin bắt buộc'
            })
        }else if(!isCheckEmail) {
            return res.status(400).json({
                status:'ERR',
                message: 'Email không đúng định dạng'
            })
        }else if(password !== confirmPassword) {
            return res.status(400).json({
                status:'ERR',
                message: 'Password không khớp,vui lòng kiểm tra lại !'
            })
        }
        const userRes = await UserService.createUser(req.body)
        return res.status(200).json(userRes)
    } catch (e) {
        return res.status(500).json({message:e})
    }
}

const loginUser = async(req,res) => {
    try {
        const { email,password } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if(!email || !password )
        {
            return res.status(400).json({
                status:'ERR',
                message: 'Đây là thông tin bắt buộc'
            })
        }else if(!isCheckEmail) {
            return res.status(400).json({
                status:'ERR',
                message: 'Tài khoản hoặc mật khẩu không chính xác'
            })
        }
        const userLog = await UserService.loginUser(req.body)
        const {refresh_token,...newUserLog } = userLog 
        res.cookie('refresh_token',refresh_token,{
            httpOnly: true,   
            secure: false,  
            sameSite: 'strict',
        })
        return res.status(200).json(newUserLog)
    } catch (e) {
        return res.status(500).json({message:e})
    }
}

const updateUser = async(req,res) => {
    try {
        const userID = req.params.id
        const {email} = req.body 
        if(!email)
            {
                return res.status(400).json({
                    status:'ERR',
                    message: 'Email là thông tin bắt buộc'
                })
            }
        const userUpdate =  await UserService.updateUser(userID,req.body)
        return res.status(200).json(userUpdate)
    } catch (e) {
        return res.status(500).json({message:e})
    }
}

const deleteUser = async(req,res) => {
    try {
        const userID = req.params.id
        const userDelete =  await UserService.deleteUser(userID,req.body)
        return res.status(200).json(userDelete)
    } catch (e) {
        return res.status(500).json({message:e})
    }
}

const getUserDetail = async(req,res) => {
    try {
        const userID = req.params.id
        const userGetDetail =  await UserService.getUserDetail(userID)
        return res.status(200).json(userGetDetail)
    } catch (e) {
        return res.status(500).json({message:e})
    }
}

const getUserAll = async(req,res) => {
    try {
        const userGetAll =  await UserService.getUserAll()
        return res.status(200).json(userGetAll)
    } catch (e) {
        return res.status(500).json({message:e})
    }
}

const refreshToken = async (req, res) => { 
    try {
        const token = req.cookies.refresh_token
        if (!token) {
            return res.status(403).json({ message: 'Token is required' });
        }

        const user = await jwtService.verifyToken(token, process.env.REFRESH_TOKEN)
        
        const newAccessToken = jwtService.generalAccessToken({
            id: user?.id,
            isAdmin: user?.isAdmin,
        })

        return res.status(200).json({
            status: 'OK',
            message: 'Success',
            accessToken: newAccessToken ,
        })
    } catch (e) {
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
}

const logoutUser = async (req, res) => { 
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'OK',
            message: 'Logout Successfully'
        })
    } catch (e) {
        return res.status(401).json({ message: e})
    }
}
module.exports = {createUser,loginUser,updateUser,deleteUser,getUserDetail,getUserAll,refreshToken,logoutUser}