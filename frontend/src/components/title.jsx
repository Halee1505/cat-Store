import { Link } from "react-router-dom";
import Rating from "react-rating";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ShowClothes from "../components/showclothes";
import Money from "./moneyformat";

const host = "http://localhost:1505";

export default function Title() {
  // get User
  const [advertisement, setAdvertisement] = useState([]);
  useEffect(() => {
    axios.get(host + "/advertisement").then((res) => {
      setAdvertisement(res.data);
    });
  }, []);

  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [preview3, setPreview3] = useState(null);
  const [preview4, setPreview4] = useState(null);
  const [preview5, setPreview5] = useState(null);
  const [discount, setDiscount] = useState(null);
  useEffect(() => {
    if (advertisement.length > 0) {
      setPreview1(advertisement[0].ad1);
      setPreview2(advertisement[0].ad2);
      setPreview3(advertisement[0].ad3);
      setPreview4(advertisement[0].ad4);
      setPreview5(advertisement[0].ad5);
      setDiscount(advertisement[0].discount);
    }
  }, [advertisement]);

  const [product, setProduct] = useState([]);
  const [size, setSize] = useState([]);
  useEffect(() => {
    axios.get(host + "/product?from=0&to=4").then((res) => {
      setProduct(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(host + "/size").then((res) => {
      setSize(res.data);
    });
  }, []);

  function getSize(id) {
    let link = "";
    link = size.find((item) => item.product_id === id).link_img;
    return link;
  }

  return (
    <div className="title">
      <div className="title__advertisement desktop">
        <div className="title__advertisement__left">
          <div
            className="title__advertisement__item"
            style={{ backgroundImage: "url(" + preview1 + ")" }}
          ></div>
        </div>
        <div className="title__advertisement__right">
          <div
            className="title__advertisement__items"
            style={{ backgroundImage: "url(" + preview2 + ")" }}
          ></div>
          <div
            className="title__advertisement__items"
            style={{ backgroundImage: "url(" + preview3 + ")" }}
          ></div>
          <div
            className="title__advertisement__items"
            style={{ backgroundImage: "url(" + preview4 + ")" }}
          ></div>
          <div
            className="title__advertisement__items"
            style={{ backgroundImage: "url(" + preview5 + ")" }}
          ></div>
        </div>
      </div>
      <div className="title__advertisement mobile">
        <div
          id="carouselExampleControls"
          className="carousel slide mt-0"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div
                className="title__advertisement__items"
                style={{
                  backgroundImage: "url(" + preview1 + ")",
                }}
              ></div>
            </div>
            <div className="carousel-item">
              <div
                className="title__advertisement__items"
                style={{
                  backgroundImage: "url(" + preview2 + ")",
                }}
              ></div>
            </div>
            <div className="carousel-item">
              <div
                className="title__advertisement__items"
                style={{
                  backgroundImage: "url(" + preview3 + ")",
                }}
              ></div>
            </div>
            <div className="carousel-item">
              <div
                className="title__advertisement__items"
                style={{
                  backgroundImage: "url(" + preview4 + ")",
                }}
              ></div>
            </div>
            <div className="carousel-item">
              <div
                className="title__advertisement__items"
                style={{
                  backgroundImage: "url(" + preview5 + ")",
                }}
              ></div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div id="newProduct" className="newProduct">
        <div className="newProduct__title">
          <div className="newProduct__title__left">
            <div className="header__logoText">NEW PRODUCT</div>
          </div>
          <div className="newProduct__title__right">
            <Link to="/items">
              <button type="button" className="btn btn-outline-dark">
                Xem tất cả
              </button>
            </Link>
          </div>
        </div>
        <div className="newProduct__content">
          {product.map((item, index) => (
            <div key={index} className="newProduct__element">
              {index !== 0 ? <hr className="mobile my-4" /> : ""}
              <ShowClothes key={index} product={item} />
            </div>
          ))}
        </div>
      </div>

      <div className="carousel" id="news"></div>
      <div className="specialItem" id="special">
        {["HOT TREND", "BEST SELLER", "FEATURE"].map((items, items_ind) => {
          return (
            <div className="special" key={items_ind}>
              <h3>{items}</h3>
              {items === "HOT TREND"
                ? product.slice(0, 3).map((item, item_ind) => {
                    return (
                      <Link
                        to={`/itemdetail/${item.id}`}
                        className="specialItem__items text-decoration-none"
                        key={item_ind}
                      >
                        <div
                          className="specialItem__item__img"
                          style={{
                            backgroundImage: `url('${getSize(item.id)}')`,
                            backgroundPosition: "center",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                          }}
                        ></div>
                        <div className="specialItem__Item">
                          <p className="specialItem__item__title">
                            {item.name}{" "}
                          </p>
                          <div className="specialItem__item__rate">
                            <Rating
                              fullSymbol={
                                <i
                                  className="fas fa-star"
                                  style={{ color: "#ffd724" }}
                                ></i>
                              }
                              emptySymbol={
                                <i
                                  className="fas fa-star"
                                  style={{ color: "#f1f1f1" }}
                                ></i>
                              }
                              fractions={10}
                              readonly
                              stop={5}
                              start={0}
                              step={1}
                              initialRating={5}
                            />
                          </div>
                          <strong className="specialItem__item__price">
                            <Money value={item.price} />
                          </strong>
                        </div>
                      </Link>
                    );
                  })
                : items === "BEST SELLER"
                ? product.slice(0, 3).map((item, item_ind) => {
                    return (
                      <Link
                        to={`/itemdetail/${item.id}`}
                        className="specialItem__items text-decoration-none"
                        key={item_ind}
                      >
                        <div
                          className="specialItem__item__img"
                          style={{
                            backgroundImage: `url('${getSize(item.id)}')`,
                            backgroundPosition: "center",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                          }}
                        ></div>
                        <div className="specialItem__Item">
                          <p className="specialItem__item__title">
                            {item.name}{" "}
                          </p>
                          <div className="specialItem__item__rate">
                            <Rating
                              fullSymbol={
                                <i
                                  className="fas fa-star"
                                  style={{ color: "#ffd724" }}
                                ></i>
                              }
                              emptySymbol={
                                <i
                                  className="fas fa-star"
                                  style={{ color: "#f1f1f1" }}
                                ></i>
                              }
                              fractions={10}
                              readonly
                              stop={5}
                              start={0}
                              step={1}
                              initialRating={5}
                            />
                          </div>
                          <strong className="specialItem__item__price">
                            <Money value={item.price} />
                          </strong>
                        </div>
                      </Link>
                    );
                  })
                : product.slice(0, 3).map((item, item_ind) => {
                    return (
                      <Link
                        to={`/itemdetail/${item.id}`}
                        className="specialItem__items text-decoration-none"
                        key={item_ind}
                      >
                        <div
                          className="specialItem__item__img"
                          style={{
                            backgroundImage: `url('${getSize(item.id)}')`,
                            backgroundPosition: "center",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                          }}
                        ></div>
                        <div className="specialItem__Item">
                          <p className="specialItem__item__title">
                            {item.name}{" "}
                          </p>
                          <div className="specialItem__item__rate">
                            <Rating
                              fullSymbol={
                                <i
                                  className="fas fa-star"
                                  style={{ color: "#ffd724" }}
                                ></i>
                              }
                              emptySymbol={
                                <i
                                  className="fas fa-star"
                                  style={{ color: "#f1f1f1" }}
                                ></i>
                              }
                              fractions={10}
                              readonly
                              stop={5}
                              start={0}
                              step={1}
                              initialRating={5}
                            />
                          </div>
                          <strong className="specialItem__item__price">
                            <Money value={item.price} />
                          </strong>
                        </div>
                      </Link>
                    );
                  })}
            </div>
          );
        })}
      </div>
      <div
        className="discount"
        id="discount"
        style={{ backgroundImage: "url(" + discount + ")" }}
      ></div>
      <div className="Guarantee" style={{ fontSize: "8px" }}>
        <div className="Guarantee__item">
          <i className="fa-solid fa-car fa-5x"></i>
          <div className="Guarantee__title">
            <h3>Free Shipping</h3>
            <p>Free shipping on all orders over $99</p>
          </div>
        </div>
        <div className="Guarantee__item">
          <i className="fa-solid fa-money-bill-1 fa-5x"></i>
          <div className="Guarantee__title">
            <h3>Money back guarantee</h3>
            <p>If good have Problems</p>
          </div>
        </div>
        <div className="Guarantee__item">
          <i className="fa-solid fa-circle-question fa-5x"></i>
          <div className="Guarantee__title">
            <h3>Online Support 24/7</h3>
            <p>Dedicated support</p>
          </div>
        </div>
        <div className="Guarantee__item">
          <i className="fa-solid fa-credit-card fa-5x"></i>
          <div className="Guarantee__title">
            <h3>Payment Secure</h3>
            <p>100% secure payment</p>
          </div>
        </div>
      </div>
      <div className="instagram">
        <div className="instagram__img img__1"></div>
        <div className="instagram__img img__2"></div>
        <div className="instagram__img img__3"></div>
        <div className="instagram__img img__4"></div>
        <div className="instagram__img img__5"></div>
        <div className="instagram__img img__6"></div>
      </div>
    </div>
  );
}
