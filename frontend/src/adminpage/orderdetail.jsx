/* eslint-disable no-restricted-globals */
import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Money from "../components/moneyformat";
import UserContext from "../context/usercontext";

const host = "http://localhost:1505";

const sttArray = ["chờ xác nhận", "chờ lấy hàng", "đang giao", "đã giao"];

export default function OrderDetail() {
  const context = useContext(UserContext);
  const history = useLocation().search.split("=")[1];
  const [order, setOrder] = useState([]);
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    axios.get(host + "/order/detail/bytransaction/" + history).then((res) => {
      setOrder(res.data);
    });
    axios.get(host + "/transaction/" + history).then((res) => {
      setTransaction(res.data);
    });
  }, [context.clickBtn]);
  console.log(order);
  console.log(transaction);

  function ChangeStatus(stt, id) {
    const ind = sttArray.indexOf(stt);
    const cf = confirm(
      "Xác nhận thay đổi trạng thái sang " + sttArray[ind + 1]
    );
    if (cf) {
      axios
        .put(host + "/transaction/status/" + id, {
          status: sttArray[ind + 1],
        })
        .then((res) => {
          console.log(res);
          context.setClickBtn(!context.clickBtn);
        });
    }
  }
  function removeItem() {
    const cf = confirm("Xác nhận huỷ đơn hàng");
    if (cf) {
      axios.delete(host + "/transaction/" + history).then((res) => {
        axios.delete(host + "/order/bytransaction/" + history).then((res) => {
          console.log(res);
          window.location.href = "/admin/manage-orders";
        });
      });
    }
  }

  function compareDate(date) {
    const date_ = new Date(date);
    return (
      date_.getDate() + "-" + (date_.getMonth() + 1) + "-" + date_.getFullYear()
    );
  }

  return (
    <div
      className="container-fluid"
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "90%",
          margin: "auto",
        }}
      >
        {transaction.map((transaction) => (
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Thông tin khách hàng</h5>
                  <p className="card-text">
                    <span>Họ & Tên: </span>
                    {transaction.user_name}
                  </p>
                  <p className="card-text">
                    <span>Số điện thoại: </span>
                    {transaction.user_phone}
                  </p>
                  <p className="card-text">
                    <span>Email: </span>
                    {transaction.user_email}
                  </p>
                  <p className="card-text">
                    <span>Địa Chỉ: </span>
                    {transaction.user_address}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <h2>Chi tiết đơn hàng</h2>
                    </div>
                    <div className="col-md-4 d-flex justify-content-center align-items-center btn-lg">
                      <span>
                        Trạng thái: <strong>{transaction.status}</strong>
                      </span>
                    </div>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" colSpan={2}>
                          Tên sản phẩm
                        </th>
                        <th scope="col" colSpan={2}>
                          Phân loại
                        </th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.map((order) => (
                        <tr>
                          <td>
                            <img
                              src={order.link_img}
                              alt=""
                              style={{ height: "50px" }}
                            />
                          </td>
                          <td>{order.name}</td>
                          <td>{order.size}</td>
                          <td>
                            <button
                              style={{
                                backgroundColor: order.color,
                                height: "30px",
                                width: "30px",
                              }}
                            ></button>
                          </td>
                          <td>{order.qty}</td>
                          <td>
                            <Money value={order.price} />
                          </td>
                          <td>
                            <Money value={order.price * order.qty} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="card-header">
                  <div className="row">
                    <div className="col-md-8">
                      <h5>
                        Phương thức: <strong>{transaction.payment}</strong>
                      </h5>
                    </div>
                    <div className="col-md-4">
                      <h5>
                        Tổng số tiền:{" "}
                        <strong>
                          <Money value={transaction.amount} />
                        </strong>
                      </h5>
                    </div>
                    <div className="col-md-7">
                      <p>Ngày tạo đơn: {compareDate(transaction.created)}</p>
                    </div>
                    {transaction.status === "đã hủy" ? (
                      <div className="col-md-5 d-flex justify-content-end">
                        <button className="btn btn-danger" onClick={removeItem}>
                          Xóa đơn hàng
                        </button>
                      </div>
                    ) : transaction.status !== "đã giao" ? (
                      <div className="col-md-5 d-flex justify-content-between">
                        <button
                          className="btn btn-outline-dark"
                          onClick={() => {
                            ChangeStatus(transaction.status, transaction.id);
                          }}
                        >
                          Cập nhật trạng thái
                        </button>
                        <button className="btn btn-danger" onClick={removeItem}>
                          Xóa đơn hàng
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
