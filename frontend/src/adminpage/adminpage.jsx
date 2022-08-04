import AdminOption from "./adminoption";
import AddClothesPage from "./components/addclothespage";
import UpdateClothesPage from "./components/updateclothespage";
import GetClothesPage from "./components/getclothespage";
import ShowUserPage from "./components/showuserpage";
import Catalog from "./components/catalog";
import UpdateAdvertisement from "./components/updateadvertisement";
import Orders from "./orders";
import MessengerList from "./components/messengerlist";
import { useLocation } from "react-router-dom";

export default function AdminPage() {
  const history = useLocation().pathname.split("/")[2];
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 bg-white">
          <h1>Admin Page</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2 px-0">
          <AdminOption />
        </div>
        <div className="col-md-10 p-0">
          {history === "manage-clothes" ? (
            <GetClothesPage />
          ) : history === "add-clothes" ? (
            <AddClothesPage />
          ) : history === "update-clothes" ? (
            <UpdateClothesPage />
          ) : history === "manage-users" ? (
            <ShowUserPage />
          ) : history === "manage-advertisement" ? (
            <UpdateAdvertisement />
          ) : history === "manage-orders" ? (
            <Orders />
          ) : history === "catalog" ? (
            <Catalog />
          ) : history === "messenger" ? (
            <MessengerList />
          ) : null}
        </div>
      </div>
    </div>
  );
}
