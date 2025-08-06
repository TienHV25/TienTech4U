import axios from "axios"

export const getConfig = async () => {
  const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/payment/config`)
  return res.data
}

export const convertVNDToUSD = async (amountVND) => {
  try {
    const response = await axios.get("https://open.er-api.com/v6/latest/VND")

    const rate = response?.data?.rates?.USD

    if (!rate) throw new Error("Tỷ giá USD không tồn tại trong response")

    const amountUSD = (amountVND * rate).toFixed(2)
    return amountUSD

  } catch (error) {
    console.error("Lỗi khi chuyển đổi tiền tệ:", error)
    return (amountVND / 26000).toFixed(2) 
  }
}