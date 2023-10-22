import React from "react";
import Header from "../Components/Header";
import Content from "../Components/Content";

const Course = ({ course }) => {
  return (
    <>
      <Header name={"Web Development Curriculum"} />
      <Header name={course[0].name} />
      <Content parts={course[0].parts} />
      <Header name={course[1].name} />
      <Content parts={course[1].parts} />
    </>
  );
};

export default Course;
