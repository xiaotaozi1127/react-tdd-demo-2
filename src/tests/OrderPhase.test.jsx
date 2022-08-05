import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("happy order phase", async () => {
  //render app
  render(<App />);

  //add ice cream scoops and toppings
  const vanillaSpinButton = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaSpinButton);
  userEvent.type(vanillaSpinButton, "1");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);

  //find and click order button
  const orderbutton = screen.getByRole("button", { name: "Order Sundae!" });
  userEvent.click(orderbutton);

  //check summary information based on order
  const scoopsTotalSummary = screen.getByRole("heading", {
    name: "Scoops: $2.00",
  });
  expect(scoopsTotalSummary).toBeInTheDocument();

  const toppingsTotalSummary = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsTotalSummary).toBeInTheDocument();

  const totalSummary = screen.getByRole("heading", {
    name: "Total: $3.50",
  });
  expect(totalSummary).toBeInTheDocument();

  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  //accept terms and conditions and click button to confirm order
  const termsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });

  userEvent.click(termsCheckbox);
  userEvent.click(confirmOrderButton);

  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();
  //confirm order number on confirmation page
  const orderNumberText = await screen.findByText("Your order number is", {
    exact: false,
  });
  expect(orderNumberText).toHaveTextContent("12345");

  //click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: "Create new order",
  });
  userEvent.click(newOrderButton);

  //check that scoops and toppings subtotal has been reset
  const scoopsTotal = screen.getByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();

  const toppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  const grandTotalLabel = screen.getByRole("heading", {
    name: /grand total: \$/i,
  });
  expect(grandTotalLabel).toHaveTextContent("0.00");

  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Cherries" });
});
