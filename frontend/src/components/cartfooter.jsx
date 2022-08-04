/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Money from "./moneyformat";
import UserContext from "../context/usercontext";

export default function CartFooter({ totalPrice }) {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(totalPrice.reduce((total, cart) => cart.amount + total, 0));
  }, [totalPrice]);

  const handleCheckout = () => {
    if (totalPrice.length === 0) {
      alert("vui lòng chọn sản phẩm để thanh toán");
    } else {
      context.setTransactionOrder(totalPrice);
      navigate("/transaction");
    }
  };

  return (
    <div className="container cart__footer">
      <h3>
        Tổng đơn: <Money value={price} />
      </h3>
      <button className="btn btn-dark" onClick={handleCheckout}>
        Thanh toán
      </button>
    </div>
  );
}
