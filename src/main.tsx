import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UidbProvider } from "@contexts/UidbProvider";
import { ProductLineProvider } from "@contexts/ProductLineContext";
import { useUrlState } from "@hooks/useUrlState";

function Root() {
  return (
    <StrictMode>
      <UidbProvider>
        <ProductLineProvider>
          <App />
        </ProductLineProvider>
      </UidbProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
