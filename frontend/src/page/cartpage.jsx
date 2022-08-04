import Header from "../components/header";
import Cart from "../components/cart";
import Bill from "../components/bill";
import CartOption from "../components/cartoption";
import CartFooter from "../components/cartfooter";
import React from "react";
import { useContext, useState } from "react";
import CartContext from "../context/cartcontext";
export default function CartPage() {
  const CartState = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState([]);
  return (
    <React.Fragment>
      <Header />
      <div className="container title">
        <div className="row">
          <div className="col-md-2 px-0">
            <CartOption />
          </div>
          <div className="col-md-10 px-0">
            {CartState.CartOption === "donmua" ? (
              <Bill />
            ) : CartState.CartOption === "giohang" ? (
              <Cart onChangeTotal={setTotalPrice} />
            ) : null}
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 px-0"></div>
          <div className="col-md-10 px-0 ">
            {CartState.CartOption === "giohang" ? (
              <CartFooter totalPrice={totalPrice} />
            ) : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
