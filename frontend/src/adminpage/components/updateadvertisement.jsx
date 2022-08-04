import React, { useEffect } from "react";
import Dropzone from "react-dropzone";
import { useState } from "react";
import axios from "axios";

const host = "http://localhost:1505";
const styleInput = {
  width: "0.1px",
  height: "0.1px",
  opacity: "0",
  overflow: "hidden",
  position: "absolute",
  zIndex: "-1",
};

export default function UpdateAdvertisement() {
  const [advertisement, setAdvertisement] = useState([]);
  useEffect(() => {
    axios.get(host + "/advertisement").then((res) => {
      setAdvertisement(res.data);
    });
  }, []);

  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [preview3, setPreview3] = useState(null);
  const [preview4, setPreview4] = useState(null);
  const [preview5, setPreview5] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [loading, setLoading] = useState(false);

  const [updateAd1, setUpdateAd1] = useState(null);
  const [updateAd2, setUpdateAd2] = useState(null);
  const [updateAd3, setUpdateAd3] = useState(null);
  const [updateAd4, setUpdateAd4] = useState(null);
  const [updateAd5, setUpdateAd5] = useState(null);
  const [updateAd6, setUpdateAd6] = useState(null);

  useEffect(() => {
    if (advertisement.length > 0) {
      setPreview1(advertisement[0].ad1);
      setPreview2(advertisement[0].ad2);
      setPreview3(advertisement[0].ad3);
      setPreview4(advertisement[0].ad4);
      setPreview5(advertisement[0].ad5);
      setDiscount(advertisement[0].discount);
    }
  }, [advertisement]);

  const Upload = (UploadImg) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", UploadImg);
      formData.append("upload_preset", "vitamim");
      axios
        .post("https://api.cloudinary.com/v1_1/vitamim/image/upload", formData)
        .then((res) => {
          setLoading(false);
          resolve(res.data.url);
        });
    });
  };

  const onDrop = (files, ind) => {
    if (files) {
      if (ind === 1) {
        setPreview1((pr) => URL.createObjectURL(files));
        setUpdateAd1((pr) => files);
      }
      if (ind === 2) {
        setPreview2((pr) => URL.createObjectURL(files));
        setUpdateAd2((pr) => files);
      }
      if (ind === 3) {
        setPreview3((pr) => URL.createObjectURL(files));
        setUpdateAd3((pr) => files);
      }
      if (ind === 4) {
        setPreview4((pr) => URL.createObjectURL(files));
        setUpdateAd4((pr) => files);
      }
      if (ind === 5) {
        setPreview5((pr) => URL.createObjectURL(files));
        setUpdateAd5((pr) => files);
      }
      if (ind === 6) {
        setDiscount((pr) => URL.createObjectURL(files));
        setUpdateAd6((pr) => files);
      }
    }
  };

  const onSave = () => {
    let adname = [];
    let multiplePicturePromise = [];
    [updateAd1, updateAd2, updateAd3, updateAd4, updateAd5, updateAd6].map(
      (item, index) => {
        if (item) {
          if (index !== 5) {
            adname.push("ad" + (index + 1));
          } else {
            adname.push("discount");
          }
          multiplePicturePromise.push(Upload(item));
        }
      }
    );
    Promise.all(multiplePicturePromise).then((res) => {
      let data = {};
      res.map((item, index) => {
        data[adname[index]] = item;
      });
      let name = ["ad1", "ad2", "ad3", "ad4", "ad5", "discount"];
      name.map((item, index) => {
        if (!adname.includes(item)) {
          data[item] = advertisement[0][item];
        }
      });
      axios
        .put(host + "/advertisement/" + advertisement[0].id, data)
        .then((res) => {
          alert("Update Successfully");
        });
    });
  };

  return (
    <div className="container-fluid bg-white">
      {loading ? <i className="fa-solid fa-spinner fa-spin uploading"></i> : ""}
      <div className="container">
        <div className="row">
          <h2 className="col-md-12 mb-0">Advertisement</h2>
          <div className="col-md-12">
            <div className="title__advertisement" style={{ height: "36vw" }}>
              <div className="title__advertisement__left">
                <Dropzone
                  onDrop={(acceptedFiles) => onDrop(acceptedFiles[0], 1)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section
                      className="title__advertisement__item"
                      style={{ backgroundImage: "url(" + preview1 + ")" }}
                    >
                      <i
                        className="fa-solid fa-upload upload"
                        {...getRootProps()}
                      >
                        <input
                          style={styleInput}
                          type="file"
                          name="file1"
                          id="file1"
                          {...getInputProps()}
                        />
                      </i>
                    </section>
                  )}
                </Dropzone>
              </div>
              <div className="title__advertisement__right">
                <Dropzone
                  onDrop={(acceptedFiles) => onDrop(acceptedFiles[0], 2)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section
                      className="title__advertisement__items"
                      style={{ backgroundImage: "url(" + preview2 + ")" }}
                    >
                      <i
                        className="fa-solid fa-upload upload"
                        {...getRootProps()}
                      >
                        <input
                          style={styleInput}
                          type="file"
                          name="file2"
                          id="file2"
                          {...getInputProps()}
                        />
                      </i>
                    </section>
                  )}
                </Dropzone>
                <Dropzone
                  onDrop={(acceptedFiles) => onDrop(acceptedFiles[0], 3)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section
                      className="title__advertisement__items"
                      style={{ backgroundImage: "url(" + preview3 + ")" }}
                    >
                      <i
                        className="fa-solid fa-upload upload"
                        {...getRootProps()}
                      >
                        <input
                          style={styleInput}
                          type="file"
                          name="file3"
                          id="file3"
                          {...getInputProps()}
                        />
                      </i>
                    </section>
                  )}
                </Dropzone>
                <Dropzone
                  onDrop={(acceptedFiles) => onDrop(acceptedFiles[0], 4)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section
                      className="title__advertisement__items"
                      style={{ backgroundImage: "url(" + preview4 + ")" }}
                    >
                      <i
                        className="fa-solid fa-upload upload"
                        {...getRootProps()}
                      >
                        <input
                          style={styleInput}
                          type="file"
                          name="file4"
                          id="file4"
                          {...getInputProps()}
                        />
                      </i>
                    </section>
                  )}
                </Dropzone>
                <Dropzone
                  onDrop={(acceptedFiles) => onDrop(acceptedFiles[0], 5)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section
                      className="title__advertisement__items"
                      style={{ backgroundImage: "url(" + preview5 + ")" }}
                    >
                      <i
                        className="fa-solid fa-upload upload"
                        {...getRootProps()}
                      >
                        <input
                          style={styleInput}
                          type="file"
                          name="file5"
                          id="file5"
                          {...getInputProps()}
                        />
                      </i>
                    </section>
                  )}
                </Dropzone>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-0">
            <h2>Discount</h2>
          </div>
          <div className="col-md-12">
            <Dropzone onDrop={(acceptedFiles) => onDrop(acceptedFiles[0], 6)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    className="discount-admin"
                    id="discount-admin"
                    style={{ backgroundImage: "url(" + discount + ")" }}
                    {...getRootProps()}
                  >
                    <input
                      style={styleInput}
                      type="file"
                      name="file6"
                      id="file6"
                      {...getInputProps()}
                    />
                    <i className="fa-solid fa-upload upload"></i>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-3 mb-3 d-flex justify-content-end">
            <div className="btn-group">
              <button className="btn btn-dark btn-lg" onClick={onSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
