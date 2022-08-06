import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";

export default function ScoopOption({ name, imagePath, updateItemCount }) {
  const [validInput, setValidInput] = useState(true);

  const handleChange = (event) => {
    let targetValue = event.target.value;
    let floatValue = parseFloat(targetValue);
    let isValid = Math.floor(floatValue) === floatValue && floatValue >= 0;
    //when i type 3.5, it will be triggered twice, first time value is 3, second time value is 3.5.
    //https://github.com/react-bootstrap/react-bootstrap/issues/6423
    console.log("target value=" + targetValue + "; isValid=" + isValid);
    setValidInput(isValid);
    updateItemCount(targetValue, isValid);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
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
            onChange={handleChange}
            isInvalid={!validInput}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
