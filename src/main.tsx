import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UidbProvider } from "@contexts/UidbContext";
import { ProductLineProvider } from "@contexts/ProductLineContext";
import { useUrlState } from "@hooks/useUrlState";

function Root() {
  const {
    searchQuery,
    selectedLineId,
    selectedDeviceId,
    viewMode,
    selectedProductLines,
    updateState,
  } = useUrlState();

  return (
    <StrictMode>
      <UidbProvider searchQuery={searchQuery} selectedLineId={selectedLineId} selectedProductLines={selectedProductLines}>
        <ProductLineProvider>
          <App
            searchQuery={searchQuery}
            selectedLineId={selectedLineId}
            selectedDeviceId={selectedDeviceId}
            viewMode={viewMode}
            selectedProductLines={selectedProductLines}
            updateState={updateState}
          />
        </ProductLineProvider>
      </UidbProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
