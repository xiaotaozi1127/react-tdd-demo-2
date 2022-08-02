import { render, screen, waitFor } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { server } from "../../../mocks/server";
import { rest } from "msw";

test.only("display alert banner when server response error", async () => {
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
