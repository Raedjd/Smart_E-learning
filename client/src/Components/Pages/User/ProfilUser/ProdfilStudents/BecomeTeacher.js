import React, { useState } from "react";

import axios from "axios";

import Webcam from "react-webcam";

const BecomeTeacher = () => {
  const [dataFile, setDataFile] = useState("");

  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setDataFile(imageSrc);
  }, [webcamRef]);

  /*  const decodeFileBase64 = (base64String) => {
    // From Bytestream to Percent-encoding to Original string
    return decodeURIComponent(
      atob(base64String)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  };

  const decodeBase64 = decodeFileBase64(
    dataFile.substring(dataFile.indexOf(",") + 1)
  ); */

  const handleBecomeTeacher = async (e) => {
    e.preventDefault();

    if (!dataFile) return console.log("No files were uploaded.");

    if (!dataFile.size > 1024 * 1024) console.log("Size too large.");

    let data = new FormData();
    data.append("file", dataFile);

    //dispatch(handleBecomeTeacher(data, school, plan, userData));
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/upload/teacherData`,
      data,

      headers: { "content-type": "multipart/form-data" },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div class="col-lg ">
      <div class="main-become-instructor-item me-12">
        <div class="main-text">
          <h6 class="font-title--sm">Become an Instructor</h6>

          <div>
            <div class="students-info-form">
              <form action="#">
                <div class="col-12">
                  {/* <div class="my-5 js-school">
                <label
                  class="d-block mb-2 required-asterisked"
                  id="schools-label"
                >
                  What is the name of your school?
                </label>
                <p class="f6 color-fg-muted">
                  <strong class="color-fg-default">
                    Note:
                  </strong>{" "}
                  If your school is not listed, then enter the
                  full school name and continue.
                </p>

                <input
                  type="text"
                  id="wdu"
                  class="form-control"
                  placeholder="School name ... "
                  onChange={(e) => setSchool(e.target.value)}
                  value={school}
                />
              </div> */}
                  <div class="my-5 js-school">
                    <label
                      class="d-block mb-2 required-asterisked"
                      id="schools-label"
                    >
                      Give us some documents related to your profession!
                    </label>
                    <p class="f6 color-fg-muted">
                      (diploma, work certificate...)
                    </p>
                    {/*    <input
                  type="file"
                  id="file"
                  name="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) =>
                    setDataFile(e.target.files[0])
                  }
                /> */}
                    <Webcam
                      class="container"
                      audio={false}
                      height={720}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width={1000}

                      //videoConstraints={videoConstraints}
                    />
                    <button onClick={capture}>Take image</button>
                  </div>
                  {/*  <div class="row g-3">
                <label
                  class="d-block mb-2 required-asterisked"
                  id="schools-label"
                >
                  How do you plan to use Studently?
                </label>
                <div class="form-floating">
                  <textarea
                    class="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "100px" }}
                    onChange={(e) => setPlan(e.target.value)}
                    value={plan}
                  ></textarea>
                  <label for="floatingTextarea2">
                    Enter here...
                  </label>
                </div>
              </div> */}
                </div>

                <input
                  type="submit"
                  class="btn btn-outline-primary"
                  value="Apply as Instructor"
                  onSubmit={handleBecomeTeacher}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <p
        class="text-center text-primary font-weight-bold"
        style={{ color: "#42414b !important" }}
      >
        Yay! Wishing you a successful business. &#128525; &#x1F499;
      </p>
    </div>
  );
};

export default BecomeTeacher;
