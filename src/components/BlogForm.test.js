import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("test checks that the form calls the event handler it received as props with the right details when a new blog is created.", async () => {
  const createBlog = jest.fn();

  render(<BlogForm createBlog={createBlog} />);

  const titleInput = screen.getByLabelText("title:");
  const authorInput = screen.getByLabelText("author:");
  const urlInput = screen.getByLabelText("url:");
  const sendButton = screen.getByText("create");

  await userEvent.type(titleInput, "Test Title");
  await userEvent.type(authorInput, "Test Author");
  await userEvent.type(urlInput, "http://testurl.com");

  userEvent.click(sendButton);

  await waitFor(() => {
    expect(createBlog).toHaveBeenCalledTimes(1);
    expect(createBlog).toHaveBeenCalledWith({
      title: "Test Title",
      author: "Test Author",
      url: "http://testurl.com",
    });
  });
});
