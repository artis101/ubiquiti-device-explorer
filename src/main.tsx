import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UidbProvider } from "@contexts/UidbContext";
import { ProductLineProvider } from "@contexts/ProductLineContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UidbProvider>
      <ProductLineProvider>
        <App />
      </ProductLineProvider>
    </UidbProvider>
  </StrictMode>
);
