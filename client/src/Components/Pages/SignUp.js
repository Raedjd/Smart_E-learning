import React from "react";
import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <section class="signup-area overflow-hidden">
      <div class="container">
        <div class="row align-items-center justify-content-md-center">
          <div class="col-lg-5 order-2 order-lg-0">
            <div class="signup-area-textwrapper">
              <h2 class="font-title--md mb-0">Sign Up</h2>
              <p class="mt-2 mb-lg-4 mb-3">
                Already have account?{" "}
                <a class="text-black-50">
                  <Link to="/signin"> Sign in</Link>
                </a>
              </p>
              {/*----------------------------------------------------------------------------------------------------------------*/}
              <form action="#">
                <div class="form-element ">
                  <div class="form-alert">
                    <label for="name">Username</label>
                  </div>
                  <div class="form-alert-input">
                    <input type="text" placeholder="Arif Ahmed" id="name" />
                  </div>
                </div>
                {/*----------------------------------------------------------------------*/}
                <div class="form-element ">
                  <div class="form-alert">
                    <label for="name">Email</label>
                  </div>
                  <div class="form-alert-input">
                    <input type="text" placeholder="Arif Ahmed" id="name" />
                  </div>
                </div>
                {/*----------------------------------------------------------------------*/}
                <div class="form-element ">
                  <div class="form-alert">
                    <label for="name">Password</label>
                  </div>
                  <div class="form-alert-input">
                    <input type="text" placeholder="Arif Ahmed" id="name" />
                  </div>
                </div>
                {/*----------------------------------------------------------------------*/}
                <div class="form-element ">
                  <div class="form-alert">
                    <label for="name">Confirm Password</label>
                  </div>
                  <div class="form-alert-input">
                    <input type="text" placeholder="Arif Ahmed" id="name" />
                  </div>
                </div>
                {/*----------------------------------------------------------------------*/}
                {/*----------------------------------------------------------------------*/}
                <div class="form-element">
                  <button
                    type="submit"
                    class="button button-lg button--primary w-100"
                  >
                    Sign UP
                  </button>
                </div>
                {/*----------------------------------------------------------------------*/}
              </form>
            </div>
          </div>
          {/*----------------------------------------------------------------------------------------------------------------*/}
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

export default SignUp;
