import React, { createContext, useContext, useMemo } from "react";
import { getProductLines } from "@utils/productLines";
import { useUidbData } from "./UidbContext";

interface ProductLine {
  id: string;
  name: string;
}

interface ProductLineContextType {
  productLines: ProductLine[];
}

const ProductLineContext = createContext<ProductLineContextType | undefined>(
  undefined,
);

export function ProductLineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { devices } = useUidbData();

  const productLines = useMemo(() => getProductLines(devices), [devices]);

  const contextValue = useMemo(() => ({ productLines }), [productLines]);

  return (
    <ProductLineContext.Provider value={contextValue}>
      {children}
    </ProductLineContext.Provider>
  );
}

export function useProductLineData() {
  const context = useContext(ProductLineContext);
  if (context === undefined) {
    throw new Error(
      "useProductLineData must be used within a ProductLineProvider",
    );
  }
  return context;
}
