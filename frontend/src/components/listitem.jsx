import { useEffect, useState } from "react";
import axios from "axios";
import ShowClothes from "../components/showclothes";

const host = "http://localhost:1505";

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

export default function ListItem() {
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [sort, setSort] = useState("default");
  const [clothes, setClothes] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [type, setType] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    axios
      .get(host + "/product?from=0&to=999999999&search=" + search)
      .then((res) => {
        setProductCount(res.data.length);
      });
  }, [search]);

  useEffect(() => {
    axios
      .get(
        host +
          "/product" +
          "?from=" +
          (currentPage - 1) * 8 +
          "&to=" +
          ((currentPage - 1) * 8 + 8) +
          "&search=" +
          search
      )
      .then((res) => {
        setClothes(res.data);
      });
  }, [currentPage, search]);
  useEffect(() => {
    axios.get(host + "/catalog").then((res) => {
      setCatalog(res.data);
    });
  }, []);

  const handleSearch = () => {
    setSearch(searchValue);
    setSearchValue("");
  };

  return (
    <div className="bg-white title">
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
                className={type === item.id ? "underline-choose" : "underline"}
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
      <div className="newProduct__content">
        {sortPriceArray(clothes, sort).filter(
          (item) => item.catalog_id === type || type === 0
        ).length > 0 ? (
          sortPriceArray(clothes, sort)
            .filter((item) => item.catalog_id === type || type === 0)
            .map((item, index) => <ShowClothes key={index} product={item} />)
        ) : (
          <div className="text-center p-4 m-4">
            Không có sản phẩm nào cho từ khóa: <strong>{search}</strong>
          </div>
        )}
      </div>
      <div className="newProduct__footer">
        <nav className="mt-3">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                href="#"
                aria-label="Previous"
                onClick={() => {
                  setCurrentPage(currentPage === 1 ? 1 : currentPage - 1);
                }}
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            {[...Array(Math.ceil(productCount / 8)).keys()].map(
              (item, index) => (
                <li
                  key={index}
                  className={
                    currentPage === index + 1 ? "page-item active" : "page-item"
                  }
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
            <li className="page-item">
              <button
                className="page-link"
                aria-label="Next"
                onClick={() =>
                  setCurrentPage(
                    currentPage ===
                      [...Array(Math.ceil(productCount / 8)).keys()].length
                      ? currentPage
                      : currentPage + 1
                  )
                }
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
