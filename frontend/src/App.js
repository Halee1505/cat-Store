import "./App.css";
import HomePage from "./page/homepage";
import ListItemPage from "./page/listitempage";
import ItemDetailPage from "./page/itemdetailpage";
import Login from "./page/login";
import Signup from "./page/signup";
import CartPage from "./page/cartpage";
import TransactionPage from "./page/transactionpage";
import UserPage from "./page/userpage";
import WishlistPage from "./page/wishlistpage";
import ForgotPassword from "./page/forgotpassword";
import UserDetailPage from "./adminpage/components/userdetailpage";
import OrderDetail from "./adminpage/orderdetail";
// import InstagramAPI from './components/instagramapi';

// adminpage
import AdminPage from "./adminpage/adminpage";
// import AddClothesPage from './adminpage/addclothespage';
// import GetClothesPage from './adminpage/getclothespage';

import "./css/style.css";
import "./css/responsivestyle.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartState from "./context/cartstate";
import AdminOptionState from "./context/adminoptionstate";
import UserState from "./context/userstate";
function App() {
  return (
    <BrowserRouter>
      <UserState>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/items" element={<ListItemPage />} />
          <Route path="/itemdetail/:id" element={<ItemDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/cart"
            element={
              <CartState>
                <CartPage />
              </CartState>
            }
          />
          <Route path="/transaction" element={<TransactionPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/wish-list" element={<WishlistPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/user" element={<UserDetailPage />} />
          <Route path="/admin/transaction-detail" element={<OrderDetail />} />
          <Route
            path="/admin/manage-orders"
            element={
              <AdminOptionState>
                <AdminPage />
              </AdminOptionState>
            }
          />
          <Route
            path="/admin/*"
            element={
              <AdminOptionState>
                <AdminPage />
              </AdminOptionState>
            }
          />
        </Routes>
      </UserState>
    </BrowserRouter>
  );
}

export default App;
