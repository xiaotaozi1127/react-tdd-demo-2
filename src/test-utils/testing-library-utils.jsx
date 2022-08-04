import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

const renderWithContxt = (ui, options) => {
  render(ui, { wrapper: OrderDetailsProvider }, { ...options });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithContxt as render };
