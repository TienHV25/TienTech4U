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
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw error;
  }
};
