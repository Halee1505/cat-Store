import PreviewClothes from "./previewclothes";
import Classify from "./classify";
import { useContext, useState, useEffect } from "react";
import React from "react";
import AddClothesContext from "../context/addclothescontext";
import axios from "axios";

function sort(arr) {
  return arr.sort((a, b) => {
    return a.id - b.id;
  });
}

export default function AddClothes() {
  const AddClothes = useContext(AddClothesContext);
  const [classify, setClassify] = useState([]);
  const [loading, setLoading] = useState(false);

  const [catalog, setCatalog] = useState([]);

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
  function onAddClotheshandler() {
    let newUrl = [...AddClothes.size.map((item) => item.updateImg)];
    Promise.all(newUrl.map((item) => Upload(item))).then((res) => {
      AddClothes.setSize(
        AddClothes.size.map((item, index) => {
          item.updateImg = res[index];
          return item;
        })
      );
      const clothes = {
        name: AddClothes.name,
        price: AddClothes.price,
        type: AddClothes.type,
        gender: AddClothes.gender,
        color: JSON.stringify(AddClothes.size),
        description: AddClothes.description,
      };
      axios
        .post("http://localhost/api/clothes/create.php", clothes)
        .then((res) => {
          window.location.href = "/admin/manage-clothes";
        });
    });
  }

  useEffect(() => {
    axios.get("http://localhost:1505/catalog").then((res) => {
      setCatalog(sort(res.data));
    });
  }, []);
  console.log(classify);

  return (
    <div className="userpage container-fluid bg-white">
      {loading ? <i className="fa-solid fa-spinner fa-spin uploading"></i> : ""}
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center px-0">
            <h1>Add Clothes</h1>
            <hr className="my-3" />
          </div>
          <div className="col-md-8 px-0">
            <div className="row">
              <div className="col-md-12 px-0">
                <div>
                  <div className="form-group">
                    <label htmlFor="inputname">Name: </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="inputname"
                      placeholder="Enter name"
                      onChange={(e) => {
                        AddClothes.setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputprice">Price: </label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      id="inputprice"
                      min={0}
                      placeholder="Enter price"
                      onChange={(e) => {
                        AddClothes.setPrice(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="type">
                          Type
                        </label>
                      </div>
                      <select
                        className="custom-select"
                        name="type"
                        id="type"
                        defaultValue=""
                        onChange={(e) => {
                          AddClothes.setType(e.target.value);
                        }}
                      >
                        {catalog.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="gender">
                          Gender
                        </label>
                      </div>
                      <select
                        className="custom-select"
                        name="gender"
                        id="gender"
                        defaultValue=""
                        onChange={(e) => {
                          AddClothes.setGender(e.target.value);
                        }}
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Unisex">Unisex</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="classify" className="mb-1">
                      Classify:{" "}
                    </label>
                    <br />
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">STT</th>
                          <th scope="col">Kích thước</th>
                          <th scope="col">Màu sắc</th>
                          <th scope="col">Hình ảnh</th>
                          <th scope="col">Số lượng</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {classify.map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>
                              <input
                                type="text"
                                style={{
                                  width: "80px",
                                }}
                                className="form-control mr-sm-2 bg-white"
                              />
                            </td>
                            <td>
                              <input
                                type="color"
                                style={{
                                  width: "55px",
                                  height: "40px",
                                }}
                                className="form-control mr-sm-2 bg-white"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control mr-sm-2 bg-white"
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control mr-sm-2 bg-white"
                                style={{
                                  width: "80px",
                                }}
                              />
                            </td>
                            <td>
                              <i
                                className="fas fa-times col-md-3"
                                style={{
                                  color: "red",
                                  cursor: "pointer",
                                  fontSize: "1.2rem",
                                }}
                                onClick={() => {
                                  console.log(index);
                                  setClassify(
                                    classify.filter((i, id) => index !== id)
                                  );
                                }}
                              ></i>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button
                      type="button"
                      id="classify"
                      className="btn btn-outline-dark"
                      onClick={() => {
                        setClassify([
                          ...classify,
                          {
                            product_id: "",
                            size: "",
                            color: "",
                            link_img: "",
                            count: 0,
                          },
                        ]);
                      }}
                    >
                      More
                    </button>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputdescription">Description: </label>
                    <textarea
                      className="form-control"
                      id="inputdescription"
                      name="description"
                      rows="3"
                      onChange={(e) => {
                        AddClothes.setDescription(e.target.value);
                      }}
                      placeholder="Enter description"
                    ></textarea>
                  </div>
                  <div className="form-group d-flex justify-content-center">
                    <button type="button" className="btn btn-light mr-3">
                      Clear
                    </button>
                    <button
                      type="button"
                      className="btn btn-dark ml-3"
                      onClick={onAddClotheshandler}
                    >
                      Add Clothes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 px-0">
            <PreviewClothes />
          </div>
        </div>
      </div>
    </div>
  );
}
