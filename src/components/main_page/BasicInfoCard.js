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
 

      {course.espb && <p>Број ЕСПБ поена: {course.espb}</p>}
      {course.status && <p>Статус: {course.status}</p>}
      {course.semester && <p>Семестар: {course.semester}</p>}
      {course.level_of_study && <p>Ниво студија: {course.level_of_study}</p>}
      {course.tags && course.tags.length > 0 && (
        <div className="tags-preview">
          <h3>Тагови:</h3>
      {course.tags.map((tag,index)=>(
        <div className="tag-card" key={index}>{tag}</div>
        
      ))}
    
      
        </div>
      )}

      <div className="horizontal-separator-basic-info-card"></div>
      
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
          <h3>Напомена</h3>
          <p>
            <img src="./images/danger.png" alt="Warning" />
            {course.note}
          </p>
        </div>
      )}

     
    </div>
  );
};

export default BasicInfoCard;