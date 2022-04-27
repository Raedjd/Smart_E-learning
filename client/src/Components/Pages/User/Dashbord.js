import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import cookie from "js-cookie";
import "./dashbord.css";
const Dashbord = () => {
  const userData = useSelector((state) => state.userReducer);
  const userId = cookie.get("id");
  console.log(userData.role);
  return userId ? (
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title text-uppercase mb-0">Manage Users</h5>
            </div>
            <div class="table-responsive">
              <table class="table no-wrap user-table mb-0">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      class="border-0 text-uppercase font-medium pl-4"
                    >
                      #
                    </th>
                    <th scope="col" class="border-0 text-uppercase font-medium">
                      Username
                    </th>

                    <th scope="col" class="border-0 text-uppercase font-medium">
                      Email
                    </th>
                    <th scope="col" class="border-0 text-uppercase font-medium">
                      Added
                    </th>
                    <th scope="col" class="border-0 text-uppercase font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="pl-4">1</td>
                    <td>
                      <h5 class="font-medium mb-0">Daniel Kristeen</h5>
                      <span class="text-muted">Texas, Unitedd states</span>
                    </td>

                    <td>
                      <span class="text-muted">daniel@website.com</span>
                      <span class="text-muted">999 - 444 - 555</span>
                    </td>
                    <td>
                      <span class="text-muted">15 Mar 1988</span>
                      <span class="text-muted">10: 55 AM</span>
                    </td>
                    <td>
                      <select
                        class="form-control category-select"
                        id="exampleFormControlSelect1"
                      >
                        <option>Modulator</option>
                        <option>Admin</option>
                        <option>User</option>
                        <option>Subscriber</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/notfound" />
  );
};

export default Dashbord;
