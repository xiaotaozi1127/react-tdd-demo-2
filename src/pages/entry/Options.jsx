import axios from "axios";
import ScoopOption from "./ScoopOption";
import Row from "react-bootstrap/Row";

//run as many times when depdendency change
import { useEffect, useState } from "react";

export default function Options({ optionType }) {
  //useState return array of getter and setter
  const [items, setItems] = useState([]);

  //if dependency array if empty, then it will run when the component mount
  //optionType is scoops or toppings
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        //TODO: handle error later
      });
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : null;

  const optionItems = items.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    );
  });
  return <Row>{optionItems}</Row>;
}
