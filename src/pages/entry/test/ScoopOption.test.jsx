import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScoopOption from "../ScoopOption";

test("should display warning when input invalid number", () => {
  render(
    <ScoopOption
      name="item"
      imagePath="http://localhost:3030/public/image"
      updateItemCount={jest.fn()}
    />
  );

  const spinButton = screen.getByRole("spinbutton");
  userEvent.clear(spinButton);
  userEvent.type(spinButton, "-2");
  expect(spinButton).toHaveClass("is-invalid");

  userEvent.clear(spinButton);
  userEvent.type(spinButton, "2");
  expect(spinButton).not.toHaveClass("is-invalid");

  userEvent.clear(spinButton);
  userEvent.type(spinButton, "2.4");
  expect(spinButton).toHaveClass("is-invalid");
});
