import { StrictMode } from "react";
import App from "./App.tsx";
import UidbProvider from "./contexts/UidbProvider";
import ProductLineProvider from "./contexts/ProductLineProvider";
import { useUrlState } from "@hooks/useUrlState";

export function Root() {
  const { searchQuery, selectedLineId, selectedProductLines } = useUrlState();

  return (
    <StrictMode>
      <UidbProvider
        searchQuery={searchQuery}
        selectedLineId={selectedLineId}
        selectedProductLines={selectedProductLines}
      >
        <ProductLineProvider>
          <App />
        </ProductLineProvider>
      </UidbProvider>
    </StrictMode>
  );
}
