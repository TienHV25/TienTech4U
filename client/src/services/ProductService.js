import axios from "axios"

export const getAllProducts = async (page = 1, limit = 8) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/product/get-product-all`, {
            params: { page: page - 1, limit },
        })
        return res.data
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data
        }
        throw error
    }
}

export const createProducts = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/product/create-product`,data)
        return res.data
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data
        }
        throw error
    }
}

export const updateProduct = async (id,data) => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_URL_BACKEND}/product/update-product/${id}`,data)
        return res.data
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data
        }
        throw error
    }
}

export const getDetailProduct = async (id) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/product/get-product-detail/${id}`)
        return res.data
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data
        }
        throw error
    }
}


export const deleteProduct = async (id) => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_URL_BACKEND}/product/delete-product/${id}`)
        return res.data
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data
        }
        throw error
    }
}