/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import userContext from "../context/usercontext";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Money from "./moneyformat";

let loged = Cookies.get("email");

const host = "http://localhost:1505";

function getCatalogName(catalog, id) {
  return catalog.find((item) => item.id === id);
}

function isInWishlist(wishlist, id) {
  return wishlist.find((item) => item.product_id === id);
}

export default function ItemDetail() {
  const UserContext = useContext(userContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(host + "/user/" + loged).then((res) => {
      setUser(res.data[0]);
    });
  }, []);

  useEffect(() => {
    axios.get(host + "/order/byuser/" + Number(loged)).then((res) => {
      UserContext.setUserCart(
        res.data.filter((cart) => cart.status === "pending")
      );
    });
  }, [UserContext.clickBtn]);

  // get clothes
  const [Clothes, setClothes] = useState([]);
  const [classify, setClassify] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const clothes_id = useLocation().pathname.split("/")[2];
  useEffect(() => {
    axios.get(host + "/product/" + clothes_id).then((res) => {
      setClothes(res.data);
    });
  }, [clothes_id]);
  useEffect(() => {
    axios.get(host + "/size/" + clothes_id).then((res) => {
      setClassify(res.data);
    });
  }, [clothes_id]);
  useEffect(() => {
    axios.get(host + "/catalog").then((res) => {
      setCatalog(res.data);
    });
  }, []);

  // caculate
  const [count, setCount] = useState(1);
  const [classifyCount, setClassifyCount] = useState(0);

  function handleWishListAction(product) {
    if (loged) {
      if (!isInWishlist(UserContext.userWishlist, product.id)) {
        axios
          .post(host + "/wishlist", {
            user_id: loged,
            product_id: product.id,
          })
          .then(() => {
            UserContext.setClickBtn(!UserContext.clickBtn);
          });
      } else {
        axios.delete(host + "/wishlist/" + product.id).then(() => {
          UserContext.setClickBtn(!UserContext.clickBtn);
        });
      }
    } else {
      alert("Bạn cần đăng nhập để thực hiện chức năng này");
    }
  }

  function addToCart(product) {
    if (loged) {
      const order = UserContext.userCart.find(
        (item) =>
          item.product_id === product.id &&
          item.classify_id === classify[classifyCount].id &&
          item.transaction_id === null
      );
      console.log(order);
      if (order) {
        axios
          .put(host + "/order/update-count/" + order.id, {
            qty: count + order.qty,
            amount: (count + order.qty) * product.price,
          })
          .then(() => {
            UserContext.setClickBtn(!UserContext.clickBtn);
            alert("Cập nhật giỏ hàng thành công");
          });
      } else {
        axios
          .post(host + "/order", {
            user_id: user.id,
            product_id: product.id,
            classify_id: classify[classifyCount].id,
            qty: count,
            amount: product.price * count,
            transaction_id: null,
            status: "pending",
          })
          .then(() => {
            UserContext.setClickBtn(!UserContext.clickBtn);
            alert("Thêm vào giỏ hàng thành công");
          });
      }
    } else {
      alert("Bạn cần đăng nhập để thực hiện chức năng này");
    }
  }

  return (
    <div className="container-fluid">
      <div className="container">
        {Clothes.map((item, index) => {
          return (
            <div
              key={index}
              className="row d-flex justify-content-between mb-2 mt-2 align-items-center"
            >
              <div className="detail__wrap">
                <div className="card card-body img-card">
                  <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    style={{
                      width: "100%",
                      marginLeft: "0px",
                      marginTop: "0px",
                    }}
                    data-ride="carousel"
                  >
                    <div className="carousel-inner">
                      {classify.map((img, index) => {
                        return (
                          <div
                            key={index}
                            className={
                              index === 0
                                ? "carousel-item active"
                                : "carousel-item"
                            }
                          >
                            <div
                              style={{
                                height: "100%",
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <img
                                className="mt-2 preview-img"
                                src={img.link_img}
                                alt="First slide"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className=" card card-body detail-card">
                  <h5 className="card-title">{item.name.toUpperCase()}</h5>
                  <div className="card-price">
                    <p>Giá: </p>
                    <p>
                      <Money value={item.price} />
                    </p>
                  </div>

                  <p className="card-text">
                    Type:{" "}
                    {typeof getCatalogName(catalog, item.catalog_id) ===
                    "object"
                      ? getCatalogName(catalog, item.catalog_id).name
                      : ""}
                  </p>
                  <p className="card-text">Gender: {item.gender}</p>
                  <div>
                    <div className="form-group row mt-2 mb-2 color">
                      <label
                        htmlFor="username"
                        className="col-sm-4 col-form-label"
                      >
                        <p className="tag">Color: </p>
                      </label>
                      <ol
                        className="carousel-indicators"
                        style={{
                          position: "unset",
                          margin: "0px",
                        }}
                      >
                        {classify.map((color, index) => {
                          return (
                            <button
                              key={index}
                              type="button"
                              data-target="#carouselExampleIndicators"
                              data-slide-to={index}
                              style={{
                                height: "2vw",
                                width: "2vw",
                                backgroundColor: color.color,
                                marginRight: "15px",
                              }}
                              className={
                                index === 0
                                  ? "active btn btn-dark"
                                  : "btn btn-dark"
                              }
                            ></button>
                          );
                        })}
                      </ol>
                    </div>
                    <div className="form-group row color">
                      <label
                        htmlFor="username"
                        className="col-sm-3 col-form-label"
                      >
                        <p className="tag">Size: </p>
                      </label>
                      {classify.length !== 0 ? (
                        <div className="row d-flex justify-content-between">
                          {classify.map((i, index) => {
                            return (
                              <button
                                key={index}
                                className="btn mr-2"
                                onClick={() => {
                                  setClassifyCount(index);
                                  setCount(
                                    count <= classify[index].count ? count : 1
                                  );
                                }}
                              >
                                {i.size}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="row d-flex justify-content-between"></div>
                      )}
                    </div>
                    <div className="form-group row color">
                      <label
                        htmlFor="quantity"
                        className="col-sm-6 col-form-label"
                      >
                        <p className="tag">
                          Có sẵn:{" "}
                          {typeof classify[classifyCount] === "object"
                            ? classify[classifyCount].count
                            : 0}{" "}
                        </p>
                      </label>
                      <div className="col-sm-6"></div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="count" className="col-4 col-form-label">
                        <p className="tag">Số lượng: </p>
                      </label>
                      <div className="col-7 col-form-label row">
                        <button
                          className="btn col-2"
                          onClick={() => {
                            setCount((count) =>
                              count > 1 ? count - 1 : count
                            );
                          }}
                        >
                          -
                        </button>
                        <button
                          className="btn col-3 btn-outline-dark ml-2 mr-2 disable"
                          disabled
                        >
                          {count}
                        </button>
                        <button
                          className="btn col-2"
                          onClick={() => {
                            setCount((count) =>
                              count < Number(classify[classifyCount].count)
                                ? count + 1
                                : count
                            );
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="form-group row justify-content-end col-md-12 button-group">
                      {isInWishlist(UserContext.userWishlist, item.id) ? (
                        <button
                          type="button"
                          className="btn btn-outline-dark"
                          onClick={() => {
                            handleWishListAction(item);
                          }}
                        >
                          Remove from wishlist
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-outline-dark ml-3"
                          onClick={() => {
                            handleWishListAction(item);
                          }}
                        >
                          <div className="button-mod">
                            <p>Add to wishlist</p>
                            <i className="fa-regular fa-heart cart-icon__item"></i>
                          </div>
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn btn-dark mr-4"
                        onClick={() => {
                          addToCart(item);
                        }}
                      >
                        <div className="button-mod">
                          <p>Add to cart</p>
                          <i className="fa-solid fa-cart-shopping cart-icon__item"></i>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <table className="table container-fluid">
                <thead>
                  <tr>
                    <th scope="col" className="text-left btn-lg col-1"></th>
                    <th scope="col" className="text-left btn-lg col-6">
                      Mô Tả
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={2}>
                      <div className="card card-body col-md-12 mt-4 mb-4">
                        <h5 className="card-title">
                          Tên sản phẩm: {item.name}
                        </h5>
                        <p>{item.description}</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}
