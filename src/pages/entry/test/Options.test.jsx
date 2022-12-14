import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("displays image for each scoop from mock server", async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test.only("scoops total will not change if input invalid scoops count", async () => {
  render(<Options optionType="scoops" />);

  const vanillaSpinButton = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaSpinButton);
  userEvent.type(vanillaSpinButton, "-1");

  const scoopsTotal = screen.getByText("Scoops total", { exact: false });
  expect(scoopsTotal).toHaveTextContent("$0.00");

  const chocolateSpinButton = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateSpinButton);
  userEvent.type(chocolateSpinButton, "3.5");
  expect(scoopsTotal).toHaveTextContent("$0.00");
});

test("display images for each topping from mock server", async () => {
  render(<Options optionType="toppings" />);

  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
