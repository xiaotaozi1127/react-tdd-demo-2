import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import UserEvent from "@testing-library/user-event";
import OrderEntry from "../OrderEntry";
import { server } from "../../../mocks/server";
import { rest } from "msw";

test("display alert banner when server response error", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);
  // Wait until the callback does not throw an error. In this case, that means
  // it'll wait until the mock function has been called once.
  await waitFor(async () => {
    const alertBanners = await screen.findAllByRole("alert");
    expect(alertBanners).toHaveLength(2);
  });
});

describe("grand total test", () => {
  test("display grand total when add scoops first", async () => {
    render(<OrderEntry />);
    const grandTotalLabel = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotalLabel).toHaveTextContent("0.00");
    const vanillaSpinButton = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    UserEvent.clear(vanillaSpinButton);
    UserEvent.type(vanillaSpinButton, "1");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    UserEvent.click(cherriesCheckbox);

    expect(grandTotalLabel).toHaveTextContent("3.50");
  });

  test("display grand total when add toppings first", async () => {
    render(<OrderEntry />);
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    UserEvent.click(cherriesCheckbox);

    const vanillaSpinButton = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    UserEvent.clear(vanillaSpinButton);
    UserEvent.type(vanillaSpinButton, "1");
    const grandTotalLabel = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotalLabel).toHaveTextContent("3.50");
  });

  test("display grand total when remove one item from scoops", async () => {
    render(<OrderEntry />);
    const vanillaSpinButton = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    UserEvent.clear(vanillaSpinButton);
    UserEvent.type(vanillaSpinButton, "2");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    UserEvent.click(cherriesCheckbox);
    const grandTotalLabel = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotalLabel).toHaveTextContent("5.50");
    UserEvent.clear(vanillaSpinButton);
    UserEvent.type(vanillaSpinButton, "1");
    expect(grandTotalLabel).toHaveTextContent("3.50");
  });
});

test("change orderPhase state when click order button", () => {
  const updateOrderPhase = jest.fn();
  render(<OrderEntry updateOrderPhase={updateOrderPhase} />);

  const orderButton = screen.getByRole("button", { name: "Order Sundae!" });
  UserEvent.click(orderButton);
  expect(updateOrderPhase).toBeCalledWith("review");
});
