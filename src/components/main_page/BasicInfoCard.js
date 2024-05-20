import React, { useState } from "react";
import "../../styles/CourseDetails.css";

const BasicInfoCard = ({ course }) => {
  const [expandedModules, setExpandedModules] = useState(false);
  const [expandedTags, setExpandedTags] = useState(false);

  const toggleExpandModules = () => {
    setExpandedModules(!expandedModules);
  };

  const toggleExpandTags = () => {
    setExpandedTags(!expandedTags);
  };

  return (
    <div>
      <h2>Картон предмета</h2>
      {/* <div className="level_of_study-waterfall-structure">
        {" "}
        <h4>Ниво студија:</h4>
        <ul>
          <li>{course.level_of_study}</li>
        </ul>
        <h4>Програми:</h4>
        <ul>
          {course.programs.map((item, index) => (
            <li key={index}> {item}</li>
          ))}
        </ul>
        <h4>Модули:</h4>
        <ul>
          {course.modules.map((item, index) => (
            <li key={index}> {item}</li>
          ))}
        </ul>
      </div> */}

      {course.espb && <p>Број ЕСПБ поена: {course.espb}</p>}
      {course.semester && <p>Семестар: {course.semester}</p>}

      {course.status && <p>Статус: {course.status}</p>}
      {course.departments && (
        <p>
          Катедре задужене за извођење предмета:
          <ul>
            {course.departments.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </p>
      )}

      {/* {course.modules && course.modules.length > 0 && (
        <div className="modules-preview">
          <p>Модули:</p>
          {course.modules
            .slice(0, expandedModules ? course.modules.length : 3)
            .map((module, index) => (
              <ul>
                <li key={index}>{module}</li>
              </ul>
            ))}
          {course.modules.length > 3 && !expandedModules && (
            <p>
              <span
                onClick={toggleExpandModules}
                style={{ cursor: "pointer", color: "blue" }}
              >
                + кликни за више
              </span>
            </p>
          )}
          {expandedModules && (
            <p>
              <span
                onClick={toggleExpandModules}
                style={{ cursor: "pointer", color: "blue" }}
              >
                - кликни за мање
              </span>
            </p>
          )}
        </div>
      )} */}

      {course.link && course.link !== "" && (
        <div>
          {" "}
          <p>
            Веб сајт: <a href={course.link}>{course.link}</a>
          </p>
        </div>
      )}
      {course.note && course.note !== "" && (
        <div>
          {" "}
          <h2>Напомена</h2>
          <p>
            <img src="./images/danger.png" alt="Warning" />
            {course.note}
          </p>
        </div>
      )}

      {course.tags && course.tags.length > 0 && (
        <div className="tags-preview">
          <p>Тагови:</p>
          {course.tags
            .slice(0, expandedTags ? course.tags.length : 3)
            .map((tag, index) => (
              <ul>
                <li key={index}>{tag}</li>
              </ul>
            ))}
          {course.tags.length > 3 && !expandedTags && (
            <p>
              <span
                onClick={toggleExpandTags}
                style={{ cursor: "pointer", color: "blue" }}
              >
                + кликни за више
              </span>
            </p>
          )}
          {expandedTags && (
            <p>
              <span
                onClick={toggleExpandTags}
                style={{ cursor: "pointer", color: "blue" }}
              >
                - кликни за мање
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BasicInfoCard;
