import Skeleton from "./Skeleton";

import "../../styles/Skeleton.css";
import "../../styles/CoursesView.css";

const SkeletonCourseCard = () => {
  return (
    <div className="courses-view-card">
      <div className="courses-view-card-left ">
        <img src="./images/Imagery.png" alt="" />
      </div>
      <div className="courses-view-card-right">
        <Skeleton classes="title width-100"></Skeleton>
        <Skeleton classes="text width-50"></Skeleton>
        <Skeleton classes="text width-30"></Skeleton>
        <Skeleton classes="text width-50"></Skeleton>
      </div>
    </div>
  );
};

export default SkeletonCourseCard;
