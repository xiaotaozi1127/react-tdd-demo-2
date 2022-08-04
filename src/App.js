import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* summary pag and entry page need provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* confirm page does not need provider */}
    </Container>
  );
}

export default App;
