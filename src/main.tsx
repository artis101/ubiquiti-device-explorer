import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UidbProvider } from "@contexts/UidbContext";
import { ProductLineProvider } from "@contexts/ProductLineContext";
import { useUrlState } from "@hooks/useUrlState";

function Root() {
  const { searchQuery, selectedLineId, selectedProductLines } = useUrlState();

  console.log("searchQuery", searchQuery);

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

createRoot(document.getElementById("root")!).render(<Root />);
