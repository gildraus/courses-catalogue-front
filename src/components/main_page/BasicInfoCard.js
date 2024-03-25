import "../../styles/CourseDetails.css";

const BasicInfoCard = ({ selectedCourse }) => {
  const course = selectedCourse;
  return (
    <div>
      {" "}
      <h2>Картон предмета</h2>
      <p>
        Веб сајт: <a href={course.link}>{course.link}</a>
      </p>
      <p>Број ЕСПБ поена: {course.espb}</p>
      <p>Семестар: {course.semester}</p>
      <p>Статус: {course.status}</p>
      <p>Модул: {course.modules[0]}</p>
      <p>Тагови:</p>
      {course.tags.map((tag, index) => (
        <p key={index}>{tag}</p>
      ))}
      <h2>Напомена</h2>
      <p>
        <img src="./images/danger.png" />
        {course.note}
      </p>
    </div>
  );
};

export default BasicInfoCard;
