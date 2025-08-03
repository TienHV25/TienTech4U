import {axiosJWT} from "./UserService"

export const createOrder = async (access_token, data) => {
  try {
    const res = await axiosJWT.post(
      `${process.env.REACT_APP_URL_BACKEND}/order/create-order`,
      data,
      {
        headers: {
          token: `Bearer ${access_token}`
        }
      }
    );
    return res.data;
  } catch (error) {
      throw error;
  }
}

export const getOrderDetails = async (access_token, userID) => {
  try {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_URL_BACKEND}/order/get-order-details/${userID}`,
      {
        headers: {
          token: `Bearer ${access_token}`
        }
      }
    );
    return res.data;
  } catch (error) {
      throw error;
  }
}
