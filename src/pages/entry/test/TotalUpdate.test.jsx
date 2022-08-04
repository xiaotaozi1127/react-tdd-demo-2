import { render, screen } from "../../../test-utils/testing-library-utils";
import UserEvent from "@testing-library/user-event";

import Options from "../Options";

test("should update subTotal when select number changes", async () => {
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
