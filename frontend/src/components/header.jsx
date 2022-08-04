/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import userContext from "../context/usercontext";

let loged = Cookies.get("email");

const host = "http://localhost:1505";

export default function Header() {
  const [popup, setPopup] = useState(false);
  const [user, setUser] = useState([]);
  const UserContext = useContext(userContext);

  useEffect(() => {
    if (loged) {
      axios.get(host + "/user/" + loged).then((res) => {
        setUser(res.data);
      });
    }
  }, []);

  useEffect(() => {
    if (loged) {
      axios.get(host + "/wishlist/byuser/" + loged).then((res) => {
        UserContext.setUserWishlist(res.data);
      });
    }
  }, [UserContext.clickBtn]);

  useEffect(() => {
    if (loged) {
      axios.get(host + "/order/byuser/" + loged).then((res) => {
        UserContext.setUserCart(
          res.data.filter((cart) => cart.status === "pending")
        );
      });
    }
  }, [UserContext.clickBtn]);

  function scrollTo(className) {
    document.getElementsByClassName(className)[0].scrollIntoView({
      alignToTop: true,
      behavior: "smooth",
    });
  }
  return (
    <React.Fragment>
      <div className="header desktop">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/vitamim/image/upload/v1659424151/vitamim/logo_gdq3rd.png"
            className="header__logo"
            id="header__logo"
            alt="logo"
          />
        </Link>
        <Link to="/">
          <div className="header__name__overlay">
            <img className="header__name" src="src/store.png" alt="" />
          </div>
        </Link>

        <div className="header__function">
          <div className="header__function__item hover_underline">
            <Link to="/" onClick={() => scrollTo("title__advertisement")}>
              HOME
            </Link>
            <div className="underline"></div>
          </div>
          <div className="header__function__item hover_underline">
            <Link to="/" onClick={() => scrollTo("newProduct__title")}>
              NEW PRODUCT
            </Link>
            <div className="underline"></div>
          </div>
          <div className="header__function__item hover_underline">
            <Link to="/" onClick={() => scrollTo("specialItem")}>
              SPECIAL
            </Link>
            <div className="underline"></div>
          </div>
          <div className="header__function__item hover_underline">
            <Link to="/" onClick={() => scrollTo("discount")}>
              DISCOUNT
            </Link>
            <div className="underline"></div>
          </div>
          <div className="header__function__item hover_underline">
            <Link to="/" onClick={() => scrollTo("footer")}>
              CONTACT
            </Link>
            <div className="underline"></div>
          </div>
        </div>
        <div className="header__user d-flex align-items-center">
          {user.length > 0 ? (
            <>
              <Link to="/user">
                <div
                  style={{
                    width: "3.5vw",
                    height: "3.5vw",
                    backgroundImage: "url(" + user[0].avatar + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "50%",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </Link>
              <Link to="/cart">
                <i className="fa-solid fa-cart-shopping fa-2x header__user__item">
                  <strong
                    style={{
                      color: "black",
                      fontSize: "1.2vw",
                      fontWeight: "bold",
                      position: "absolute",
                      marginTop: "-0.9vw",
                      marginLeft: "1.4vw",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      width: "1.5vw",
                      height: "1.5vw",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {UserContext.userCart.length}
                  </strong>
                </i>
              </Link>
              <Link to="/wish-list">
                <i
                  className="fa-regular fa-heart fa-2x"
                  style={{ color: "#ff0000" }}
                >
                  <strong
                    style={{
                      color: "red",
                      fontSize: "1.2vw",
                      fontWeight: "bold",
                      position: "absolute",
                      marginTop: "-0.9vw",
                      marginLeft: "1.4vw",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      width: "1.5vw",
                      height: "1.5vw",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {UserContext.userWishlist.length}
                  </strong>
                </i>
              </Link>
            </>
          ) : (
            <ul className="nav d-flex align-items-end">
              <li className="nav-item">
                <a href="/login" className="nav-link p-0 text-muted btn-lg">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <div className="nav-link p-0 text-muted btn-lg">/</div>
              </li>
              <li className="nav-item">
                <a href="/signup" className="nav-link p-0 text-muted btn-lg">
                  Signup
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="mobile fixed-top">
        <nav className="navbar navbar-light bg-white">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/vitamim/image/upload/v1659424151/vitamim/logo_gdq3rd.png"
              className="header__logo"
              alt="logo"
            />
          </Link>
          <div className="header__name__overlay">
            <img className="header__name" src="src/store.png" alt="" />
          </div>
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => {
              setPopup(true);
            }}
          >
            <i className="fa-solid fa-bars" style={{ color: "#000000" }}></i>
          </button>

          <div
            className={
              popup ? "navbar__overlay navbar__active" : "navbar__overlay"
            }
          >
            <div
              className={
                popup
                  ? "navbar__overlay__list navbar__active"
                  : "navbar__overlay__list"
              }
            >
              <i
                onClick={() => {
                  setPopup(false);
                }}
                className="fa-solid fa-xmark rounded-circle border border-dark"
                style={{ color: "#000000" }}
              ></i>
              {user.length > 0 ? (
                <div className="navbar__icon">
                  <Link to="/user">
                    <div
                      style={{
                        width: "3.1vw",
                        height: "3.1vw",
                        backgroundImage: "url(" + user[0].avatar + ")",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        borderRadius: "50%",
                        backgroundRepeat: "no-repeat",
                        border: "0.6vw transparent solid",
                      }}
                    ></div>
                  </Link>
                  <Link to="/cart">
                    <i className="fa-solid fa-cart-shopping fa-2x header__user__item"></i>
                  </Link>
                  <Link to="/wish-list">
                    <i className="fa-regular fa-heart fa-2x header__user__item"></i>
                  </Link>
                </div>
              ) : (
                <div className="navbar__icon">
                  <a href="/login" className="nav-link p-0 text-muted btn-lg">
                    Login
                  </a>
                  <div className="nav-link p-0 text-muted btn-lg ml-1 mr-1">
                    /
                  </div>
                  <a href="/signup" className="nav-link p-0 text-muted btn-lg">
                    Signup
                  </a>
                </div>
              )}
              <hr className="my-4" />

              <div className="header__mobile">
                <img
                  src="https://res.cloudinary.com/vitamim/image/upload/v1659424151/vitamim/logo_gdq3rd.png"
                  className="header__logo"
                  id="header__logo"
                  alt="logo"
                />

                <img
                  className="header__name__mobile"
                  src="src/store.png"
                  alt=""
                />
              </div>

              <ul>
                <li
                  className="navbar__overlay__list__item"
                  onClick={() => {
                    setPopup(false);
                  }}
                >
                  <Link
                    onClick={() => scrollTo("title__advertisement")}
                    to="/"
                    className="navbar__overlay__list__item__link"
                  >
                    HOME
                  </Link>
                </li>
                <li
                  className="navbar__overlay__list__item"
                  onClick={() => {
                    setPopup(false);
                  }}
                >
                  <Link
                    onClick={() => scrollTo("newProduct__title")}
                    to="/"
                    className="navbar__overlay__list__item__link"
                  >
                    NEW PRODUCT
                  </Link>
                </li>
                <li
                  className="navbar__overlay__list__item"
                  onClick={() => {
                    setPopup(false);
                  }}
                >
                  <Link
                    onClick={() => scrollTo("specialItem")}
                    to="/"
                    className="navbar__overlay__list__item__link"
                  >
                    DISCOUNT
                  </Link>
                </li>
                <li
                  className="navbar__overlay__list__item"
                  onClick={() => {
                    setPopup(false);
                  }}
                >
                  <Link
                    onClick={() => scrollTo("discount")}
                    to="/"
                    className="navbar__overlay__list__item__link"
                  >
                    SPECIAL
                  </Link>
                </li>
                <li
                  className="navbar__overlay__list__item"
                  onClick={() => {
                    setPopup(false);
                  }}
                >
                  <Link
                    onClick={() => scrollTo("footer")}
                    to="/"
                    className="navbar__overlay__list__item__link"
                  >
                    CONTACT
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
}
