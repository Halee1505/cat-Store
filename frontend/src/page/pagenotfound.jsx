export default function PageNotFound() {
  return (
    <div
      className="container-fluid"
      style={{
        height: "100vh",
        backgroundColor: "black",
        backgroundImage: `url(https://tophinhanhdep.com/wp-content/uploads/2021/10/Akatsuki-Wallpapers.jpg)`,
        // backgroundImage: `url(https://tophinhanhdep.com/wp-content/uploads/2021/10/Akatsuki-Wallpapers.jpg)`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="container"
        style={{
          height: "100%",
        }}
      >
        <div
          className="row"
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="col-12">
            <div className="row align-items-center">
              <div className="col-5 d-flex justify-content-left align-items-center mt-4 ">
                <img
                  style={{
                    width: "50%",
                    zIndex: "1",
                  }}
                  src="./src/4-1.png"
                  alt=""
                />
                <img
                  style={{
                    width: "55%",
                    position: "absolute",
                    left: "35%",
                    zIndex: "2",
                  }}
                  className="rotate"
                  src="./src/0.png"
                  alt=""
                />
                <img
                  style={{
                    width: "50%",
                    marginLeft: "26%",
                    zIndex: "3",
                  }}
                  src="./src/4-2.png"
                  alt=""
                />
              </div>
              <div className="col-12">
                <h3 className="not-found-text">
                  Ối, trang bạn tìm không tồn tại rồi !!!
                </h3>
              </div>
            </div>
          </div>
          <div
            className="col-12"
            style={{
              height: "max-content",
            }}
          >
            <div className="row">
              <div className="col-9"></div>
              <div className="col-3 return">
                <img
                  style={{
                    width: "40%",
                  }}
                  src="https://pro2-bar-s3-cdn-cf5.myportfolio.com/064c864b-2c0f-47e7-95ba-0713bbf7e470/6f2789b8-7a95-48e0-9762-5f3a4e6d822c_rw_1920.gif?h=989659cc745f1066f50d5117e56ee571"
                  alt=""
                />
                <a href="/">Quay lại</a>
                <i class="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
