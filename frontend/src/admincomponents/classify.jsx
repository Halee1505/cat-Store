import { useState, useContext, useEffect } from "react";
import AddClothesContext from "../context/addclothescontext";
import axios from "axios";
import Dropzone from "react-dropzone";
import AddSize from "./addsize";
const styleInput = {
  width: "0.1px",
  height: "0.1px",
  opacity: "0",
  overflow: "hidden",
  position: "absolute",
  zIndex: "-1",
};
export default function Classify({
  handleSetReview,
  handlePreview,
  handleSetSize,
  handleSize,
  handleIndex,
  handleClassify,
}) {
  // console.log(handleSize);
  // console.log(handleIndex);
  // console.log(handleSetSize);
  const AddClothes = useContext(AddClothesContext);
  const [addSize, setAddSize] = useState(0);

  const [updateImg, setUpdateImg] = useState(null);
  const [preview, setPreview] = useState(null);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState([]);

  const onDrop = (files) => {
    if (files) {
      setPreview((pr) => URL.createObjectURL(files));
      setUpdateImg((pr) => files);
    }
  };

  useEffect(() => {
    function handleClassifyChange() {
      let newSize = [...handleSize];
      newSize[handleIndex] = { color, size, updateImg };
      handleSetSize(newSize);
      let newPreview = [...handlePreview];
      newPreview[handleIndex] = preview;
      handleSetReview(newPreview);
    }
    handleClassifyChange();
  }, [updateImg, color, size]);

  function deleteAddColorHandler() {
    handleClassify((classify) => classify - 1);
    let newSize = [...handleSize];
    newSize.splice(handleIndex, 1);
    handleSetSize(newSize);
    let newPreview = [...handlePreview];
    newPreview.splice(handleIndex, 1);
    handleSetReview(newPreview);
  }

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          <div className="col-md-12 row">
            <div
              className="input-group col-md-12 row mb-1 mt-1"
              style={{ height: "max-content" }}
            >
              <div className="input-group-prepend col-md-12 row d-flex align-items-center">
                <label htmlFor={`color${handleIndex}`} className="col-md-4">
                  Color {handleIndex + 1}:{" "}
                </label>
                <Dropzone onDrop={(acceptedFiles) => onDrop(acceptedFiles[0])}>
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div
                        style={{
                          backgroundImage: "url(" + preview + ")",
                          height: "6vw",
                          width: "6vw",
                          backgroundColor: "#ffffff",
                          border: "1px #000000 dashed",
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                        {...getRootProps()}
                      >
                        <input
                          style={styleInput}
                          type="file"
                          className="input-group-text col-md-6"
                          {...getInputProps()}
                        />
                        <i className="fa-solid fa-upload upload"></i>
                      </div>
                    </section>
                  )}
                </Dropzone>
                <div className="row">
                  <input
                    type="color"
                    name={`color${handleIndex}`}
                    className="input-group-text col-md-12"
                    onChange={(e) => {
                      setColor(e.target.value);
                    }}
                    id={`color${handleIndex}`}
                    style={{ height: "100%" }}
                  />
                  <button
                    className="btn btn-outline-dark col-md-12 rounded"
                    onClick={() => {
                      setAddSize(addSize + 1);
                    }}
                  >
                    Add size
                  </button>
                </div>
                <i
                  className="fa-regular fa-circle-xmark col-md-2"
                  style={{ fontSize: "1.7vw" }}
                  onClick={deleteAddColorHandler}
                ></i>
              </div>
            </div>
            <div className="col-md-12 row">
              {addSize !== 0
                ? new Array(addSize).fill(0).map((it, index) => {
                    return (
                      <AddSize
                        key={index}
                        setSizeHandler={setSize}
                        sizeHandler={size}
                        indexHander={index}
                        setAddSizeHandler={setAddSize}
                      />
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
