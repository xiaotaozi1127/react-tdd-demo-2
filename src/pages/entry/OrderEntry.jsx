import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderEntry({ updateOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand Total: {orderDetails.totals.grandTotal}</h2>
      <button onClick={() => updateOrderPhase("review")}>Order Sundae!</button>
    </div>
  );
}
