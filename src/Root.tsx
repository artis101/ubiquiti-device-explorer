import { StrictMode } from "react";
import App from "./App.tsx";
import { UidbProvider } from "./contexts/UidbProvider";
import ProductLineProvider from "./contexts/ProductLineContext";

export function Root() {
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
