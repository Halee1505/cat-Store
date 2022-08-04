import { useContext } from "react"
import CartContext from "../context/cartcontext"
export default function CartOption() {
    const CartState = useContext(CartContext);
    return (
        <div className="container-fluid px-0">
            <div className="container px-0">
            <div className="row">
                <div className="col-md-12 px-0">
                    <table className="table">
                        <thead>
                            <tr>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row"  className={CartState.CartOption==="giohang"?"bg-secondary text-white":""}
                                     onClick={()=>{CartState.setCartOption("giohang")}}>
                                    Giỏ hàng
                                </th>
                            </tr>
                            <tr>
                                <th scope="row" className={CartState.CartOption==="donmua"?"bg-secondary text-white":""} 
                                    onClick={()=>{CartState.setCartOption("donmua")}}>
                                    Đơn mua
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    )
}