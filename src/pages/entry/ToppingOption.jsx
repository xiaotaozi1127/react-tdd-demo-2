import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export default function ToppingOption({ name, imagePath, updateItemCount }) {
  const handleChange = (event) => {
    let newItemCount = event.target.checked ? 1 : 0;
    updateItemCount(name, newItemCount, true);
  };

  return (
    <Col xs={12} sm={6} md={4} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030${imagePath}`}
        alt={`${name} topping`}
      ></img>
      <Form.Group controlId={`${name}-topping-checkobx`}>
        <Form.Check type="checkbox" label={name} onChange={handleChange} />
      </Form.Group>
    </Col>
  );
}
