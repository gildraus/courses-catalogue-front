import React, { useState } from "react";
import "../../styles/CourseDetails.css";

const BasicInfoCard = ({ selectedCourse, coursesOfTheSameName }) => {
  const course = selectedCourse;
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

      <h4>Ниво студија</h4>
      <ul>
        <li>{course.level_of_study}</li>
        <ul>
          <li>{course.program}</li>
          <ul>
            {course.modules.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </ul>
      </ul>
     
      {course.espb && <p>Број ЕСПБ поена: {course.espb}</p>}
      {course.semester && <p>Семестар: {course.semester}</p>}

      {course.status && <p>Статус: {course.status}</p>}
      {course.departments && <p>
        Катедре:
        <ul>
          {course.departments.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </p>}
      <p>Модули:</p>
      <div className="modules-preview">
        {coursesOfTheSameName
          .slice(0, expandedModules ? coursesOfTheSameName.length : 3)
          .map((item) => (
            <ul>
              <li key={item.course_id}>{item.modules[0]}</li>
            </ul>
          ))}
        {coursesOfTheSameName.length > 3 && !expandedModules && (
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
      {course.link && course.link !== "" && (
        <div>
          {" "}
          <p>
            Веб сајт: <a href={course.link}>{course.link}</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default BasicInfoCard;
