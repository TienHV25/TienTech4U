import axios from "axios"

export const axiosJWT = axios.create()

export const loginUser = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/user/sign-in`, data)
        return res.data
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data
        }
        throw error
    }
}

export const signupUser = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/user/sign-up`, data)
        return res.data
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data
        }
        throw error
    }
}


export const getAllUser = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/user/get-user`)
        return res.data
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data
        }
        throw error
    }
}

export const getUserDetail = async (id,access_token) => {
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_URL_BACKEND}/user/get-user-detail/${id}`, {
            headers: {
                token: `Bearer ${access_token}`
            }
        })
        return res.data
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data
        }
        throw error
    }
}

export const refreshToken = async () => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/user/refresh-token`, {},
            {
                withCredentials: true
            })
        localStorage.setItem('access_token', JSON.stringify(res.data.accessToken))
        return res.data
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data
        }
        throw error
    }
}

export const logoutUser = async () => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/user/log-out`)
        localStorage.removeItem('access_token')
        window.location.href = '/'
        return res.data
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data
        }
        throw error
    }
}

export const updateUser = async (id,access_token,userData) => {
    try {
        if (!access_token || typeof access_token !== "string") {
            throw new Error("Invalid token format")
        }
        const res = await axiosJWT.put(`${process.env.REACT_APP_URL_BACKEND}/user/update-user/${id}`,userData,{
            headers: {
                token: `Bearer ${access_token}`
            }
        }
        )
        return res.data
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data
        }
        throw error
    }
}

export const deleteUser = async (id,access_token) => {
    try {
        const res = await axiosJWT.delete(`${process.env.REACT_APP_URL_BACKEND}/user/delete-user/${id}`,{
            headers: {
                token: `Bearer ${access_token}`
            }
        }
        )
        return res.data
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data
        }
        throw error
    }
}