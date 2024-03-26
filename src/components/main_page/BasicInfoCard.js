import React, { useState } from 'react';
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
      <p>
        Веб сајт: <a href={course.link}>{course.link}</a>
      </p>
      <p>Број ЕСПБ поена: {course.espb}</p>
      <p>Семестар: {course.semester}</p>
      <p>Статус: {course.status}</p>
      <p>Модули:</p>
      <div className="modules-preview">
        {coursesOfTheSameName.slice(0, expandedModules ? coursesOfTheSameName.length : 3).map((item) => (
          <p key={item.course_id}>{item.modules[0]}</p>
        ))}
        {coursesOfTheSameName.length > 3 && !expandedModules && (
          <p>
            <span onClick={toggleExpandModules} style={{ cursor: 'pointer', color: 'blue' }}>
              + кликни за више
            </span>
          </p>
        )}
        {expandedModules && (
          <p>
            <span onClick={toggleExpandModules} style={{ cursor: 'pointer', color: 'blue' }}>
              - кликни за мање
            </span>
          </p>
        )}
      </div>
      <p>Тагови:</p>
      <div className="tags-preview">
        {course.tags.slice(0, expandedTags ? course.tags.length : 3).map((tag, index) => (
          <p key={index}>{tag}</p>
        ))}
        {course.tags.length > 3 && !expandedTags && (
          <p>
            <span onClick={toggleExpandTags} style={{ cursor: 'pointer', color: 'blue' }}>
              + кликни за више
            </span>
          </p>
        )}
        {expandedTags && (
          <p>
            <span onClick={toggleExpandTags} style={{ cursor: 'pointer', color: 'blue' }}>
              - кликни за мање
            </span>
          </p>
        )}
      </div>
      <h2>Напомена</h2>
      <p>
        <img src="./images/danger.png" alt="Warning" />
        {course.note}
      </p>
    </div>
  );
};

export default BasicInfoCard;
