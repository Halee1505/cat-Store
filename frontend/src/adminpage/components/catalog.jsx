import axios from "axios";
import { useState, useEffect } from "react";

function sort(arr) {
  return arr.sort((a, b) => {
    return a.id - b.id;
  });
}
const host = "http://localhost:1505";

export default function Catalog() {
  const [catalog, setCatalog] = useState([]);
  const [newCatalog, setNewCatalog] = useState("");
  const [updateCatalog, setUpdateCatalog] = useState(false);
  useEffect(() => {
    axios.get(host + "/catalog").then((res) => {
      setCatalog(sort(res.data));
    });
  }, [updateCatalog]);
  const addCatalog = () => {
    axios.post(host + "/catalog", { name: newCatalog }).then((res) => {
      setUpdateCatalog(!updateCatalog);
    });
  };
  const delCatalog = (id) => {
    axios.delete(`${host}/catalog/${id}`).then((res) => {
      setUpdateCatalog(!updateCatalog);
    });
  };
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center">
            <h1>Catalog</h1>
          </div>
          <div className="col-md-12 mt-2 mb-4">
            <form className="form-inline flex-nowrap">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Thêm catalog mới"
                aria-label="Search"
                style={{ width: "100%" }}
                onChange={(e) => {
                  setNewCatalog(e.target.value);
                }}
              />
              <button
                className="btn btn-outline-dark my-2 my-sm-0"
                type="button"
                onClick={addCatalog}
              >
                Thêm
              </button>
            </form>
          </div>
          <div className="col-md-12 d-flex flex-wrap justify-content-around">
            {catalog.map((item, index) => (
              <div className="col-md-2 px-4" key={index}>
                <input
                  type="text"
                  className="form-control mr-sm-2 bg-white"
                  value={item.name}
                  readOnly
                />
                <i
                  className="fas fa-times"
                  style={{
                    position: "relative",
                    right: "-127px",
                    top: "-47px",
                    color: "red",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    delCatalog(item.id);
                  }}
                ></i>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
