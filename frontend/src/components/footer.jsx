import { useState } from "react";
import Chat from "./messenger";
export default function Footer() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
               in place of 'smooth' */
    });
  };
  window.addEventListener("scroll", toggleVisible);
  return (
    <div className="footer container-fluid" id="contact">
      <div className="container">
        <div className="py-5">
          <div className="row">
            <div className="col-md-4">
              <h5 className="about__us">About us</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="#Lorem" className="nav-link p-0 text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt cilisis.
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#Features" className="nav-link p-0 text-muted">
                    Features
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#Pricing" className="nav-link p-0 text-muted">
                    Pricing
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#FAQs" className="nav-link p-0 text-muted">
                    FAQs
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#About" className="nav-link p-0 text-muted">
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-2">
              <h5 className="about__us">Quick Action</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="/user" className="nav-link p-0 text-muted">
                    My account
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/cart" className="nav-link p-0 text-muted">
                    Order tracking
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/cart" className="nav-link p-0 text-muted">
                    Checkout
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/wish-list" className="nav-link p-0 text-muted">
                    WishList
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-5 offset-md-1">
              <form>
                <h5 className="about__us">Subscribe to our newsletter</h5>
                <p>Monthly digest of whats new and exciting from us.</p>
                <div className="d-flex w-100 gap-2">
                  <input
                    id="newsletter1"
                    type="text"
                    className="form-control"
                    placeholder="Email address"
                  />
                  <button className="btn btn-danger" type="button">
                    Subscribe
                  </button>
                </div>
                <div className="footer__logoVsName">
                  <img
                    src="https://res.cloudinary.com/vitamim/image/upload/v1659424151/vitamim/logo_gdq3rd.png"
                    className="footer__logo"
                    id="footer__logo"
                    alt="logo"
                  />
                  <img className="footer__name" src="src/store.png" alt="" />
                </div>
              </form>
            </div>
          </div>

          <div className="d-flex justify-content-between py-4 my-4 border-top">
            <p>&copy; 2022 Company, Inc. All rights reserved.</p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3">
                <a className="link-dark" href="#a">
                  <i className="fa-brands fa-twitter fa-2x"></i>
                </a>
              </li>
              <li className="ms-3">
                <a
                  className="link-dark"
                  href="https://www.instagram.com/halee_4u_/"
                >
                  <i className="fa-brands fa-instagram fa-2x"></i>
                </a>
              </li>
              <li className="ms-3">
                <a
                  className="link-dark"
                  href="https://www.facebook.com/hailinh.nguyen.359126/"
                >
                  <i className="fa-brands fa-facebook fa-2x"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        id="top-up"
        className="up"
        onClick={scrollToTop}
        style={{ display: visible ? "flex" : "none" }}
      >
        <i className="fa-solid fa-arrow-up fa-2x"></i>
      </div>
      <Chat />
    </div>
  );
}
