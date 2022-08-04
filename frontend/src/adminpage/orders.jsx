import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Money from "../components/moneyformat";

const host = "http://localhost:1505";

function compareDate(date) {
  const date_ = new Date(date);
  return (
    date_.getDate() + "-" + (date_.getMonth() + 1) + "-" + date_.getFullYear()
  );
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios.get(host + "/transaction").then((res) => {
      setResult(
        res.data.filter((transaction) => transaction.status !== "pending")
      );
      setOrders(
        res.data.filter((transaction) =>
          String(transaction.id).includes(search)
        )
      );
    });
  }, []);
  console.log(result);

  const handleSearch = () => {
    setOrders(
      result.filter(
        (transaction) =>
          String(transaction.id).includes(search) ||
          transaction.user_name.includes(search) ||
          transaction.user_phone.includes(search)
      )
    );
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-light justify-content-between">
        <a className="navbar-brand"></a>
        <div className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Tìm kiếm theo mã đơn hàng/tên khách hàng/số điện thoại"
            aria-label="Search"
            style={{ width: "20vw" }}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            className="btn btn-outline-dark my-2 my-sm-0"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className="table" style={{ fontSize: "0.8rem" }}>
              <thead className="table-light">
                <tr>
                  <th scope="col">Mã đơn hàng</th>
                  <th scope="col">Ngày tạo</th>
                  <th scope="col">Tên khách hàng</th>
                  <th scope="col">Email</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Tổng tiền</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((transaction) => (
                  <tr>
                    <th scope="row">{transaction.id}</th>
                    <td>{compareDate(transaction.created)}</td>
                    <td>{transaction.user_name}</td>
                    <td>{transaction.user_email}</td>
                    <td>{transaction.user_phone}</td>
                    <td>{transaction.user_address}</td>
                    <td>
                      <Money value={transaction.amount} />
                    </td>
                    <td>{transaction.status}</td>
                    <td>
                      <Link
                        to={`/admin/transaction-detail?id=${transaction.id}`}
                        style={{ cursor: "pointer" }}
                      >
                        <button className="btn btn-dark btn-sm">
                          Chi tiết
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
