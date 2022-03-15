import React from "react";

const ResetPassword = () => {
  return (
    <section class="section signup-area signin-area section-padding overflow-hidden">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-lg-5 order-2 order-lg-0">
            <div class="signup-area-textwrapper">
              <h2 class="font-title--md mb-0">Reset Passowrd</h2>

              <form action="#">
                <div class="form-element active">
                  <div class="form-alert">
                    <label for="name">Password</label>
                  </div>
                  <div class="form-alert-input">
                    <input type="email" placeholder="Arif Ahmed" id="name" />
                  </div>
                </div>

                <div class="form-element">
                  <button
                    type="submit"
                    class="button button-lg button--primary w-100"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="col-lg-7 order-1 order-lg-0">
            <div class="signup-area-image">
              <img
                src="dist/images/signup/Illustration.png"
                alt="Illustration Image"
                class="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
