import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "../constants/index";
import { formatCurrency } from "../utils";

const OrderDetails = createContext();

//create a customer hook to check whether or not we are inside a provider
export function useOrderDetails() {
  const context = useContext(OrderDetails);

  //it means we are not inside a provider
  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }
  return context;
}

function calculateSubTotal(optionType, optionCounts) {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }
  return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
    validInput: true,
  });

  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    if (optionCounts.validInput) {
      const scoopsSubTotal = calculateSubTotal("scoops", optionCounts);
      const toppingsSubTotal = calculateSubTotal("toppings", optionCounts);
      const grandTotal = scoopsSubTotal + toppingsSubTotal;
      setTotals({
        scoops: formatCurrency(scoopsSubTotal),
        toppings: formatCurrency(toppingsSubTotal),
        grandTotal: formatCurrency(grandTotal),
      });
    }
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      let integerValue = parseInt(newItemCount);
      let floatValue = parseFloat(newItemCount);
      let isValid = integerValue === floatValue && integerValue >= 0;
      if (isValid) {
        const newOptionCounts = { ...optionCounts };

        const optionCountsMap = newOptionCounts[optionType];
        optionCountsMap.set(itemName, integerValue);
        newOptionCounts["validInput"] = true;
        setOptionCounts(newOptionCounts);
      } else {
        const newOptionCounts = { ...optionCounts };
        newOptionCounts["validInput"] = false;
        setOptionCounts(newOptionCounts);
      }
    }

    function resetOrder() {
      setOptionCounts({
        scoops: new Map(),
        toppings: new Map(),
        validInput: true,
      });
    }

    //getter: object containing option count for scoops and toppings, subtotals and totals
    //setter: update option count
    return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
  }, [optionCounts, totals]);
  return <OrderDetails.Provider value={value} {...props} />;
}
