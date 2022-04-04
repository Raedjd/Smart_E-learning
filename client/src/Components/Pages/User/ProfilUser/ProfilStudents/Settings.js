import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import axios from "axios";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Select from "react-select";
import countryList from "react-select-country-list";
import { uploadAvatar } from "../../../../../actions/user.actions";

const Settings = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [whatDoUdo, setWhatDoUdo] = useState("");
  const [nationality, setNationality] = useState("");
  const [phone, setPhone] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [avatar, setAvatar] = useState("");
  const [old_password, setOld_password] = useState("");
  const [new_password, setNew_password] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  const navigate = useNavigate();
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };
  const changeHandler = (nationality) => {
    setNationality(nationality);
  };
  const options = useMemo(() => countryList().getData(), []);
  const userData = useSelector((state) => state.userReducer);
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleDisable = async (e) => {
    e.preventDefault();
    await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/disable`,
      withCredentials: true,
    })
      .then((response) => {
        removeCookie("jwt");
        removeCookie("id");
      })
      .catch((err) => console.log(err));
    navigate("/home");
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleDelete = async (e) => {
    e.preventDefault();
    if (
      window.confirm("Be careful! Your account will be permanently deleted.")
    ) {
      await axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}api/user/delete-user`,
        withCredentials: true,
      })
        .then((response) => {
          removeCookie("jwt");
          removeCookie("id");
        })
        .catch((err) => console.log(err));
      navigate("/home");
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleChangePassword = async (e) => {
    e.preventDefault();
    const oldPasswordError = document.querySelector(".refusedold");
    const newPasswordError = document.querySelector(".refusednew");
    const confnewPasswordError = document.querySelector(".refusedconf");
    const successChangePassword = document.querySelector(".successed");

    await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/changepass`,
      withCredentials: true,
      data: {
        old_password: old_password,
        new_password: new_password,
        confirm_password: confirm_password,
      },
    })
      .then((response) => {
        console.log(response);
        successChangePassword.innerHTML = response.data.msg.successed;

        oldPasswordError.innerHTML = response.data.msg.old_password;
        newPasswordError.innerHTML = response.data.msg.new_password;
        confnewPasswordError.innerHTML = response.data.msg.confirm_password;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleUpdateInfo = async (e) => {
    e.preventDefault();

    await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/modify-user`,
      withCredentials: true,
      data: {
        firstName: firstName,
        lastName: lastName,

        gender: gender,
        birthdate: birthdate,
        whatDoUdo: whatDoUdo,
        phone: phone,
        nationality: nationality.label,
        aboutMe: aboutMe,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const handleUpdatePDP = async () => {
    if (!avatar) return console.log("No files were uploaded.");

    if (!avatar.size > 1024 * 1024) console.log("Size too large.");

    let data = new FormData();
    data.append("file", avatar);
    dispatch(uploadAvatar(data, userData));
  };
  return (
    <div class="row">
      <div class="col-lg-9 order-2 order-lg-0">
        <div class="white-bg">
          <div class="students-info-form">
            <h6 class="font-title--card">Your Information</h6>
            <form action="#">
              <div class="row g-3">
                <div class="col-lg-6">
                  <label for="fname">First Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter here..."
                    id="fname"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                  />
                </div>
                <div class="col-lg-6">
                  <label for="lname">Last Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter here..."
                    id="lname"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <label for="gender">Gender</label>
                  <select
                    class="form-control"
                    aria-label="Default select example"
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label for="birthdate">Birthdate</label>
                  <input
                    type="date"
                    id="birthdate"
                    class="form-control"
                    onChange={(e) => setBirthdate(e.target.value)}
                    value={birthdate}
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label for="wdu">What Do You Do</label>
                  <input
                    type="text"
                    id="wdu"
                    class="form-control"
                    placeholder="UI/UX Designer"
                    onChange={(e) => setWhatDoUdo(e.target.value)}
                    value={whatDoUdo}
                  />
                </div>
              </div>
              <div class="row g-3">
                <div class="col-lg-6">
                  <label for="pnumber">Phone Number</label>
                  <PhoneInput
                    class="form-control"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={setPhone}
                    style={{ color: "blue" }}
                  />
                </div>
                <div class="col-lg-6">
                  <label for="nationality">Nationality</label>
                  <Select
                    options={options}
                    value={nationality}
                    onChange={changeHandler}
                  />
                </div>
                <div class="form-floating">
                  <textarea
                    class="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "100px" }}
                    onChange={(e) => setAboutMe(e.target.value)}
                    value={aboutMe}
                  ></textarea>
                  <label for="floatingTextarea2">About me</label>
                </div>
              </div>

              <div class="d-flex justify-content-lg-end justify-content-center mt-2">
                <button
                  class="btn btn-outline-primary"
                  type="submit"
                  onClick={handleUpdateInfo}
                  disabled={
                    !firstName ||
                    !lastName ||
                    !gender ||
                    !birthdate ||
                    !phone ||
                    !nationality ||
                    !aboutMe
                  }
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
        {/*----------------------------------------------------------------------*/}
        <div class="white-bg mt-4">
          <div class="students-info-form">
            <h6 class="font-title--card">Change Password</h6>
            <form action="#" onSubmit={handleChangePassword}>
              <div class="row">
                <div class="col-12">
                  <label for="cpass">Current Password</label>
                  <div class="input-with-icon">
                    <input
                      class="form-control"
                      type="password"
                      placeholder="Enter Password"
                      id="old_password"
                      onChange={(e) => setOld_password(e.target.value)}
                      value={old_password}
                    />
                    <div className="refusedold text-danger"></div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label for="npass">New Password</label>
                  <div class="input-with-icon">
                    <input
                      class="form-control"
                      type="password"
                      placeholder="Enter Password"
                      id="new_password"
                      onChange={(e) => setNew_password(e.target.value)}
                      value={new_password}
                    />
                    <div className="refusednew text-danger"></div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label for="cnpass">Confirm New Password</label>
                  <div class="input-with-icon">
                    <input
                      class="form-control"
                      type="password"
                      placeholder="Enter Password"
                      id="confirm_password"
                      onChange={(e) => setConfirm_password(e.target.value)}
                      value={confirm_password}
                    />
                    <div className="refusedconf text-danger"></div>
                  </div>
                </div>
              </div>
              <div className="successed bg-success"></div>
              <div class="d-flex justify-content-lg-end justify-content-center mt-2">
                <button
                  class="btn btn-outline-primary"
                  type="submit"
                  disabled={!old_password || !new_password || !confirm_password}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
        {/*----------------------------------------------------------------------*/}
        <div class="white-bg mt-4">
          <div class="students-info-form">
            <div class="d-grid gap-2">
              <button
                class="btn btn-outline-info"
                type="button"
                onClick={handleDisable}
              >
                Disable Account
              </button>
              <button
                class="btn btn-outline-danger"
                type="button"
                onClick={handleDelete}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*----------------------------------------------------------------------*/}
      <div class="col-lg-3 order-1 order-lg-0 mt-4 mt-lg-0">
        <div class="white-bg">
          <div class="change-image-wizard">
            <div class="image mx-auto">
              <img src={userData.avatar} alt="User" />
            </div>
            <form action="#" onSubmit={handleUpdatePDP}>
              <input
                type="file"
                id="file"
                name="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
              <div class="d-flex justify-content-center">
                <input
                  type="submit"
                  class="button button--primary-outline"
                  value="  CHANGE iMAGE"
                />
              </div>
            </form>
            <p>Image size should be under 1024MB .</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
