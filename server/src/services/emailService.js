require('dotenv').config()
const nodemailer = require("nodemailer");

let sendEmail = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_APP,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"TienTech4U" <hvtienjv2005@gmail.com>',
    to: dataSend.receiverEmail,
    subject: "Thông tin đặt hàng",
    html:getBodyHTMLEmail(dataSend)
  });
}

const getBodyHTMLEmail = (dataSend) => {
  const {
    customerName,
    shippingAddress,
    phone,
    shippingPrice,
    paymentMethod,
    shippingMethod,
    isPaid,
    isDelivery,
    orderItems,
    totalPrice,
  } = dataSend

  const orderRows = orderItems.map((item) => {
    const price = Number(item.price)
    const discount = Number(item.discount) || 0
    const tempPrice = price - discount

    return `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${price.toLocaleString('vi-VN')} đ</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.amount}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${discount.toLocaleString('vi-VN')} đ</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${(tempPrice * item.amount).toLocaleString('vi-VN')} đ</td>
      </tr>
    `
  }).join("")

  return `
    <h2>🛒 Cảm ơn bạn đã đặt hàng tại TienTech4U!</h2>
    <p>Thông tin đơn hàng của bạn đã được ghi nhận thành công.</p>

    <h3>📍 Thông tin người nhận:</h3>
    <ul>
      <li><b>Họ tên:</b> ${customerName}</li>
      <li><b>Địa chỉ:</b> ${shippingAddress}</li>
      <li><b>Điện thoại:</b> ${phone}</li>
    </ul>

    <h3>🚚 Giao hàng:</h3>
    <ul>
      <li><b>Hình thức:</b> ${shippingMethod}</li>
      <li><b>Trạng thái:</b> ${isDelivery ? "Đã giao hàng" : "Chưa giao hàng"}</li>
      <li><b>Phí giao hàng:</b> ${shippingPrice.toLocaleString('vi-VN')} đ</li>
    </ul>

    <h3>💳 Thanh toán:</h3>
    <ul>
      <li><b>Hình thức:</b> ${paymentMethod}</li>
      <li><b>Trạng thái:</b> ${isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</li>
    </ul>

    <h3>🧾 Chi tiết sản phẩm:</h3>
    <table style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="padding: 8px; border: 1px solid #ddd;">Sản phẩm</th>
          <th style="padding: 8px; border: 1px solid #ddd;">Giá</th>
          <th style="padding: 8px; border: 1px solid #ddd;">Số lượng</th>
          <th style="padding: 8px; border: 1px solid #ddd;">Giảm giá</th>
          <th style="padding: 8px; border: 1px solid #ddd;">Tạm tính</th>
        </tr>
      </thead>
      <tbody>
        ${orderRows}
      </tbody>
    </table>

    <h3 style="text-align: right;">💰 Tổng thanh toán: ${Number(totalPrice).toLocaleString('vi-VN')} đ</h3>

    <p>📦 Đơn hàng của bạn sẽ sớm được xử lý và giao đến địa chỉ đã cung cấp. Xin cảm ơn!</p>
  `
}

module.exports = {
  sendEmail: sendEmail,
}