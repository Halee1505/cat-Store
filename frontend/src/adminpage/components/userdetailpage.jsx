import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const host = "http://localhost:1505";
export default function UserDetailPage() {
  const [user, setUser] = useState({});
  const request = useLocation().search.split("=")[1];

  useEffect(() => {
    axios.get(host + "/user/" + request).then((res) => {
      setUser(res.data[0]);
    });
  }, [request]);

  function DeleteUser(user) {
    // eslint-disable-next-line no-restricted-globals
    const cf = confirm("Are you sure to delete this user?");
    if (cf) {
      axios.delete(host + "/user/" + user.id).then((res) => {
        window.location.href = "/admin/manage-users";
      });
    }
  }
  return (
    <div className="container-fluid">
      {Object.keys(user).length !== 0 ? (
        <div className="container">
          <div className="row d-flex justify-content-between mb-2 mt-2 align-items-center">
            <div className="card card-body col-md-4" style={{ width: "8rem" }}>
              <label
                htmlFor="avt"
                className="card-img-top img-border mb-4"
                style={{ backgroundImage: "url(" + user.avatar + ")" }}
              ></label>
              <hr className="my-4" />
            </div>
            <div className=" card card-body col-md-7 mt-4 mb-4">
              <h4 className="card-title">Thông tin khách hàng</h4>
              <form>
                <div className="form-group row">
                  <label
                    htmlFor="inputEmail"
                    className="col-sm-4 col-form-label"
                  >
                    Tên khách hàng:{" "}
                  </label>
                  <div className="col-sm-8">
                    <div className="col-sm-8 col-form-label">
                      {user.name ? user.name : "Chưa cập nhật"}
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputEmail"
                    className="col-sm-4 col-form-label"
                  >
                    Email:{" "}
                  </label>
                  <div className="col-sm-8">
                    <div className="col-sm-8 col-form-label">{user.email}</div>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputphonenumber"
                    className="col-sm-4 col-form-label"
                  >
                    Số điện thoại:{" "}
                  </label>
                  <div className="col-sm-8 col-form-label">
                    <div className="col-sm-8 col-form-label">
                      {user.phone ? user.phone : "Chưa cập nhật"}
                    </div>
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="inputgender"
                    className="col-sm-4 col-form-label"
                  >
                    Địa chỉ:{" "}
                  </label>
                  <div className="col-sm-8 col-form-label">
                    <div className="col-sm-8 col-form-label">
                      {user.address ? user.address : "Chưa cập nhật"}
                    </div>
                  </div>
                </div>

                <div className="form-group row justify-content-around">
                  <Link to="/admin/manage-users">
                    <button type="button" className="btn btn-dark">
                      Quay lại
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      DeleteUser(user);
                    }}
                  >
                    Xóa tài khoản
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
