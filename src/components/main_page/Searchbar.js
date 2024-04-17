import "../../styles/Searchbar.css";
import React, { useState } from "react";

const langmap = {
  А: "A",
  Б: "B",
  В: "V",
  Г: "G",
  Д: "D",
  Ђ: "Đ",
  Е: "E",
  Ж: "Ž",
  З: "Z",
  И: "I",
  Ј: "J",
  К: "K",
  Л: "L",
  Љ: "Lj",
  М: "M",
  Н: "N",
  Њ: "Nj",
  О: "O",
  П: "P",
  Р: "R",
  С: "S",
  Т: "T",
  Ћ: "Ć",
  У: "U",
  Ф: "F",
  Х: "H",
  Ц: "C",
  Ч: "Č",
  Џ: "Dž",
  Ш: "Š",
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  ђ: "đ",
  е: "e",
  ж: "ž",
  з: "z",
  и: "i",
  ј: "j",
  к: "k",
  л: "l",
  љ: "lj",
  м: "m",
  н: "n",
  њ: "nj",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  ћ: "ć",
  у: "u",
  ф: "f",
  х: "h",
  ц: "c",
  ч: "č",
  џ: "dž",
  ш: "š",
};

function remapLang(str) {
  return str.replace(/[^\u0000-\u007E]/g, function (a) {
    return langmap[a] || a;
  });
}

const Searchbar = ({
  allCourses,
  coursesToShow,
  setCoursesToShow,
  setSelectedCourse,
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const inputValue = remapLang(event.target.value.toLowerCase());
    setQuery(inputValue);

    if (inputValue.length >= 1) {
      let filteredSuggestions = allCourses.filter(
        (item) =>
          item.name &&
          item.name.trim() !== "" &&
          (remapLang(item.name.toLowerCase()).startsWith(inputValue) ||
            item.tags.some((tag) =>
              remapLang(tag.toLowerCase()).startsWith(inputValue)
            ) ||
            item.departments.some((department) =>
              remapLang(department.toLowerCase()).startsWith(inputValue)
            ))
      );

      // ovdje dodajem funkcionalnost sakrivanja duplikata

      let uniqueNamesSet = new Set();

      filteredSuggestions = filteredSuggestions.filter((item) => {
        if (!uniqueNamesSet.has(item.name)) {
          uniqueNamesSet.add(item.name);
          return true;
        }
        return false;
      });

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleButtonClick = () => {
    setCoursesToShow(suggestions);
  };

  const test = () => {};

  return (
    <div className="header">
      <div className="search-bar-logo">KATALOG KURSEVA</div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Претражите курсеве по називу, тагу, називу катедре..."
          value={query}
          onChange={handleInputChange}
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li onClick={() => setSelectedCourse(suggestion)} key={index}>
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="submit-button">
        <button onClick={handleButtonClick} type="submit">
          Претражи
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
