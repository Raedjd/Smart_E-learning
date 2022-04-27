import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import cookie from "js-cookie";
const VerifyEmail = () => {
  const [verifa, setVerifa] = useState("");
  const [verifb, setVerifb] = useState("");
  const [verifc, setVerifc] = useState("");
  const [verifd, setVerifd] = useState("");
  const [verife, setVerife] = useState("");
  const [veriff, setVeriff] = useState("");
  const SuccessActive = document.querySelector(".successed");
  const RefusedSuccess = document.querySelector(".refused");
  const userId = cookie.get("id");
  const handleVerify = async (e) => {
    e.preventDefault();
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/activate-email`,
      withCredentials: true,
      data: {
        verifa: verifa,
        verifb: verifb,
        verifc: verifc,
        verifd: verifd,
        verife: verife,
        veriff: veriff,
      },
    })
      .then((response) => {
        console.log(response);
        SuccessActive.innerHTML = response.data.msg.successed;

        RefusedSuccess.innerHTML = response.data.msg.refused;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return !userId ? (
    <section class="signup-area overflow-hidden">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-5 order-2 order-lg-0">
            <h2 class="font-title--md mb-0">Verify your email</h2>
            <p class="mt-2 mb-lg-4 mb-3 text-secondary">
              Please enter the 6 digit code sent to your email
            </p>
            <form action="#" class="mt-35" onSubmit={handleVerify}>
              <div class="form-element">
                <div class="verification d-flex align-items-center justify-content-between">
                  <input
                    type="text"
                    placeholder="-"
                    onChange={(e) => setVerifa(e.target.value)}
                    value={verifa}
                    class="border-lowBlack text-center rounded-0 rounded-start"
                    maxlength="1"
                  />
                  <input
                    type="text"
                    placeholder="-"
                    onChange={(e) => setVerifb(e.target.value)}
                    value={verifb}
                    class="border-lowBlack text-center rounded-0"
                    maxlength="1"
                  />
                  <input
                    type="text"
                    placeholder="-"
                    onChange={(e) => setVerifc(e.target.value)}
                    value={verifc}
                    class="border-lowBlack text-center rounded-0"
                    maxlength="1"
                  />
                  <input
                    type="text"
                    placeholder="-"
                    onChange={(e) => setVerifd(e.target.value)}
                    value={verifd}
                    class="border-lowBlack text-center rounded-0"
                    maxlength="1"
                  />
                  <input
                    type="text"
                    placeholder="-"
                    onChange={(e) => setVerife(e.target.value)}
                    value={verife}
                    class="border-lowBlack text-center rounded-0"
                    maxlength="1"
                  />
                  <input
                    type="text"
                    placeholder="-"
                    onChange={(e) => setVeriff(e.target.value)}
                    value={veriff}
                    class="border-lowBlack text-center rounded-0 rounded-end"
                    maxlength="1"
                  />
                </div>
              </div>
              <div class="form-element">
                <input
                  type="submit"
                  class="button button-lg button--primary w-100"
                  value="Confirm"
                  disabled={
                    !verifa ||
                    !verifb ||
                    !verifc ||
                    !verifd ||
                    !verife ||
                    !veriff
                  }
                />
              </div>
              <div className="successed bg-success"></div>
              <div className="refused text-danger"></div>
            </form>
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
    </section>
  ) : (
    <Navigate to="/notfound" />
  );
};

export default VerifyEmail;
