import React, { useEffect } from "react";
import "./css/Filter.css";
function LevelFilter({ allquizes, setFilterLevel, levelName, setLevelName }) {
  useEffect(() => {
    if (levelName === "All") {
      setFilterLevel(allquizes);
      return;
    }
    if (levelName === "-10") {
      const Filtered = allquizes.filter((quiz) => quiz.numberOfQuestion < 10);
      setFilterLevel(Filtered);
      return;
    }
    if (levelName === "+10") {
      const Filtered = allquizes.filter((quiz) => quiz.numberOfQuestion > 10);
      setFilterLevel(Filtered);
      return;
    }
    if (levelName === "+20") {
      const Filtered = allquizes.filter((quiz) => quiz.numberOfQuestion > 20);
      setFilterLevel(Filtered);
      return;
    }
    if (levelName === "+30") {
      const Filtered = allquizes.filter((quiz) => quiz.numberOfQuestion > 30);
      setFilterLevel(Filtered);
      return;
    }
    const Filtered = allquizes.filter((quiz) => quiz.level === levelName);
    setFilterLevel(Filtered);
  }, [levelName]);
  return (
    <div>
      <div class="accordion-item filter-div">
        <h2 class="accordion-header" id="categoryAcc">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#categoryCollapse"
            aria-expanded="true"
            aria-controls="categoryCollapse"
          >
            Level
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
              <div class="accordion-body__item">
                <div class="check-box">
                  <button
                    className="btn btn-light filter-btn"
                    onClick={() => setLevelName("All")}
                  >
                    All
                  </button>
                </div>
              </div>
              <div class="accordion-body__item">
                <div class="check-box">
                  <button
                    className="btn btn-light filter-btn"
                    onClick={() => setLevelName("beginner")}
                  >
                    Beginner
                  </button>
                </div>
              </div>
              <div class="accordion-body__item">
                <div class="check-box">
                  <button
                    className="btn btn-light filter-btn"
                    onClick={() => setLevelName("Medium")}
                  >
                    Meduim
                  </button>
                </div>
              </div>
              <div class="accordion-body__item">
                <div class="check-box">
                  <button
                    className="btn btn-light filter-btn"
                    onClick={() => setLevelName("advanced")}
                  >
                    Advanced
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
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
            Number of Question
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
                  <button
                    className="btn btn-light filter-btn"
                    onClick={() => setLevelName("-10")}
                  >
                    -10 Questions
                  </button>
                </div>
                <div class="check-box">
                  <button
                    className="btn btn-light filter-btn"
                    onClick={() => setLevelName("+10")}
                  >
                    +10 Questions
                  </button>
                </div>
                <div class="check-box">
                  <button
                    className="btn btn-light filter-btn"
                    onClick={() => setLevelName("+20")}
                  >
                    +20 Questions
                  </button>
                </div>
                <div class="check-box">
                  <button
                    className="btn btn-light filter-btn"
                    onClick={() => setLevelName("+30")}
                  >
                    +30 Questions
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LevelFilter;
