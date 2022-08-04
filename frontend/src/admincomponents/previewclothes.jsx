import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Money from "../components/moneyformat";

const host = "http://localhost:1505";

export default function PreviewClothes({ product, previewClassify }) {
  const classify = previewClassify.map((item, index) => {
    if (item.link_img) {
      if (typeof item.link_img === "object") {
        const link = URL.createObjectURL(item.link_img);
        return {
          product_id: item.product_id,
          color: item.color,
          link_img: link,
          count: item.count,
          size: item.size,
        };
      }
    }
    return item;
  });

  const [previewSize, setPreviewSize] = useState(0);
  const [clothesCatalog, setClothesCatalog] = useState("");

  useEffect(() => {
    axios.get(host + "/catalog/" + product.catalog_id).then((res) => {
      if (res.data.length > 0) {
        setClothesCatalog(res.data[0].name);
      }
    });
  }, [product]);

  return (
    <div className="card flex-column card-preview">
      {classify.length !== 0 ? (
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          style={{ width: "100%", marginLeft: "0px", marginTop: "0px" }}
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            {classify.map((item, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  data-target="#carouselExampleIndicators"
                  data-slide-to={index}
                  style={{
                    height: "1.4vw",
                    width: "1.4vw",
                    backgroundColor: item.color,
                  }}
                  className={
                    index === 0 ? "active btn btn-dark" : "btn btn-dark"
                  }
                ></button>
              );
            })}
          </ol>
          <div className="carousel-inner">
            {classify.map((item, index) => {
              return (
                <div
                  key={index}
                  className={
                    index === 0 ? "carousel-item active" : "carousel-item"
                  }
                >
                  <div
                    className="bg-secondary mt-2 preview-img"
                    style={{
                      height: "20vw",
                      width: "17vw",
                      backgroundImage: "url(" + item.link_img + ")",
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="card-body pre">
        <h5 className="card-title">Tên: {product.name}</h5>
        <p className="card-text">
          <Money value={product.price} />
        </p>
        <p className="card-text">Danh mục: {clothesCatalog}</p>
        <p className="card-text">Giới tính: {product.gender}</p>
        <p className="card-text">Kích thước:</p>

        {classify.length !== 0 ? (
          <div className="row d-flex justify-content-between">
            {classify.map((item, index) => {
              return (
                <button
                  key={index}
                  className="btn"
                  onClick={() => {
                    setPreviewSize(index);
                  }}
                >
                  {item.size}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="row d-flex justify-content-between"></div>
        )}
        <p className="card-text mt-3">
          Số lượng hiện tại:{" "}
          {classify.length > 0 ? classify[previewSize]["count"] : 0}
        </p>
        <p className="card-text mt-3">
          Tổng số lượng:{" "}
          {classify.reduce((a, b) => Number(a) + Number(b.count), 0)}
        </p>
      </div>
    </div>
  );
}
