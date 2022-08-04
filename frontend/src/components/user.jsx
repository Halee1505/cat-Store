import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";

let loged = Cookies.get("email");
const host = "http://localhost:1505";
const styleInput = {
  width: "0.1px",
  height: "0.1px",
  opacity: "0",
  overflow: "hidden",
  position: "absolute",
  zIndex: "-1",
};

function SignOut() {
  Cookies.remove("email");
  window.location.href = "/login";
}

export default function User() {
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [updateAvatar, setUpdateAvatar] = useState(null);

  const [street, setStreet] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    axios.get(host + "/user/" + loged).then((res) => {
      setUser(res.data[0]);
    });
  }, [update]);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setAddress(user.address);
    setAvatar(user.avatar);
  }, [user]);

  useEffect(() => {
    if (address) {
      setStreet(address.split("-")[0]);
      setDistrict(address.split("-")[1]);
      setCity(address.split("-")[2]);
    }
  }, [address]);

  const Upload = (UploadImg) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", UploadImg);
      formData.append("upload_preset", "vitamim");
      axios
        .post("https://api.cloudinary.com/v1_1/vitamim/image/upload", formData)
        .then((res) => {
          setLoading(false);
          resolve(res.data.url);
        });
    });
  };
  const onDrop = (files) => {
    if (files) {
      setAvatar((avatar) => URL.createObjectURL(files));
      setUpdateAvatar((avatar) => files);
    }
  };

  function UpdateUser() {
    if (updateAvatar) {
      Upload(updateAvatar).then((res) => {
        setAvatar(res);
        const newUser = {
          name: name,
          avatar: res,
          phone: phone,
          address: street + "-" + district + "-" + city,
        };
        console.log(newUser);
        axios.put(host + "/user/" + loged, newUser).then((res) => {
          alert("Cập nhật thành công");
          setUpdate(!update);
        });
      });
    } else {
      const newUser = {
        name: name,
        avatar: avatar,
        phone: phone,
        address: street + "-" + district + "-" + city,
      };
      console.log(newUser);
      axios.put(host + "/user/" + loged, newUser).then((res) => {
        alert("Cập nhật thành công");
        setUpdate(!update);
      });
    }
  }

  return (
    <div className="container-fluid">
      {loading ? <i className="fa-solid fa-spinner fa-spin uploading"></i> : ""}
      {Object.keys(user).length !== 0 ? (
        <div className="container">
          <div className="row d-flex justify-content-between mb-2 mt-2 align-items-center">
            <div className="card card-body col-md-4" style={{ width: "8rem" }}>
              <Dropzone onDrop={(acceptedFiles) => onDrop(acceptedFiles[0])}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div
                      className="card-img-top img-border mb-4"
                      style={{
                        backgroundImage: "url(" + avatar + ")",
                      }}
                      {...getRootProps()}
                    >
                      <input
                        style={styleInput}
                        type="file"
                        id="avt"
                        {...getInputProps()}
                      />

                      <i className="fa-solid fa-upload upload"></i>
                    </div>
                  </section>
                )}
              </Dropzone>
              <hr className="my-4" />
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  SignOut();
                }}
              >
                Sign Out
              </button>
            </div>
            <div className=" card card-body col-md-7 mt-4 mb-4">
              <h5 className="card-title">My profile</h5>
              <p className="card-title">
                Manage profile information for account security
              </p>

              <form>
                <div className="form-group row">
                  <label htmlFor="username" className="col-sm-4 col-form-label">
                    Email:{" "}
                  </label>
                  <div className="col-sm-8 col-form-label">{email}</div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputEmail"
                    className="col-sm-4 col-form-label"
                  >
                    User name:{" "}
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control-plaintext"
                      onChange={(e) => setName(e.target.value)}
                      id="inputEmail"
                      defaultValue={name}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputphonenumber"
                    className="col-sm-4 col-form-label"
                  >
                    Phone number:{" "}
                  </label>
                  <div className="col-sm-8 col-form-label">
                    <input
                      type="number"
                      className="form-control-plaintext"
                      onChange={(e) => setPhone(e.target.value)}
                      id="inputphonenumber"
                      defaultValue={phone}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="inputgender"
                    className="col-sm-4 col-form-label"
                  >
                    Address:{" "}
                  </label>
                  <div className="col-sm-8 col-form-label">
                    <label htmlFor="street">Street: </label>
                    <input
                      type="text"
                      className="form-control-plaintext border border-info mb-3 rounded"
                      id="street"
                      onChange={(e) => setStreet(e.target.value)}
                      defaultValue={street}
                    />
                    <label htmlFor="district">District: </label>
                    <input
                      type="text"
                      className="form-control-plaintext border border-info mb-3 rounded"
                      id="district"
                      onChange={(e) => setDistrict(e.target.value)}
                      defaultValue={district}
                    />
                    <label htmlFor="city">City: </label>
                    <input
                      type="text"
                      className="form-control-plaintext border border-info mb-3 rounded"
                      id="city"
                      onChange={(e) => setCity(e.target.value)}
                      defaultValue={city}
                    />
                  </div>
                </div>
                <div className="form-group row justify-content-end col-md-12">
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() => {
                      UpdateUser();
                    }}
                  >
                    Save
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
