import React, { useEffect, useState } from "react";
import "../../styles/CourseDetails.css";

const BasicInfoCard = ({ course, t }) => {
  const [expandedModules, setExpandedModules] = useState(false);
  const [expandedTags, setExpandedTags] = useState(false);
  const [parsedLink, setParsedLink] = useState("");

  function parseLink(link) {
    if (/^https?:\/\//.test(link)) {
      const parts = link.split("://");
      let parsed = parts.length > 1 ? parts[1] : link;
      if (parsed.endsWith("/")) {
        parsed = parsed.slice(0, -1);
      }
      setParsedLink(parsed);
    } else {
      setParsedLink(link);
    }
  }

  const toggleExpandModules = () => {
    setExpandedModules(!expandedModules);
  };

  const toggleExpandTags = () => {
    setExpandedTags(!expandedTags);
  };
  useEffect(() => {
    if (course.link) {
      parseLink(course.link);
    }
  });

  return (
    <div>
      <h2 className="details-card-title">{t("info_box_title")}</h2>

      {course.espb && (
        <p className="details-basic-card-text">
          {t("espb")}: {course.espb}
        </p>
      )}
      {course.status && (
        <p className="details-basic-card-text">
          {t("status")}: {course.status}
        </p>
      )}
      {course.semester && (
        <p className="details-basic-card-text">
          {t("semester")}: {course.semester}
        </p>
      )}
      {course.level_of_study && (
        <p className="details-basic-card-text">
          {t("level_of_study")}: {course.level_of_study}
        </p>
      )}
      <div className="horizontal-separator-basic-info-card"></div>
      {course.tags && course.tags.length > 0 && (
        <div className="tags-preview">
          <h3 className="sidebar-subtitle">{t("tags")}:</h3>
          {course.tags.map((tag, index) => (
            <div className="tag-card" key={index}>
              {tag}
            </div>
          ))}
        </div>
      )}

      <div className="horizontal-separator-basic-info-card"></div>
      <div className="departments-preview">
        {" "}
        {course.departments && (
          <p className="sidebar-subtitle">
            {t("departments")}:
            <ul>
              {course.departments.map((item, index) => (
                <li className="details-basic-card-text" key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </p>
        )}
      </div>

      <div className="horizontal-separator-basic-info-card"></div>
      {course.note && course.note !== "" && (
        <div>
          {" "}
          <h3 className="sidebar-subtitle">{t("restrictions")}</h3>
          <p className="details-basic-card-text">
            <img src="./images/danger.png" alt="Warning" />
            {course.note}
          </p>
        </div>
      )}

      <div className="horizontal-separator-basic-info-card"></div>
      {course.link && course.link !== "" && (
        <div>
          {" "}
          <h3 className="sidebar-subtitle">{t("website")}:</h3>
          <p>
            <a href={course.link}>{parsedLink}</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default BasicInfoCard;
