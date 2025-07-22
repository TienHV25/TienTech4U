import axios from "axios"

export const getAllProducts = async (search,limit) => {
    try {
        let res = ''
        if(search?.length > 0){
          res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/product/get-product-all?limit=${limit}&page=0&filter=name&filter=${search}`)
        }else{
          res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/product/get-product-all?limit=${limit}&page=0`)
        }
        return res.data
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data
        }
        throw error
    }
}

export const getAllProductsType = async (type) => {
    try {
        if(type) {
          const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/product/get-product-all?filter=type&filter=${type}`)
          return res.data
        }
        
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

export const deleteProductMany = async (id) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/product/delete-many`,id )
        return res.data
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data
        }
        throw error
    }
}

export const getAllType = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/product/get-all-type`)
        return res.data
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data
        }
        throw error
    }
}
