import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import PreviewClothes from "../../admincomponents/previewclothes";

function sort(arr) {
  return arr.sort((a, b) => {
    return a.id - b.id;
  });
}
const host = "http://localhost:1505";
export default function UpdateClothesPage() {
  const navigate = useNavigate();
  const product_id = useLocation().pathname.split("/")[3];
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(false);

  const [classify, setClassify] = useState([]);
  const [curClassify, setCurClassify] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    catalog_id: 0,
    gender: "",
    description: "",
  });

  useEffect(() => {
    axios.get(host + "/catalog").then((res) => {
      setCatalog(sort(res.data));
      handleSetProduct("catalog_id", res.data[0].id);
    });
  }, []);

  useEffect(() => {
    if (product.name === "") {
      axios.get(host + "/product/" + product_id).then((res) => {
        setProduct(res.data[0]);
      });
      axios.get(host + "/size/" + product_id).then((res) => {
        setClassify(res.data);
        setCurClassify(res.data);
      });
    }
  }, [product_id, product]);

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

  function handleSetProduct(type, value) {
    setProduct({ ...product, [type]: value });
  }

  function handleSetClassify(index, type, value) {
    const newClassify = [...classify];
    newClassify[index][type] = value;
    setClassify(newClassify);
  }

  function uploadClassify(classify) {
    return new Promise((resolve, reject) => {
      axios
        .post(host + "/size", classify)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function deleteClassify(classify) {
    return new Promise((resolve, reject) => {
      axios
        .delete(host + "/size/" + classify.id)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function updateClassify(classify) {
    return new Promise((resolve, reject) => {
      axios
        .put(host + "/size/" + classify.id, classify)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function handleAddNewProduct() {
    const newClassify = classify.filter((item) => !item.id);
    const commonClassify = classify.filter((item) => item.id);
    const delClassify = curClassify.filter(
      (item) => !commonClassify.includes(item)
    );

    if (newClassify.length > 0) {
      newClassify.map((item) => {
        if (item.link_img === "") {
          alert("Vui lòng chọn ảnh cho phân loại " + item.size);
          return;
        }
      });
    }

    setLoading(true);

    axios.put(host + "/product/" + product_id, product).then(() => {
      if (newClassify.length > 0) {
        Promise.all(delClassify.map((item) => deleteClassify(item))).then(
          () => {
            Promise.all(newClassify.map((item) => Upload(item.link_img))).then(
              (newRes) => {
                new Promise((resolve, reject) => {
                  const returnClassify = newClassify.map((item, index) => {
                    item["product_id"] = product_id;
                    item["link_img"] = newRes[index];
                    return item;
                  });
                  resolve(returnClassify);
                }).then((returnClassify) => {
                  Promise.all(
                    returnClassify.map((item) => uploadClassify(item))
                  ).then(() => {
                    Promise.all(
                      commonClassify.map((item) => updateClassify(item))
                    ).then(() => {
                      setLoading(false);
                      navigate("/admin/manage-clothes");
                    });
                  });
                });
              }
            );
          }
        );
      } else {
        if (delClassify.length > 0) {
          Promise.all(delClassify.map((item) => deleteClassify(item))).then(
            () => {
              Promise.all(
                commonClassify.map((item) => updateClassify(item))
              ).then(() => {
                setLoading(false);
                navigate("/admin/manage-clothes");
              });
            }
          );
        } else {
          Promise.all(commonClassify.map((item) => updateClassify(item))).then(
            () => {
              setLoading(false);
              navigate("/admin/manage-clothes");
            }
          );
        }
      }
    });
  }

  return (
    <div className="userpage container-fluid bg-white">
      {loading ? <i className="fa-solid fa-spinner fa-spin uploading"></i> : ""}
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center px-0">
            <h1>Chi tiết sản phẩm</h1>
            <hr className="my-3" />
          </div>
          <div className="col-md-8 px-0">
            <div className="row">
              <div className="col-md-12 px-0">
                <div>
                  <div className="form-group">
                    <label htmlFor="inputname">Tên: </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="inputname"
                      defaultValue={product.name}
                      onChange={(e) => {
                        handleSetProduct("name", e.target.value);
                      }}
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputprice">Đơn giá: </label>
                    <input
                      type="number"
                      value={product.price}
                      className="form-control"
                      onChange={(e) =>
                        handleSetProduct("price", e.target.value)
                      }
                      name="price"
                      id="inputprice"
                      min={0}
                      placeholder="Enter price"
                    />
                  </div>
                  <div className="form-group">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="type">
                          Danh mục
                        </label>
                      </div>
                      <select
                        className="custom-select"
                        name="type"
                        value={product.catalog_id}
                        id="type"
                        onChange={(e) =>
                          handleSetProduct("catalog_id", e.target.value)
                        }
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
                          Giới tính
                        </label>
                      </div>
                      <select
                        className="custom-select"
                        name="gender"
                        id="gender"
                        onChange={(e) => {
                          handleSetProduct("gender", e.target.value);
                        }}
                        value={product.gender}
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
                      Phân loại:{" "}
                    </label>
                    <br />
                    <table className="table">
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
                                defaultValue={classify[index].size}
                                onChange={(e) => {
                                  handleSetClassify(
                                    index,
                                    "size",
                                    e.target.value
                                  );
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
                                defaultValue={classify[index].color}
                                onChange={(e) => {
                                  handleSetClassify(
                                    index,
                                    "color",
                                    e.target.value
                                  );
                                }}
                                className="form-control mr-sm-2 bg-white"
                              />
                            </td>
                            <td>
                              <label
                                htmlFor={`image${index}`}
                                className="btn btn-outline-secondary btn-sm"
                                style={{
                                  width: "max-content",
                                  height: "40px",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                Thêm ảnh
                              </label>
                              <input
                                type="file"
                                id={`image${index}`}
                                style={{
                                  display: "none",
                                }}
                                className="form-control mr-sm-2 bg-white"
                                onChange={(e) => {
                                  handleSetClassify(
                                    index,
                                    "link_img",
                                    e.target.files[0]
                                  );
                                }}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control mr-sm-2 bg-white"
                                defaultValue={classify[index].count}
                                style={{
                                  width: "80px",
                                }}
                                onChange={(e) => {
                                  handleSetClassify(
                                    index,
                                    "count",
                                    e.target.value
                                  );
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
                            color: "#000000",
                            link_img: "",
                            count: 0,
                          },
                        ]);
                      }}
                    >
                      Thêm
                    </button>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputdescription">Mô tả: </label>
                    <textarea
                      className="form-control"
                      onChange={(e) =>
                        handleSetProduct("description", e.target.value)
                      }
                      id="inputdescription"
                      name="description"
                      rows="3"
                      placeholder="Enter description"
                      value={product.description}
                    ></textarea>
                  </div>
                  <div className="form-group d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-danger mr-3"
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      Xóa
                    </button>
                    <button
                      type="button"
                      className="btn btn-dark ml-3"
                      onClick={handleAddNewProduct}
                    >
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 px-0">
            <PreviewClothes product={product} previewClassify={classify} />
          </div>
        </div>
      </div>
    </div>
  );
}
