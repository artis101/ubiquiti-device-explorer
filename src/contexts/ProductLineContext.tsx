import React, { createContext, useMemo } from "react";
import { getProductLines } from "@utils/productLines";
import { useUidbData } from "@hooks/useUidbData";

import type { ProductLineContextType } from "./ProductLineTypes";

export const ProductLineContext = createContext<ProductLineContextType | undefined>(undefined);

export default function ProductLineProvider({
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


