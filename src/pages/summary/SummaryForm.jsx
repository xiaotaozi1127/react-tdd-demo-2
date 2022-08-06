import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function SummaryForm({ updateOrderPhase }) {
  const [tcChecked, setTcChecked] = useState(false);
  const [orderDetails] = useOrderDetails();
  const totals = orderDetails.totals;

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  const scoopsArray = Array.from(orderDetails.scoops);
  const scoopsOptions = scoopsArray.map(([key, value]) => (
    <li key={key}>{`${value} ${key}`}</li>
  ));

  let toppingHeadingDisplay = null;
  if (orderDetails.toppings.size > 0) {
    const toppingsArray = Array.from(orderDetails.toppings);
    const toppingsOptions = toppingsArray.map(([key, value]) => (
      <li key={key}>{key}</li>
    ));
    toppingHeadingDisplay = (
      <>
        <h2>Toppings: {totals.toppings}</h2>
        <ul>{toppingsOptions}</ul>
      </>
    );
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {totals.scoops}</h2>
      <ul>{scoopsOptions}</ul>
      {toppingHeadingDisplay}
      <h2>Total: {totals.grandTotal}</h2>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          updateOrderPhase("completed");
        }}
      >
        <Form.Group controlId="terms and conditions">
          <Form.Check
            type="checkbox"
            checked={tcChecked}
            onChange={(e) => setTcChecked(e.target.checked)}
            label={checkboxLabel}
          ></Form.Check>
        </Form.Group>
        <Button
          variant="primary"
          style={{ marginTop: "10px" }}
          disabled={!tcChecked}
          type="submit"
        >
          Confirm order
        </Button>
      </Form>
    </div>
  );
}
