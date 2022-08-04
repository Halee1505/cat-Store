import { Link, useLocation } from "react-router-dom";
export default function AdminOption() {
  const history = useLocation().pathname.split("/")[2];
  return (
    <div className="container-fluid px-0">
      <div className="row">
        <div className="col-md-12 px-0">
          <table className="table">
            <thead className="table-light">
              <tr>
                <th scope="col">Quản lý trang web</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Link
                  to="/admin/manage-clothes"
                  style={{ color: "unset", width: "100%" }}
                >
                  <th
                    scope="row"
                    className={
                      history === "manage-clothes"
                        ? "bg-secondary text-white"
                        : ""
                    }
                    style={{ display: "block" }}
                  >
                    Show All Items
                  </th>
                </Link>
              </tr>
              <tr>
                <Link to="/admin/add-clothes" style={{ color: "unset" }}>
                  <th
                    scope="row"
                    className={
                      history === "add-clothes" || history === "update-clothes"
                        ? "bg-secondary text-white"
                        : ""
                    }
                    style={{ display: "block" }}
                  >
                    Add Items
                  </th>
                </Link>
              </tr>
              <tr>
                <Link to="/admin/catalog" style={{ color: "unset" }}>
                  <th
                    scope="row"
                    className={
                      history === "catalog" ? "bg-secondary text-white" : ""
                    }
                    style={{ display: "block" }}
                  >
                    Add Catalog
                  </th>
                </Link>
              </tr>
              <tr>
                <Link to="/admin/manage-users" style={{ color: "unset" }}>
                  <th
                    scope="row"
                    className={
                      history === "manage-users"
                        ? "bg-secondary text-white"
                        : ""
                    }
                    style={{ display: "block" }}
                  >
                    Show List Users
                  </th>
                </Link>
              </tr>
              <tr>
                <Link
                  to="/admin/manage-advertisement"
                  style={{ color: "unset" }}
                >
                  <th
                    scope="row"
                    className={
                      history === "manage-advertisement"
                        ? "bg-secondary text-white"
                        : ""
                    }
                    style={{ display: "block" }}
                  >
                    Advertisement
                  </th>
                </Link>
              </tr>
              <tr>
                <Link to="#" style={{ color: "unset" }}>
                  <th scope="row" style={{ display: "block" }}>
                    <p></p>
                  </th>
                </Link>
              </tr>
            </tbody>
            <thead className="table-light">
              <tr>
                <th scope="col">Quản Lý</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Link
                  to="/admin/manage-orders"
                  style={{ color: "unset", width: "100%" }}
                >
                  <th
                    scope="row"
                    className={
                      history === "manage-orders"
                        ? "bg-secondary text-white"
                        : ""
                    }
                    style={{ display: "block" }}
                  >
                    Danh sách đơn hàng
                  </th>
                </Link>
              </tr>
              <tr>
                <Link
                  to="/admin/messenger"
                  style={{ color: "unset", width: "100%" }}
                >
                  <th
                    scope="row"
                    className={
                      history === "messenger" ? "bg-secondary text-white" : ""
                    }
                    style={{ display: "block" }}
                  >
                    Quản lý tin nhắn
                  </th>
                </Link>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
