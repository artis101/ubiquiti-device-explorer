import { useContext } from "react";
import { ProductLineContext } from "../contexts/ProductLineContext";

export function useProductLineData() {
  const context = useContext(ProductLineContext);
  if (context === undefined) {
    throw new Error(
      "useProductLineData must be used within a ProductLineProvider",
    );
  }
  return context;
}
