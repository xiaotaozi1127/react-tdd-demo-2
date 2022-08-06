import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";

export default function ScoopOption({ name, imagePath, updateItemCount }) {
  const [validInput, setValidInput] = useState(true);

  const handleNumberChange = (event) => {
    let integerValue = parseInt(event.target.value);
    let floatValue = parseFloat(event.target.value);
    let isValid = integerValue === floatValue && integerValue >= 0;
    setValidInput(isValid);
    updateItemCount(name, event.target.value, isValid);
  };

  return (
    <Col xs={12} sm={6} md={4} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030${imagePath}`}
        alt={`${name} scoop`}
      ></img>
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ margionTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleNumberChange}
          />
          {!validInput && (
            <label style={{ color: "red", backgroundColor: "yellow" }}>
              invalid input
            </label>
          )}
        </Col>
      </Form.Group>
    </Col>
  );
}
