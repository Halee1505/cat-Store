import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const host = "http://localhost:1505";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  function handleSubmit() {
    const user = {
      email: email,
      password: password,
    };
    axios
      .post(host + "/user/login", user)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200 && res.data) {
          if (remember) {
            Cookies.set("email", res.data["id"], { expires: 1 });
          } else {
            Cookies.set("email", res.data["id"]);
          }
          window.location.href = "/";
        } else {
          alert("Email hoặc mật khẩu không đúng");
        }
      })
      .catch((err) => {
        alert("Email hoặc mật khẩu không đúng");
      });
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto  mt-5">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-3 fw-light fs-5">
                Sign In
              </h5>
              <div>
                <div className="form-floating mb-3">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    name="username"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    onChange={(e) => {
                      setEmail((email) => e.target.value);
                    }}
                  />
                </div>
                <div className="form-floating mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword((pass) => e.target.value);
                    }}
                  />
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked={remember}
                    id="remember"
                    onClick={() => {
                      setRemember((remember) => (remember ? false : true));
                    }}
                  />
                  <label className="form-check-label" htmlFor="remember">
                    Remember password
                  </label>
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-secondary btn-login text-uppercase fw-bold"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Sign in
                  </button>
                  <Link to="/signup">
                    <button
                      className="btn btn-light btn-login text-uppercase fw-bold"
                      type="button"
                    >
                      Sign up
                    </button>
                  </Link>
                </div>
              </div>
              <div className="text-center">
                <Link to="/forgot-password">
                  <small className="text-muted fw-light">
                    Forgot password?
                  </small>
                </Link>
              </div>
              <hr className="my-2" />
              <div className="text-center mt-2 mb-2">
                <small className="text-muted fw-light">Or</small>
              </div>
              <div className="d-flex justify-content-center ">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    window.location.href = "/homepage";
                  }}
                >
                  Start without login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
