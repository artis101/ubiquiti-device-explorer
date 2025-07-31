import { useContext } from "react";
import { UidbContext } from "../contexts/UidbContext";

export function useUidbData() {
  const context = useContext(UidbContext);
  if (context === undefined) {
    throw new Error("useUidbData must be used within a UidbProvider");
  }
  return context;
}
