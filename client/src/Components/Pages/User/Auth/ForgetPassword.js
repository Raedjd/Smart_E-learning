import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const userId = cookie.get("id");
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    const forgetSuccess = document.querySelector(".forget");
    const forgetRefused = document.querySelector(".notforget");
    forgetSuccess.innerHTML = "";
    forgetRefused.innerHTML = "";
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/forget`,
      withCredentials: true,
      data: {
        email: email,
      },
    })
      .then((response) => {
        console.log(response);
        forgetSuccess.innerHTML = response.data.msg.successed;
        forgetRefused.innerHTML = response.data.msg.refused;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return !userId ? (
    <div>
      <section class="section signup-area signin-area section-padding overflow-hidden">
        <div class="container">
          <div class="row justify-content-center align-items-center">
            <div class="col-lg-5 order-2 order-lg-0">
              <div class="signup-area-textwrapper">
                <h2 class="font-title--md mb-0">Forget Passowrd</h2>
                <p class="mt-2 mb-lg-4 mb-3">
                  Don't have account?{" "}
                  <a class="text-black-50">
                    <Link to="/signup"> Sign up</Link>
                  </a>
                </p>
                <form action="#" onSubmit={handleForgetPassword}>
                  <div class="form-element active">
                    <div class="form-alert">
                      <label for="name">Email</label>
                    </div>
                    <div class="form-alert-input">
                      <input
                        type="email"
                        placeholder="foulen.benfoulen@gmail.com"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        aria-describedby="inputGroupPrepend"
                        required
                      />
                    </div>
                  </div>

                  <div class="form-element">
                    <input
                      type="submit"
                      class="button button-lg button--primary w-100"
                      value="RESET PASSWORD"
                      disabled={!email}
                    />
                    <div className="forget  bg-success"></div>
                    <div className="notforget text-danger"></div>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-lg-7 order-1 order-lg-0">
              <div class="signup-area-image">
                <img
                  src="/dist/images/signup/Illustration.png"
                  alt="Illustration Image"
                  class="img-fluid"
                  style={{ zIndex: 1 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="dot-images">
        <img
          src="dist/images/shape/dots/dots-img-10.png"
          alt="shape"
          style={{ zIndex: 1 }}
          class="img-fluid first-dotimage"
        />
        <img
          src="dist/images/shape/dots/dots-img-07.png"
          alt="shape"
          class="img-fluid second-dotimage"
        />
      </div>
    </div>
  ) : (
    <Navigate to="/notfound" />
  );
};

export default ForgetPassword;
