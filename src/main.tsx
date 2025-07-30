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
    imageSize,
    selectedDeviceId,
    viewMode,
    updateState,
  } = useUrlState();

  return (
    <StrictMode>
      <UidbProvider searchQuery={searchQuery} selectedLineId={selectedLineId}>
        <ProductLineProvider>
          <App
            searchQuery={searchQuery}
            selectedLineId={selectedLineId}
            imageSize={imageSize}
            selectedDeviceId={selectedDeviceId}
            viewMode={viewMode}
            updateState={updateState}
          />
        </ProductLineProvider>
      </UidbProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
