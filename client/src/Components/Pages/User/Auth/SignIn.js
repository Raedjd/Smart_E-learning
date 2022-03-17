import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

import axios from "axios";
const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const usernameError = document.querySelector(".username.error");
    const passwordError = document.querySelector(".password.error");
    const formElementUserNameError = document.querySelector(".form-element.un");
    const formElementPasswordError = document.querySelector(".form-element.ps");

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        username: username,
        password: password,
      },
    })
      .then((response) => {
        if (response.data.user.role === "admin") {
          navigate("/dashbord");
        } else if (response.data.user.role === "student")
          navigate("/profilstudent");
        else navigate("/profilteacher");
      })
      .catch((err) => {
        console.log(err.response.data);
        usernameError.innerHTML = err.response.data.errors.username;
        passwordError.innerHTML = err.response.data.errors.password;
        if (err.response.data.errors.username)
          formElementUserNameError.classList.add("error");
        if (err.response.data.errors.password)
          formElementPasswordError.classList.add("error");
      });
  };

  const responseGoogle = async (response) => {
    console.log(response);
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/goggle-login`,
      withCredentials: true,
      data: { tokenId: response.tokenId },
    })
      .then((response) => {
        console.log(response);
      })

      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <section class="section signup-area signin-area">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-xl-5 order-2 order-xl-0">
              <div class="signup-area-textwrapper">
                <h2 class="font-title--md mb-0">Sign in</h2>
                <p class="mt-2 mb-lg-4 mb-3">
                  Don't have account?
                  <a class="text-black-50">
                    <Link to="/signup"> Sign up</Link>
                  </a>
                </p>
                {/*----------------------------------------------------------------------*/}
                <form action="#" onSubmit={handleLogin}>
                  <div class="form-element un ">
                    <div class="form-alert ">
                      <label for="username">Username</label>
                    </div>
                    <div class="form-alert-input">
                      <input
                        type="text"
                        placeholder="Type here..."
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        aria-describedby="inputGroupPrepend"
                        required
                      />
                      <div className="username error text-danger"></div>
                    </div>
                  </div>
                  {/*----------------------------------------------------------------------*/}
                  <div class="form-element ps ">
                    <div class="form-alert ">
                      <label for="password">Password</label>
                      <a class="text-primary fs-6">
                        <Link to="/forgetpassword">Forget Password</Link>
                      </a>
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

                      <div className="password error text-danger"></div>
                    </div>
                  </div>
                  {/*----------------------------------------------------------------------*/}
                  <div class="form-alert">
                    <input
                      type="submit"
                      class="button button-lg button--primary w-100"
                      value="SIGN IN"
                    />
                  </div>
                  {/*----------------------------------------------------------------------*/}
                  <span class="d-block text-center text-secondary">
                    or sign in with
                  </span>
                  {/*----------------------------------------------------------------------*/}{" "}
                  <GoogleLogin
                    clientId="974142183042-1sa6viujvb58pfhr8gm69g1rehpa47go.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
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
  );
};

export default SignIn;
