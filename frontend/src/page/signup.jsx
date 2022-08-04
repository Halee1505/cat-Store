import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function CreateUser(email, password, fullname, callback) {
  axios
    .post("http://localhost/api/customer/create.php", {
      username: email,
      password: password,
      fullname: fullname,
    })
    .then((res) => {
      // return res.status
      callback(res.status);
    })
    .catch((err) => {
      // return err.response.status
      callback(err.response.status);
    });
}
export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [codeGen, setCodeGen] = useState(0);
  const [verifyCode, setVerifyCode] = useState(0);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    setCodeGen(Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000);
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      repeatPassword === ""
    ) {
      alert("Please fill all field");
      return;
    }

    if (password !== repeatPassword) {
      alert("Password not match");
      return;
    } else {
      setLoading(true);
      setPopup(true);
      axios
        .post("https://api.emailjs.com/api/v1.0/email/send", {
          service_id: "service_ipal5uv",
          template_id: "template_mncz61j",
          user_id: "nrvFQXX36KomD3QCe",
          template_params: {
            reply_to: email,
            from_name: "Akatsuki Store",
            to_name: email,
            message: codeGen,
          },
        })
        .then((res) => {
          setLoading(false);
          setPopup(true);
        });
    }
  }
  function handleVerify() {
    console.log(verifyCode);
    console.log(codeGen);
    if (Number(verifyCode) === Number(codeGen)) {
      setPopup(false);
      CreateUser(email, password, username, (res) => {
        console.log(res);
        if (res === 201) {
          alert("Đăng ký thành công");
          window.location.href = "/login";
        } else {
          alert("Email đã tồn tại");
        }
      });
    } else {
      alert("Sai mã xác nhận");
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto  mt-5">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-3 fw-light fs-8">
                Sign Up
              </h5>
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="form-floating mb-3">
                  <label for="username">User name</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <div className="form-floating mb-3">
                  <label for="email">Email address</label>
                  <input
                    required
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="form-floating mb-3">
                  <label for="password">Password</label>
                  <input
                    required
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="form-floating mb-3">
                  <label for="repeatpassword">Repeat Password</label>
                  <input
                    required
                    type="password"
                    className="form-control"
                    id="repeatpassword"
                    placeholder="Repeat Password"
                    onChange={(e) => {
                      setRepeatPassword(e.target.value);
                    }}
                  />
                </div>
                {popup ? (
                  <div className="popup">
                    <div className="row popup-title">
                      <div className="row col-md-12">
                        {loading ? (
                          <i
                            className="fa-solid fa-spinner fa-spin"
                            style={{ fontSize: "4vw", color: "black" }}
                          ></i>
                        ) : (
                          <div className="row col-md-12 d-flex  flex-column">
                            <label htmlFor="code">Nhập mã xác nhận:</label>
                            <p className="text-muted fw-light">
                              Mã xác nhận sẽ được gửi tới tài khoản email:{" "}
                              {email}
                            </p>
                            <input
                              type="number"
                              className="col-md-4 mt-2"
                              id="code"
                              placeholder="xxxxxx"
                              onChange={(e) => {
                                setVerifyCode(e.target.value);
                              }}
                            />
                            <p className="text-muted fw-light mt-2">
                              Không nhận được mã?  Kiểm tra lại tài khoản email :<strong
                                onClick={() => {setPopup(false)}}
                                style={{ cursor: "pointer" }}
                              >Tại đây</strong>
                            </p>
                            <div>
                              <div className="col-md-6 d-flex justify-content-around mt-2">
                                <button
                                  className="btn btn-outline-dark"
                                  type="button"
                                  onClick={() => {
                                    setPopup(false);
                                  }}
                                >
                                  Hủy
                                </button>
                                <button
                                  className="btn btn-dark"
                                  type="button"
                                  onClick={handleVerify}
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-secondary btn-login text-uppercase fw-bold"
                    type="submit"
                  >
                    SignUp
                  </button>
                  <Link to="/login">
                    <button
                      className="btn btn-light btn-login text-uppercase fw-bold"
                      type="button"
                    >
                      Sign In
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
