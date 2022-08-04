import CartContext from "./cartcontext";
import { useState } from "react";

export default function CartState({ children }) {
    const [CartOption, setCartOption] = useState("giohang");
    const [billOption, setBillOption] = useState("tất cả");
  return (
    <CartContext.Provider
        value={{
            CartOption,
            billOption,
            setCartOption,
            setBillOption,
        }}
        >
        {children}
    </CartContext.Provider>
  );
}