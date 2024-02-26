import { useState } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import "../../styles/Test.css";

const Test = () => {
  const array = ["први", "други"];

  return (
    <div className="container">
      <button>Тест</button>
      <button className="active-filter">
        Ниво студија
        <CloseButton />
      </button>
    </div>
  );
};

export default Test;
