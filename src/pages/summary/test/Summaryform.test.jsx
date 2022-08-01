import SummaryForm from "../SummaryForm";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

  userEvent.click(checkbox);
  expect(button).toBeEnabled();

  userEvent.click(checkbox);
  expect(button).toBeDisabled();
});

test("popover only appear when we mouse over the terms and conditions", async () => {
  //initial state is hidden
  render(<SummaryForm />);
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  //popover appear when we mouse over on it
  const terms = screen.getByText(/terms and conditions/i);
  userEvent.hover(terms);

  const popOver = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popOver).toBeInTheDocument();

  //popover disappear when we move mouse away
  //Error: An update to Overlay inside a test was not wrapped in act(...).
  //how to fix it: need wait the element to be disappear from the dom
  //https://testing-library.com/docs/guide-disappearance/
  userEvent.unhover(terms);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
