import Cookies from "js-cookie";
import { useState, useEffect, useContext } from "react";
import userContext from "../context/usercontext";
import axios from "axios";
import { Link } from "react-router-dom";
let loged = Cookies.get("email");

const host = "http://localhost:1505";
export default function Wishlist() {
  const UserContext = useContext(userContext);
  const [product, setProduct] = useState([]);
  const [size, setSize] = useState([]);

  const getProduct = (id) => {
    return new Promise((resolve, reject) => {
      axios.get(host + "/product/" + id).then((res) => {
        resolve(res.data[0]);
      });
    });
  };
  function getSize(id) {
    let link = "";
    link = size.find((item) => item.product_id === id).link_img;
    return link;
  }

  useEffect(() => {
    axios.get(host + "/wishlist/byuser/" + loged).then((res) => {
      UserContext.setUserWishlist(res.data);
    });
  }, [UserContext.clickBtn]);

  useEffect(() => {
    Promise.all(
      UserContext.userWishlist.map((item) => getProduct(item.product_id))
    ).then((res) => {
      setProduct(res);
    });
  }, [UserContext.clickBtn, UserContext.userWishlist]);

  useEffect(() => {
    axios.get(host + "/size").then((res) => {
      setSize(res.data);
    });
  }, []);
  function handleWishListAction(product) {
    if (loged) {
      axios.delete(host + "/wishlist/" + product.id).then(() => {
        UserContext.setClickBtn(!UserContext.clickBtn);
      });
    } else {
      alert("Bạn cần đăng nhập để thực hiện chức năng này");
    }
  }
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    Index
                  </th>
                  <th scope="col" className="text-center">
                    Product
                  </th>
                  <th scope="col" className="text-center">
                    Price
                  </th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {product.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row" className="text-center">
                        <p
                          className="d-flex align-items-center justify-content-center mb-0"
                          style={{ height: "70px" }}
                        >
                          {index + 1}
                        </p>
                      </th>
                      <th scope="row" className="d-flex align-items-center">
                        <div
                          style={{
                            width: "15vw",
                          }}
                        >
                          <img
                            style={{ height: "70px" }}
                            src={getSize(item.id)}
                            alt=""
                          />
                        </div>
                        <strong
                          style={{
                            width: "60%",
                            marginLeft: "10px",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.name}
                        </strong>
                      </th>
                      <th scope="row" className="text-center">
                        {item.price}
                      </th>
                      <th scope="row" className="text-center">
                        <Link to={`/itemdetail/${item.id}`}>
                          <p className="badge badge-dark mr-2">View detail</p>
                        </Link>
                        <p
                          className="badge badge-danger"
                          onClick={() => {
                            handleWishListAction(item);
                          }}
                        >
                          Remove
                        </p>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
