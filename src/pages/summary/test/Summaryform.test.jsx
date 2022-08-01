import SummaryForm from "../SummaryForm";
import { render, screen, fireEvent } from "@testing-library/react";

test("checkbox and button initital state", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const button = screen.getByRole("button", { name: "Confirm order" });

  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toBeChecked();
  expect(button).toBeInTheDocument();
  expect(button).toBeDisabled();
});

test("only check checkbox, button can be enabled", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const button = screen.getByRole("button", { name: "Confirm order" });

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
});
