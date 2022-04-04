import React, { useState } from "react";

import axios from "axios";

const BecomeTeacher = () => {
  const [dataFile, setDataFile] = useState("");
  const dm = document.querySelector(".dm");
  const handleBecomeTeacher = async (e) => {
    e.preventDefault();

    if (!dataFile) return console.log("No files were uploaded.");

    if (!dataFile.size > 1024 * 1024) console.log("Size too large.");

    let data = new FormData();
    data.append("file", dataFile);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/upload/teacherData`,
      data,

      headers: { "content-type": "multipart/form-data" },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
        dm.innerHTML = "Thank you for the request, wait for our response.";
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
              <form action="#" onSubmit={handleBecomeTeacher}>
                <div class="col-12">
                  <label
                    class="d-block mb-2 required-asterisked"
                    id="schools-label"
                  >
                    Give us some documents related to your profession!
                  </label>
                  <p class="f6 color-fg-muted">
                    (diploma, work certificate...)
                  </p>

                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept=".jpg, .jpeg, .png, .pdf"
                    onChange={(e) => setDataFile(e.target.files[0])}
                  />
                  <p>File size should be under 1024MB .</p>
                </div>

                <input
                  type="submit"
                  class="btn btn-outline-primary"
                  value="Apply as Instructor"
                  disabled={!dataFile}
                />
                <div className="dm  text-primary"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <p class="text-center text-primary text-opacity-50">
        Yay! Wishing you a successful business. &#128525; &#x1F499;
      </p>
    </div>
  );
};

export default BecomeTeacher;
