import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const ResetPassword = () => {
  const [password, setPassword] = useState("");

  // console.log(useParams());
  const { token } = useParams();
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const resetSuccess = document.querySelector(".reset");
    const resetRefused = document.querySelector(".notreset");

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/reset`,
      withCredentials: true,
      headers: { Authorization: token },
      data: {
        password: password,
      },
    })
      .then((res) => {
        console.log(res);
        resetSuccess.innerHTML = res.data.msg.successed;
        resetRefused.innerHTML = res.data.msg.refused;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <section class="section signup-area signin-area section-padding overflow-hidden">
        <div class="container">
          <div class="row justify-content-center align-items-center">
            <div class="col-lg-5 order-2 order-lg-0">
              <div class="signup-area-textwrapper">
                <h2 class="font-title--md mb-0">Reset Passowrd</h2>

                <form action="#" onSubmit={handleResetPassword}>
                  <div class="form-element active">
                    <div class="form-alert">
                      <label for="name">Password</label>
                    </div>
                    <div class="form-alert-input">
                      <input
                        type="password"
                        placeholder="Type here..."
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
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
                      disabled={!password}
                    />
                    <div className="reset  bg-success"></div>
                    <div className="notreset text-danger"></div>
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
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="dot-images">
        <img
          src="/dist/images/shape/dots/dots-img-11.png"
          alt="shape"
          class="img-fluid second-dotimage"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
