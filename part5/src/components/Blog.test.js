// import React from 'react'
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
// import userEvent from '@testing-library/user-event'
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "true",
    url: "ahigj",
    likes: 94,
  };

  const { container } = render(<Blog blog={blog} />);
  const div = container.querySelector(".whenHidden");
  screen.debug(div);
  expect(div).toHaveTextContent(
    "Component testing is done with react-testing-library"
  );
});

test("content after clicking view button", async () => {
  const blog = {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://localhost.com",
    likes: 100,
    user: {
      id: "kkkk",
    },
  };
  const user = {
    id: "kkkk",
    username: "kk",
  };

  const { container } = render(<Blog blog={blog} user={user} />);

  expect(container).toHaveTextContent("First class tests");
  expect(container.querySelector(".whenShown")).toBeNull();

  const button = screen.getByText("view");
  fireEvent.click(button);

  expect(container).toHaveTextContent(blog.url);
  expect(container).toHaveTextContent(`likes ${blog.likes}`);
  expect(container).toHaveTextContent(user.username);
});
