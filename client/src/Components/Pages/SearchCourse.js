import React, { useEffect, useState } from "react";
import Cardour from "./Cardour";
import axios from "axios";

const SearchCourse = () => {
  const [data, setData] = useState([]);
  const [searchs, setSearchs] = useState("");
  const [catData, setCatData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/categories").then((data) => {
      setCatData(data.data);
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:5000/courses").then((data) => {
      setCourses(data.data.data);
      console.log(data.data.data[3]);
    });
  }, []);

  const [courses, setCourses] = useState([]);
  const [catArr, setCatArr] = useState([]);
  useEffect(() => {
    setData(courses);
  }, []);

  const handleSearch = (e) => {
    setSearchs(e.target.value);
  };
  const SearchCourse = (e) => {
    e.preventDefault();
    let searchArr = data.filter((course) => course.title === searchs);
    setCourses(searchArr);
  };
  const checkingHandle = (e) => {
    let checked = e.target.checked;
    if (checked) {
      setCatArr((old) => [...old, e.target.value]);
    } else {
      let pos = catArr.indexOf(e.target.value);
      let arr = [...catArr];
      arr.splice(pos, 1);
      setCatArr(arr);
    }
  };
  if (courses.length == 0) {
    return <div>There is no courses for the moment</div>;
  } else
    return (
      <div>
        <section class="section event-search" style={{ marginTop: "50px" }}>
          <div class="container">
            <div class="row">
              <div class="col-lg-9 mx-auto">
                <div class="event-search-bar">
                  <form action="#">
                    <div class="form-input-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Search Course..."
                        onChange={handleSearch}
                      />
                      <button
                        class="button button-lg button--primary"
                        type="submit"
                        id="button-addon2"
                        onClick={SearchCourse}
                      >
                        Search
                      </button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-search"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-4 d-none d-lg-block">
                <div class="accordion sidebar-filter" id="sidebarFilter">
                  {/* <!-- Category 2222222 --> */}
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="categoryAcc">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#categoryCollapse"
                        aria-expanded="true"
                        aria-controls="categoryCollapse"
                      >
                        category
                      </button>
                    </h2>
                    <div
                      id="categoryCollapse"
                      class="accordion-collapse collapse show"
                      aria-labelledby="categoryAcc"
                      data-bs-parent="#sidebarFilter"
                    >
                      <div class="accordion-body">
                        <form action="#">
                          {catData.map((e) => (
                            <div class="accordion-body__item">
                              <div class="check-box">
                                <input
                                  type="checkbox"
                                  class="checkbox-primary"
                                  value={e.name}
                                  onChange={checkingHandle}
                                />
                                <label> {e.name} </label>
                              </div>
                            </div>
                          ))}
                        </form>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Level  --> */}
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="levelAcc">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#levelCollapse"
                        aria-expanded="false"
                        aria-controls="levelCollapse"
                      >
                        Level
                      </button>
                    </h2>
                    <div
                      id="levelCollapse"
                      class="accordion-collapse collapse"
                      aria-labelledby="levelAcc"
                      data-bs-parent="#sidebarFilter"
                    >
                      <div class="accordion-body">
                        <form action="#">
                          <div class="accordion-body__item">
                            <div class="check-box">
                              <input type="checkbox" class="checkbox-primary" />
                              <label> All </label>
                            </div>
                            <p class="check-details">1,54,750</p>
                          </div>
                          <div class="accordion-body__item">
                            <div class="check-box">
                              <input type="checkbox" class="checkbox-primary" />
                              <label> Beginner </label>
                            </div>
                            <p class="check-details">45,770</p>
                          </div>
                          <div class="accordion-body__item">
                            <div class="check-box">
                              <input type="checkbox" class="checkbox-primary" />
                              <label> Intermediate </label>
                            </div>
                            <p class="check-details">35,790</p>
                          </div>
                          <div class="accordion-body__item">
                            <div class="check-box">
                              <input type="checkbox" class="checkbox-primary" />
                              <label> Advanced </label>
                            </div>
                            <p class="check-details">5,770</p>
                          </div>
                          <div class="accordion-body__item">
                            <div class="check-box">
                              <input type="checkbox" class="checkbox-primary" />
                              <label> Expert </label>
                            </div>
                            <p class="check-details">765</p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-8">
                <div class="event-search-results">
                  <div class="event-search-results-heading">
                    <button
                      class="button button-lg button--primary button--primary-filter d-lg-none"
                      id="filter"
                    >
                      <span>
                        <svg
                          width="19"
                          height="16"
                          viewBox="0 0 19 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.3335 14.9999V9.55554"
                            stroke="white"
                            stroke-width="1.7"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M3.3335 6.4444V1"
                            stroke="white"
                            stroke-width="1.7"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M9.55469 14.9999V8"
                            stroke="white"
                            stroke-width="1.7"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M9.55469 4.88886V1"
                            stroke="white"
                            stroke-width="1.7"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M15.7773 14.9999V11.1111"
                            stroke="white"
                            stroke-width="1.7"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M15.7773 7.99995V1"
                            stroke="white"
                            stroke-width="1.7"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M1 9.55554H5.66663"
                            stroke="white"
                            stroke-width="1.7"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M7.22217 4.88867H11.8888"
                            stroke="white"
                            stroke-width="1.7"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M13.4443 11.1111H18.111"
                            stroke="white"
                            stroke-width="1.7"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </span>
                      Filter
                    </button>
                  </div>
                </div>
                <div class="row event-search-content">
                  {catArr.length === 0
                    ? courses.map((e) => (
                        <Cardour
                          name={e.title}
                          image={e.selectedFile}
                          //  creatorImage={e.creator.image}
                          // creatorImage={e.creator.image}
                          creatorName={e.name}
                          price={e.price + "$"}
                        />
                      ))
                    : courses
                        .filter((course) => {
                          if (catArr.indexOf(course.category) !== -1) {
                            return course;
                          }
                        })
                        .map((e) => (
                          <Cardour
                            name={e.title}
                            image={e.selectedFile}
                            creatorImage={e.creator.image}
                            creatorName={e.name}
                            price={e.price + "$"}
                          />
                        ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
};

export default SearchCourse;
