import React from "react";
import UidbProviderComponent from "./UidbContext";
import { useUrlState } from "@hooks/useUrlState";

export function UidbProvider({ children }: { children: React.ReactNode }) {
  const { searchQuery, selectedLineId, selectedProductLines } = useUrlState();

  return (
    <UidbProviderComponent
      searchQuery={searchQuery}
      selectedLineId={selectedLineId}
      selectedProductLines={selectedProductLines}
    >
      {children}
    </UidbProviderComponent>
  );
}
