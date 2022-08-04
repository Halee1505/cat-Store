/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import userContext from "../context/usercontext";
import { Link } from "react-router-dom";
import Money from "./moneyformat";
import axios from "axios";
import Cookies from "js-cookie";
let loged = Cookies.get("email");
const host = "http://localhost:1505";
export default function Cart({ onChangeTotal }) {
  const [cart, setCart] = useState([]);
  const UserContext = useContext(userContext);

  const [totalList, setTotalList] = useState([]);
  useEffect(() => {
    axios.get(host + "/order/detail/byuser/" + loged).then((res) => {
      setCart(res.data.filter((cart) => cart.status === "pending"));
    });
  }, [UserContext.clickBtn]);

  function removeItem(cart) {
    axios.delete(host + "/order/" + cart.id).then((res) => {
      UserContext.setClickBtn(!UserContext.clickBtn);
    });
  }
  console.log(cart);
  useEffect(() => {
    onChangeTotal(totalList);
  }, [totalList]);
  return (
    <div className="container-fuild">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className="table bg-white">
              <thead>
                <tr>
                  <th scope="col">
                    <input
                      type="checkbox"
                      style={{
                        width: "16px",
                        height: "16px",
                        cursor: "pointer",
                      }}
                      checked={
                        cart.length === totalList.length && cart.length !== 0
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          setTotalList((t) => []);
                          setTotalList((t) => cart);
                        } else {
                          setTotalList([]);
                        }
                      }}
                    />
                  </th>
                  <th scope="col">STT</th>

                  <th scope="col" colSpan={2}>
                    Sản phẩm
                  </th>
                  <th>Phân loại</th>
                  <th scope="col">Đơn giá</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Thành tiền</th>
                  <th scope="col" colSpan={2}></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((cart, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          style={{
                            width: "16px",
                            height: "16px",
                            cursor: "pointer",
                          }}
                          checked={totalList.includes(cart)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setTotalList([...totalList, cart]);
                            } else {
                              setTotalList(
                                totalList.filter((item) => item.id !== cart.id)
                              );
                            }
                          }}
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          style={{ height: "5vw" }}
                          src={cart.link_img}
                          alt="aa"
                        />
                      </td>
                      <td>
                        <p
                          style={{
                            width: "16vw",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            cursor: "pointer",
                          }}
                        >
                          {cart.name}
                        </p>
                      </td>
                      <td>
                        <div
                          style={{
                            height: "1.6vw",
                            width: "1.6vw",
                            border: "1px solid #000",
                            borderRadius: "2px",
                            backgroundColor: cart.color,
                          }}
                        ></div>
                        <div
                          style={{
                            whiteSpace: "nowrap",
                          }}
                        >
                          Size:
                          {cart.size}
                        </div>
                      </td>
                      <td>
                        <Money value={cart.price} />
                      </td>
                      <td>{cart.qty}</td>
                      <td>
                        <Money value={cart.amount} />
                      </td>
                      <td>
                        <Link to={`/itemdetail/${cart.product_id}`}>
                          <p className="badge badge-dark mr-2">View detail</p>
                        </Link>
                      </td>
                      <td>
                        <div
                          className="badge badge-danger"
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => removeItem(cart)}
                        >
                          Delete
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
