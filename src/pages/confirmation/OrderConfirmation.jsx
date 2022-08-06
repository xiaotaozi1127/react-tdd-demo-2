import { useEffect, useState } from "react";
import axios from "axios";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

export default function OrderConfirmation({ updateOrderPhase }) {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [serverError, setServerError] = useState(false);

  const handleButtonClick = () => {
    resetOrder();
    updateOrderPhase("inProgress");
  };

  useEffect(() => {
    axios
      .post("http://localhost:3030/order", null)
      .then((response) => {
        setOrderNumber(response.data["orderNumber"]);
      })
      .catch((error) =>
        //TODO: handle error later
        setServerError(true)
      );
  }, []);

  if (serverError) {
    return <AlertBanner message={null} variant={null} />;
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank you!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: "50%" }}>
          as per our terms and conditions, nothing will happen now.
        </p>
        <button onClick={handleButtonClick}>Create new order</button>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
