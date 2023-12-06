import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogMoreInfo from "./BlogMoreInfo";

test("checks that the blog's URL and number of likes are shown when the button controlling the shown details has been clicked", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "filip",
    likes: 0,
    url: "url",
  };

  const mockHandler = jest.fn();

  render(
    <BlogMoreInfo
      blog={blog}
      handleLikeBlog={mockHandler}
      handleRemoveBlog={mockHandler}
    />
  );

  const button = screen.getByText("like");
  await userEvent.click(button);

  // Check if the blog's URL and number of likes are shown
  expect(screen.getByText(blog.url)).toBeInTheDocument();
  expect(screen.getByText(`Likes: ${blog.likes}`)).toBeInTheDocument();
});

test("ensures that if the like button is clicked twice, the event handler the component received as props is called twice", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "filip",
    likes: 0,
    url: "url",
  };

  const mockHandler = jest.fn();

  render(
    <BlogMoreInfo
      user={mockHandler}
      blog={blog}
      handleLikeBlog={mockHandler}
      handleRemoveBlog={mockHandler}
    />
  );

  const button = screen.getByText("like");
  await userEvent.click(button);
  await userEvent.click(button);

  expect(mockHandler).toHaveBeenCalledTimes(2);
});
