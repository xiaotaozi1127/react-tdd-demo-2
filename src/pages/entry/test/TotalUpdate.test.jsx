import { render, screen } from "../../../test-utils/testing-library-utils";
import UserEvent from "@testing-library/user-event";

import Options from "../Options";

test("should update scoop subTotal when select number changes", async () => {
  render(<Options optionType="scoops" />);

  const subTotal = screen.getByText("Scoops total: $", { exact: false });
  expect(subTotal).toHaveTextContent("0.00");

  const vanillaSpinButton = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  UserEvent.clear(vanillaSpinButton);
  UserEvent.type(vanillaSpinButton, "1");
  expect(subTotal).toHaveTextContent("2.00");

  const chocolateSpinButton = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  UserEvent.clear(chocolateSpinButton);
  UserEvent.type(chocolateSpinButton, "2");
  expect(subTotal).toHaveTextContent("6.00");
});

test("should update topping subtotal when selected checkbox changes", async () => {
  render(<Options optionType="toppings" />);

  const subTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(subTotal).toHaveTextContent("0.00");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  UserEvent.click(cherriesCheckbox);
  expect(subTotal).toHaveTextContent("1.50");

  const mandmsCheckbox = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });
  UserEvent.click(mandmsCheckbox);
  expect(subTotal).toHaveTextContent("3.00");

  const hotfudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  UserEvent.click(hotfudgeCheckbox);
  expect(subTotal).toHaveTextContent("4.50");

  UserEvent.click(mandmsCheckbox);
  expect(subTotal).toHaveTextContent("3.00");
});
