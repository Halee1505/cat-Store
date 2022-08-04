

  function deleteAddColorHandler() {
    AddClothes.setSize(AddClothes.size.filter((item, index) => index !== id));
  }
  function setColorHandler(e) {
    let NewColor = [...AddClothes.size];
    NewColor[id][e.target.name] = e.target.value;
    AddClothes.setSize(NewColor);
  }
  function AddSizeHandler() {
    setClassify((classify) => classify + 1);
  }
  function AddClassifyhandler(index, e) {
    let NewSize = [...AddClothes.size];
    NewSize[id]["classifycolor" + id + "-" + index] = e.target.value;
    AddClothes.setSize(NewSize);
  }
  function AddCounthandler(index, e) {
    let NewSize = [...AddClothes.size];
    NewSize[id]["countcolor" + id + "-" + index] = e.target.value;
    AddClothes.setSize(NewSize);
  }


    
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