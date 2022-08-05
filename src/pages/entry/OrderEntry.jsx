import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { useState, useEffect } from "react";

export default function OrderEntry({ updateOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(
      orderDetails.scoops.size === 0 || !orderDetails.validInput
    );
  }, [orderDetails]);

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand Total: {orderDetails.totals.grandTotal}</h2>
      <button
        disabled={buttonDisabled}
        onClick={() => updateOrderPhase("review")}
      >
        Order Sundae!
      </button>
    </div>
  );
}
