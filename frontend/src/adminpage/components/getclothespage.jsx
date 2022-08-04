import axios from "axios";
import { useEffect, useState } from "react";
import ShowClothes from "../../components/showclothes";

const host = "http://localhost:1505";

function sortCatalog(arr) {
  return arr.sort((a, b) => {
    return a.id - b.id;
  });
}
function sortPriceArray(arr, type) {
  if (type === "default") {
    return arr;
  }
  const newArr = [...arr];
  return newArr.sort((a, b) => {
    if (type === "ascending") {
      return a.price - b.price;
    }
    return b.price - a.price;
  });
}
export default function GetClothesPage() {
  const [clothes, setClothes] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [type, setType] = useState(0);
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    axios
      .get(host + "/product?from=0&to=999999999&search=" + search)
      .then((res) => {
        setClothes(res.data);
      });
  }, [search]);
  useEffect(() => {
    axios.get(host + "/catalog").then((res) => {
      setCatalog(sortCatalog(res.data));
    });
  }, []);

  const handleSearch = () => {
    setSearch(searchValue);
    setSearchValue("");
  };

  return (
    <div className="container-fluid px-0">
      <div className="row">
        <div className="col-md-12 bg-white title px-0 mx-0">
          <div className="newProduct__title">
            <div className="newProduct__title__left">
              <div className="header__logoText">PRODUCT</div>
            </div>
            <div className="newProduct__title__right desktop">
              <div
                className="newProduct__item hover_underline"
                onClick={() => {
                  setType(0);
                }}
              >
                Tất cả
                <div
                  className={type === 0 ? "underline-choose" : "underline"}
                ></div>
              </div>
              {catalog.map((item, index) => (
                <div
                  key={index}
                  className="newProduct__item hover_underline"
                  onClick={() => {
                    setType(item.id);
                  }}
                >
                  {item.name}{" "}
                  <div
                    className={
                      type === item.id ? "underline-choose" : "underline"
                    }
                  ></div>
                </div>
              ))}
            </div>

            <div className="newProduct__title__right mobile ">
              <div
                className="input-group mt-3"
                onChange={(e) => setType(e.target.value)}
              >
                <select className="custom-select" defaultValue="">
                  <option value={0}>Tất cả</option>
                  {catalog.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <nav className="navbar navbar-expand-lg bg-white border-top border-dark">
            <div className="container-fluid">
              <div className="collapse navbar-collapse justify-content-end">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item d-flex align-items-center">
                    <p className="nav-link">Sắp xếp theo:</p>
                  </li>
                  <li className="nav-item d-flex align-items-center">
                    <select
                      className="form-control mr-2"
                      style={{ width: "max-content" }}
                      defaultValue="default"
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <option value="default">Giá: Mặc định</option>
                      <option value="ascending">Giá: Từ thấp đến cao</option>
                      <option value="desending">Giá: Từ cao đến thấp</option>
                    </select>
                  </li>
                </ul>
                <div className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
                  <button
                    className="btn btn-outline-dark"
                    type="button"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </nav>
          <div className="d-flex justify-content-around flex-wrap">
            {sortPriceArray(clothes, sort)
              .filter((item) => item.catalog_id === type || type === 0)
              .map((item, index) => (
                <ShowClothes key={index} product={item} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
  //   return <clothes props={clothes} />;
}
