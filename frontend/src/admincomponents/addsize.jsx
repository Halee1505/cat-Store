import { useState,useEffect } from "react";
export default function AddSize({setSizeHandler, sizeHandler, indexHander,setAddSizeHandler}) {
  const [sizeName, setSizeName] = useState("");
  const [sizeCount, setSizeCount] = useState(0);
  useEffect(() => {
    function handleChange() {
        let NewSize = [...sizeHandler];
        NewSize[indexHander]= {sizeName, sizeCount};
        setSizeHandler(NewSize);
    }
    handleChange();
    }, [sizeName,sizeCount]);
    function onDeleteSizeHandler() {
        let NewSize = [...sizeHandler];
        NewSize.splice(indexHander, 1);
        setSizeHandler(NewSize);
        setAddSizeHandler(s=>s-1)
    }
  return (
    <div className="input-group col-md-13 row d-flex align-items-center">
      <input
        type="text"
        className="form-control col-md-5"
        placeholder="phân loại"
        onChange={(e) => {
          setSizeName(e.target.value);
        }}
      />
      <input
        type="number"
        className="form-control col-md-5"
        placeholder="Số lượng"
        onChange={(e) => {
          setSizeCount(e.target.value);
        }}
      />
      <i
        className="fa-regular fa-circle-xmark ml-2 col-md-2 px-0"
        style={{ fontSize: "1.7vw" }}
        onClick={onDeleteSizeHandler}
      ></i>
    </div>
  );
}
