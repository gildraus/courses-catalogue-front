import { useState } from "react";
import "../../styles/Test.css";

const Test = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div>
      <button onClick={toggleSidebar}>dugme</button>
      <div className="hidding-div">nnhggfdhfgh</div>
    </div>
  );
};

export default Test;
