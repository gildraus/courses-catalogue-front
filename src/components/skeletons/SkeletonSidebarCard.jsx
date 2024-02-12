import Skeleton from "./Skeleton";

import "../../styles/Skeleton.css";
import "../../styles/CoursesView.css";

const SkeletonSidebarCard= () => {
  return (
    <div className="filter-box">

      <div className="filter-box-header"><Skeleton classes="title width-50"></Skeleton></div>
      
      <Skeleton classes="text width-30"></Skeleton>
      <Skeleton classes="text width-30"></Skeleton>
      <Skeleton classes="text width-30"></Skeleton>
    </div>
  );
};

export default SkeletonSidebarCard;
