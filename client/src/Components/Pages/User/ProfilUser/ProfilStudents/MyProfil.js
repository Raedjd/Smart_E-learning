import React from "react";
import { useSelector } from "react-redux";
const MyProfil = () => {
  const dateParser = (num) => {
    let options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    let timestamp = Date.parse(num);

    let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

    return date.toString();
  };
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  return (
    <div class="tab-content__profile">
      <div class="tab-content__profile-content">
        <div class="info-student">
          <h6 class="font-title--card">{userData.username} Information</h6>

          <dl class="row my-0 info-student-topic">
            <dt class="col-sm-4">
              <span>E-mail</span>
            </dt>
            <dd class="col-sm-8">
              <p>{userData.email}</p>
            </dd>
          </dl>
          <dl class="row my-0 info-student-topic">
            <dt class="col-sm-4">
              <span>What do you do</span>
            </dt>
            <dd class="col-sm-8">
              <p>{userData.whatDoUdo}</p>
            </dd>
          </dl>
          <dl class="row my-0 info-student-topic">
            <dt class="col-sm-4">
              <span>Phone Number</span>
            </dt>
            <dd class="col-sm-8">
              <p>{userData.phone}</p>
            </dd>
          </dl>
          <dl class="row my-0 info-student-topic">
            <dt class="col-sm-4">
              <span>Nationality</span>
            </dt>
            <dd class="col-sm-8">
              <p>{userData.nationality}</p>
            </dd>
          </dl>
          <dl class="row my-0 info-student-topic">
            <dt class="col-sm-4">
              <span>Member since</span>
            </dt>
            <dd class="col-sm-8">
              <p>{dateParser(userData.createdAt)}</p>
            </dd>
          </dl>
        </div>
      </div>
      <div class="tab-content__profile-content">
        <div class="info-student">
          <h6 class="font-title--card"> Information</h6>
        </div>
      </div>
    </div>
  );
};

export default MyProfil;
