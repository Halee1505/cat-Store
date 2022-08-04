import { useState, useEffect, useContext } from "react";
import userContext from "../context/usercontext";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Money from "./moneyformat";

const loged = Cookies.get("email");

const host = "http://localhost:1505";

function isInWishlist(wishlist, id) {
  return wishlist.find((item) => item.product_id === id);
}
export default function ShowClothes({ product }) {
  const location = useLocation();
  console.log();
  const UserContext = useContext(userContext);
  const [classify, setClassify] = useState([]);

  useEffect(() => {
    axios.get(host + "/size/" + product.id).then((res) => {
      setClassify(res.data);
    });
  }, [product]);
  useEffect(() => {
    axios.get(host + "/wishlist/byuser/" + loged).then((res) => {
      UserContext.setUserWishlist(res.data);
    });
  }, [UserContext.clickBtn]);

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

  return (
    <div className="card flex-column card-preview mb-4">
      {classify.length !== 0 ? (
        <Link
          to={
            location.pathname.includes("admin")
              ? `/admin/update-clothes/${product.id}`
              : `/itemdetail/${product.id}`
          }
        >
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            style={{ width: "100%", marginLeft: "0px", marginTop: "0px" }}
            data-ride="carousel"
          >
            <div className="carousel-inner">
              {classify.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={
                      index === 0 ? "carousel-item active" : "carousel-item"
                    }
                  >
                    <div
                      style={{
                        height: "20vw",
                        width: "17vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        className="bg-secondary mt-2 preview-img"
                        src={item.link_img}
                        style={{
                          height: "100%",
                        }}
                        alt="First slide"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Link>
      ) : (
        ""
      )}

      <div className="card-body pre">
        <Link
          to={
            location.pathname.includes("admin")
              ? `/admin/update-clothes/${product.id}`
              : `/itemdetail/${product.id}`
          }
        >
          <h5
            className="card-title"
            style={{
              fontSize: "1.2rem",
              whiteSpace: "nowrap",
              width: "100%",
              textOverflow: "ellipsis",
              overflow: "hidden",
              color: "black",
            }}
          >
            Tên: {product.name}
          </h5>
        </Link>
        <div className="d-flex justify-content-between align-items-center">
          <p className="card-text m-0">
            Đơn giá:{" "}
            {product.price === "" ? 0 : <Money value={product.price} />}
          </p>
          {isInWishlist(UserContext.userWishlist, product.id) ? (
            <i
              className="fa-solid fa-heart"
              onClick={() => {
                handleWishListAction(product);
              }}
            ></i>
          ) : (
            <i
              className="fa-regular fa-heart"
              onClick={() => {
                handleWishListAction(product);
              }}
            ></i>
          )}
        </div>
      </div>
    </div>
  );
}
