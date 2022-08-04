import { useEffect, useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState(0);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [codeGen, setCodeGen] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCodeGen(Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000);
  }, []);

  function handleSubmit(e, step) {
    e.preventDefault();
    if (step === 1) {
      axios
        .get(
          "http://localhost/api/customer/forgot_password.php?username=" + email
        )
        .then((res) => {
          setLoading(true);
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
              console.log(res.status);
              setStep(2);
            });
        })
        .catch((err) => {
          window.location.href = "/forgot-password";
          alert(`User with email ${email} does not exist`);
        });
    }
    if (step === 2) {
      if (Number(verifyCode) === Number(codeGen)) {
        setStep(3);
      } else {
        alert("Wrong code");
      }
    } else if (step === 3) {
      if (password === repeatPassword) {
        axios
          .put("http://localhost/api/customer/reset_password.php", {
            username: email,
            password: password,
          })
          .then((res) => {
            alert("Password changed");
            window.location.href = "/login";
          })
          .catch((err) => {
            alert(err.message);
          });
      } else {
        alert("Password not match");
      }
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto  mt-5">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-3 fw-light fs-5">
                Reset password
              </h5>
              {loading ? (
                <div className="card-title text-center fw-light fs-5">
                  <div className="lds-dual-ring"></div>
                </div>
              ) : step === 1 ? (
                <form
                  onSubmit={(e) => {
                    handleSubmit(e, step);
                  }}
                >
                  <div className="form-floating mb-3">
                    <label htmlFor="email">Enter your email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="name@example.com"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-secondary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Next
                    </button>
                  </div>
                </form>
              ) : step === 2 ? (
                <form
                  onSubmit={(e) => {
                    handleSubmit(e, step);
                  }}
                >
                  <div className="form-floating mb-3">
                    <label htmlFor="code">
                      Please enter the verification code
                    </label>
                    <p className="text-muted fw-light">
                      Your verification code will be sent by text message to{" "}
                      {email}
                    </p>
                    <input
                      type="number"
                      className="form-control"
                      id="code"
                      placeholder="xxxxxx"
                      onChange={(e) => {
                        setVerifyCode(e.target.value);
                      }}
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-secondary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Next
                    </button>
                  </div>
                </form>
              ) : (
                <form
                  onSubmit={(e) => {
                    handleSubmit(e, step);
                  }}
                >
                  <div className="form-floating mb-3">
                    <label htmlFor="password">Your new password</label>
                    <input
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
                    <label htmlFor="repeatpassword">
                      Repeat your new password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="repeatpassword"
                      placeholder="Repeat password"
                      onChange={(e) => {
                        setRepeatPassword(e.target.value);
                      }}
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-secondary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
