/* eslint-disable no-restricted-globals */
import { useState, useContext, useEffect } from "react";
import CartContext from "../context/cartcontext";
import userContext from "../context/usercontext";
import axios from "axios";
import Cookies from "js-cookie";
import Money from "./moneyformat";
let loged = Cookies.get("email");

const host = "http://localhost:1505";

function compareDate(date) {
  const date_ = new Date(date);
  return (
    date_.getDate() + "-" + (date_.getMonth() + 1) + "-" + date_.getFullYear()
  );
}

export default function Bill() {
  const CartState = useContext(CartContext);
  const UserContext = useContext(userContext);

  const [transaction, setTransaction] = useState([]);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    axios.get(host + "/transaction/byuser/" + loged).then((res) => {
      setTransaction(res.data);
    });
    axios.get(host + "/order/detail/byuser/" + loged).then((res) => {
      setOrder(res.data);
    });
  }, [UserContext.clickBtn]);
  console.log(transaction);
  console.log(order);

  function delTransaction(id) {
    const cf = confirm("Xác nhận huỷ đơn hàng");
    if (cf) {
      axios
        .put(host + "/transaction/status/" + id, {
          status: "đã hủy",
        })
        .then((res) => {
          console.log(res);
          UserContext.setClickBtn(!UserContext.clickBtn);
          CartState.setBillOption("đã hủy");
        });
    }
  }

  function completeTransaction(id) {
    const cf = confirm("Xác nhận đã nhận hàng");
    if (cf) {
      axios
        .put(host + "/transaction/status/" + id, {
          status: "đã giao",
        })
        .then((res) => {
          console.log(res);
          UserContext.setClickBtn(!UserContext.clickBtn);
          CartState.setBillOption("đã giao");
        });
    }
  }

  return (
    // <div>a</div>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <table className="table">
            <thead>
              <tr>
                <th
                  scope="col"
                  onClick={() => {
                    CartState.setBillOption("tất cả");
                  }}
                  className={
                    CartState.billOption === "tất cả"
                      ? "bg-secondary text-white text-center"
                      : "text-center"
                  }
                >
                  Tất cả
                </th>
                <th
                  scope="col"
                  onClick={() => {
                    CartState.setBillOption("chờ xác nhận");
                  }}
                  className={
                    CartState.billOption === "chờ xác nhận"
                      ? "bg-secondary text-white text-center"
                      : "text-center"
                  }
                >
                  Chờ xác nhận
                </th>
                <th
                  scope="col"
                  onClick={() => {
                    CartState.setBillOption("chờ lấy hàng");
                  }}
                  className={
                    CartState.billOption === "chờ lấy hàng"
                      ? "bg-secondary text-white text-center"
                      : "text-center"
                  }
                >
                  Chờ lấy hàng
                </th>
                <th
                  scope="col"
                  onClick={() => {
                    CartState.setBillOption("đang giao");
                  }}
                  className={
                    CartState.billOption === "đang giao"
                      ? "bg-secondary text-white text-center"
                      : "text-center"
                  }
                >
                  Đang giao
                </th>
                <th
                  scope="col"
                  onClick={() => {
                    CartState.setBillOption("đã giao");
                  }}
                  className={
                    CartState.billOption === "đã giao"
                      ? "bg-secondary text-white text-center"
                      : "text-center"
                  }
                >
                  Đã giao
                </th>
                <th
                  scope="col"
                  onClick={() => {
                    CartState.setBillOption("đã hủy");
                  }}
                  className={
                    CartState.billOption === "đã hủy"
                      ? "bg-secondary text-white text-center"
                      : "text-center"
                  }
                >
                  Đã hủy
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="col-md-12">
          {transaction
            .sort((a, b) => {
              return new Date(b.id) - new Date(a.id);
            })
            .filter(
              (item) =>
                item.status === CartState.billOption ||
                CartState.billOption === "tất cả"
            )
            .map((transaction, i) => (
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    {order
                      .filter(
                        (order) => order.transaction_id === transaction.id
                      )
                      .map((item, index) => (
                        <div className="col-md-12 border-bottom" key={index}>
                          <div className="row">
                            <div className="col-md-2">
                              <img
                                style={{ height: "4vw" }}
                                src={item.link_img}
                                alt="aa"
                              />
                            </div>
                            <div className="col-md-5">
                              <h3>{item.name}</h3>
                              <h3> x {item.qty}</h3>
                            </div>
                            <div className="col-md-3 d-flex justify-content-center align-items-center">
                              Giá tiền:{" "}
                              <strong>
                                <Money value={item.amount} />
                              </strong>
                            </div>
                            <div className="col-md-2 d-flex justify-content-center align-items-center border-left">
                              {index === 0 ? <h6>{transaction.status}</h6> : ""}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
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
                    <div className="col-md-8">
                      <p>Ngày tạo đơn: {compareDate(transaction.created)}</p>
                    </div>
                    {transaction.status === "chờ xác nhận" ? (
                      <div className="col-md-4 d-flex justify-content-end">
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            delTransaction(transaction.id);
                          }}
                        >
                          Hủy đơn hàng
                        </button>
                      </div>
                    ) : transaction.status === "đang giao" ? (
                      <div className="col-md-4 d-flex justify-content-end">
                        <button
                          className="btn btn-outline-dark"
                          onClick={() => {
                            completeTransaction(transaction.id);
                          }}
                        >
                          Đã nhận được hàng
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
