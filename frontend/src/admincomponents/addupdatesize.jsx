import { useState,useEffect } from "react";
export default function AddUpdateSize({setSizeHandler, sizeHandler, indexHander,setAddSizeHandler}) {
  const [sizeName, setSizeName] = useState("");
  const [sizeCount, setSizeCount] = useState(0);
  // console.log(sizeHandler)


  useEffect(() => {
    function newSetSize() {
      let newSize = [...sizeHandler];
      newSize.push({ sizeName, sizeCount });
      setSizeHandler(newSize);
    }
    newSetSize();
  }, []);

  useEffect(() => {
    if (sizeHandler[indexHander]) {
      if (
        sizeHandler[indexHander].sizeName &&
        sizeHandler[indexHander].sizeCount 
      ) {
        setSizeName(sizeHandler[indexHander].sizeName);
        setSizeCount(sizeHandler[indexHander].sizeCount);

      }
    }
  }, []);


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
        defaultValue={sizeName}
        onChange={(e) => {
          setSizeName(e.target.value);
        }}
      />
      <input
        type="number"
        className="form-control col-md-5 px-0"
        placeholder="Số lượng"
        value={sizeCount}
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
