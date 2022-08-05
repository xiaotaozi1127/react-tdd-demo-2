import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import SummaryForm from "./pages/summary/SummaryForm";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

import { OrderDetailsProvider } from "./contexts/OrderDetails";
import { useState } from "react";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");
  return (
    <Container>
      <OrderDetailsProvider>
        {/* summary pag and entry page need provider */}
        {orderPhase === "inProgress" && (
          <OrderEntry updateOrderPhase={setOrderPhase} />
        )}
        {orderPhase === "review" && (
          <SummaryForm updateOrderPhase={setOrderPhase} />
        )}
        {orderPhase === "completed" && (
          <OrderConfirmation updateOrderPhase={setOrderPhase} />
        )}
      </OrderDetailsProvider>
      {/* confirm page does not need provider */}
    </Container>
  );
}

export default App;
