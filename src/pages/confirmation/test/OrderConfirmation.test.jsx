import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderConfirmation from "../OrderConfirmation";
import userEvent from "@testing-library/user-event";

test("display loading before server response order number", async () => {
  render(<OrderConfirmation />);
  const loadingText = screen.getByText("Loading");
  expect(loadingText).toBeInTheDocument();

  const orderNumberText = await screen.findByText("Your order number is", {
    exact: false,
  });
  expect(orderNumberText).toHaveTextContent("12345");
  const loadingTextAgain = screen.queryByText("Loading");
  expect(loadingTextAgain).not.toBeInTheDocument();
});

test("order confirmation page should display order number", async () => {
  render(<OrderConfirmation />);

  const orderNumberText = await screen.findByText("Your order number is", {
    exact: false,
  });
  expect(orderNumberText).toHaveTextContent("12345");
});

test("change order phase when click new order button", async () => {
  const updateOrderPhase = jest.fn();
  render(<OrderConfirmation updateOrderPhase={updateOrderPhase} />);

  const newOrderButton = await screen.findByRole("button", {
    name: "Create new order",
  });
  userEvent.click(newOrderButton);

  expect(updateOrderPhase).toBeCalledWith("inProgress");
});