import { useState, useContext, useEffect } from "react";
import UserContext from "../context/usercontext";
import Cookies from "js-cookie";
import axios from "axios";
import Money from "../components/moneyformat";
import { useNavigate } from "react-router-dom";

let loged = Cookies.get("email");
const host = "http://localhost:1505";

export default function Transaction() {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const [user, setUser] = useState([]);
  const [paymentMenthod, setPaymentMenthod] = useState("momo");
  const [message, setMessage] = useState("");
  const [transactionInfo, setTransactionInfo] = useState({
    user_id: "",
    user_name: "",
    user_email: "",
    user_address: "",
    user_phone: "",
    amount: "",
    payment: "",
    payment_info: "",
    message: "",
    status: "",
    security: "",
  });

  useEffect(() => {
    if (user.length > 0) {
      const user_info = user[0];

      setTransactionInfo({
        user_id: user_info.id,
        user_name: user_info.name,
        user_email: user_info.email,
        user_address: user_info.address,
        user_phone: user_info.phone,
        amount:
          context.transactionOrder.reduce((total, item) => {
            return total + item.amount;
          }, 0) + 30000,
        payment: paymentMenthod,
        payment_info: "",
        message: message,
        status: "chờ xác nhận",
        security: "",
      });
    }
  }, [context.transactionOrder, message, paymentMenthod, user]);

  useEffect(() => {
    axios
      .get(host + "/user/" + loged)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function updateOrder(transaction_id, order_id) {
    return new Promise((resolve, reject) => {
      axios
        .put(host + "/order/update-transaction/" + order_id, {
          transaction_id: transaction_id,
          status: "chờ xác nhận",
        })
        .then((res) => {
          resolve(res);
        });
    });
  }

  function checkOut() {
    axios
      .post(host + "/transaction", transactionInfo)
      .then((res) => {
        Promise.all(
          context.transactionOrder.map((item) => {
            return updateOrder(res.data.insertId, item.id);
          })
        ).then((res) => {
          console.log(res);
          alert("Đặt hàng thành công");
          navigate("/cart");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row bg-white p-2 border-top border-dark">
                  <div className="col-md-12">
                    <h2> Thông Tin Khách Hàng </h2>
                  </div>
                  {user.map((user, index) => (
                    <div className="col-md-12" key={index}>
                      <p>
                        <b>Tên:</b> {user.name}
                      </p>
                      <p>
                        <b>Số điện thoại:</b> {user.phone}
                      </p>
                      <p>
                        <b>Email:</b> {user.email}
                      </p>
                      <p>
                        <b>Địa chỉ:</b> {user.address}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">STT</th>
                        <th scope="col" colSpan={2}>
                          Tên sản phẩm
                        </th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Đơn giá</th>
                        <th scope="col">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {context.transactionOrder.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <img
                              style={{ height: "5vw" }}
                              src={item.link_img}
                              alt="aa"
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.qty}</td>
                          <td>
                            <Money value={item.price} />
                          </td>
                          <td>
                            <Money value={item.amount} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-header"></div>
              <div
                className="card-body"
                style={{
                  borderTop: "1px solid rgba(0,0,0,.125)",
                }}
              >
                <div className="row">
                  <div className="col-md-8">
                    <div className="row bg-white p-2 border-right border-dark">
                      <div className="col-md-3  d-flex align-items-center">
                        <h3> Lời nhắn cho shop: </h3>
                      </div>

                      <div className="col-md-9 d-flex align-items-center">
                        <textarea
                          style={{ width: "90%" }}
                          rows="2"
                          onChange={(e) => {
                            setMessage(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 d-flex align-items-center">
                    <p>
                      <b>Tổng tiền hàng:</b>{" "}
                      <Money
                        value={context.transactionOrder.reduce(
                          (total, cart) => cart.amount + total,
                          0
                        )}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-header">
                <div className="row">
                  <div className="col-md-3">
                    <h3> Phương thức thanh toán </h3>
                  </div>
                  <div
                    style={{
                      cursor: "pointer",
                    }}
                    className={
                      "col-md-2 p-2 border text-center mr-2 " +
                      (paymentMenthod === "momo"
                        ? "text-white bg-danger"
                        : "text-dark bg-light")
                    }
                    onClick={() => {
                      setPaymentMenthod("momo");
                    }}
                  >
                    <h3> Momo</h3>
                  </div>
                  <div
                    style={{
                      cursor: "pointer",
                    }}
                    className={
                      "col-md-3 p-2 border text-center " +
                      (paymentMenthod === "Thanh toán khi nhận hàng"
                        ? "text-white bg-danger"
                        : "text-dark bg-light")
                    }
                    onClick={() => {
                      setPaymentMenthod("Thanh toán khi nhận hàng");
                    }}
                  >
                    <h3> Thanh toán khi nhận hàng</h3>
                  </div>
                </div>
              </div>
              <div className="card-body">
                {paymentMenthod === "momo" ? (
                  <div className="row">
                    <div className="col-md-3">
                      <img
                        style={{
                          height: "80px",
                        }}
                        src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                        alt="momo logo"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-md-12">
                      Thanh toán khi nhận hàng Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí
                      vận chuyển (nếu có) áp dụng cả với phí thu hộ.
                    </div>
                  </div>
                )}
              </div>
              <div className="card-header">
                <div className="row">
                  <div className="col-md-8"></div>
                  <div className="col-md-4">
                    <p>
                      <b>Tổng tiền hàng:</b>{" "}
                      <Money
                        value={context.transactionOrder.reduce(
                          (total, cart) => cart.amount + total,
                          0
                        )}
                      />
                    </p>
                    <p>
                      <b>Phí vận chuyển:</b> <Money value={30000} />
                    </p>
                    <p>
                      <b>Tổng tiền thanh toán:</b>{" "}
                      <Money
                        value={
                          context.transactionOrder.reduce(
                            (total, cart) => cart.amount + total,
                            0
                          ) + 30000
                        }
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-10"></div>
                  <div className="col-md-2">
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={checkOut}
                    >
                      Thanh Toán
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
