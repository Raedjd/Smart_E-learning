import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const navigate = useNavigate();
  const userId = cookie.get("id");
  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const usernameError = document.querySelector(".username.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const confpasswordError = document.querySelector(".confirm-password.error");
    const termsError = document.querySelector(".terms.error");
    const signUpSuccess = document.querySelector(".signUp");
    usernameError.innerHTML = "";
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    confpasswordError.innerHTML = "";
    termsError.innerHTML = "";
    signUpSuccess.innerHTML = "";
    if (password !== confPassword || !terms.checked) {
      if (password !== confPassword)
        confpasswordError.innerHTML = "Password does not matched!";
      if (!terms.checked)
        termsError.innerHTML = "Please validate the general conditions";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        withCredentials: true,
        data: {
          username: username,
          email: email,
          password: password,
        },
      })
        .then((response) => {
          console.log(response);
          signUpSuccess.innerHTML = response.data.msg;
          navigate("/verifyemail");
        })
        .catch((err) => {
          console.log(err.response.data);
          usernameError.innerHTML = err.response.data.msg.username;
          emailError.innerHTML = err.response.data.msg.email;
          passwordError.innerHTML = err.response.data.msg.password;
        });
    }
  };
  return !userId ? (
    <div>
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
                <form action="#" onSubmit={handleRegister}>
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
                  <div class="form-element ">
                    <div class="form-alert">
                      <label for="email">Email</label>
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
                      <div className="email error text-danger"></div>
                    </div>
                  </div>
                  {/*----------------------------------------------------------------------*/}
                  <div class="form-element ">
                    <div class="form-alert">
                      <label for="password">Password</label>
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
                  <div class="form-element ">
                    <div class="form-alert">
                      <label for="confirmpassword">Confirm Password</label>
                    </div>
                    <div class="form-alert-input">
                      <input
                        type="password"
                        placeholder="Type here..."
                        id="confpassword"
                        onChange={(e) => setConfPassword(e.target.value)}
                        value={confPassword}
                        aria-describedby="inputGroupPrepend"
                        required
                      />
                      <div className="confirm-password error text-danger"></div>
                    </div>
                  </div>
                  {/*----------------------------------------------------------------------*/}
                  <input type="checkbox" id="terms" />
                  <label htmlFor="terms">
                    I accept the{" "}
                    <a href="/" target="_blank" rel="noopener noreferrer">
                      terms and conditions
                    </a>
                  </label>
                  <div className="terms error text-danger"></div>
                  <br />
                  {/*----------------------------------------------------------------------*/}
                  <div class="form-element">
                    <input
                      type="submit"
                      class="button button-lg button--primary w-100"
                      value="SIGN UP"
                    />
                    <div className="signUp  text-success"></div>
                  </div>
                  {/*----------------------------------------------------------------------*/}
                </form>
              </div>
            </div>
            {/*----------------------------------------------------------------------------------------------------------------*/}
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

export default SignUp;
