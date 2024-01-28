import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<AddBlogForm /> updates parent state and calls onSubmit", async () => {
  const user = userEvent.setup();
  const notifyWith = jest.fn();
  render(<BlogForm notifyWith={notifyWith} />);
  const newBlogButton = screen.getByText("new blog");
  fireEvent.click(newBlogButton);

  const titleInput = screen.getByPlaceholderText("write title here");
  const authorInput = screen.getByPlaceholderText("write author here");
  const urlInput = screen.getByPlaceholderText("write url here");
  const sendButton = screen.getByText("create");

  await user.type(titleInput, "title");
  await user.type(authorInput, "author");
  await user.type(urlInput, "http://localhost.com");
  await user.click(sendButton);
  const createButton = screen.getByText("create");
  fireEvent.click(createButton);

  expect(titleInput.value).toBe("title");
  expect(authorInput.value).toBe("author");
  expect(urlInput.value).toBe("http://localhost.com");
});
