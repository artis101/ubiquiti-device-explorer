import { useState, useEffect, useCallback } from "react";

export interface UrlState {
  q: string; // search query
  line?: string; // selected line filter
  size: number; // image size
  select?: string; // selected device ID
  view: "list" | "grid"; // view mode
}

const DEFAULT_STATE: UrlState = {
  q: "",
  size: 256,
  view: "grid",
};

function getStateFromUrl(): UrlState {
  const params = new URLSearchParams(window.location.search);

  return {
    q: params.get("q") || DEFAULT_STATE.q,
    line: params.get("line") || undefined,
    size: Number(params.get("size")) || DEFAULT_STATE.size,
    select: params.get("select") || undefined,
    view: (params.get("view") as "list" | "grid") || DEFAULT_STATE.view,
  };
}

function updateUrl(state: UrlState) {
  const params = new URLSearchParams();

  if (state.q) params.set("q", state.q);
  if (state.line) params.set("line", state.line);
  if (state.size !== DEFAULT_STATE.size)
    params.set("size", state.size.toString());
  if (state.select) params.set("select", state.select);
  if (state.view !== DEFAULT_STATE.view) params.set("view", state.view);

  const newUrl = `${window.location.pathname}${
    params.toString() ? "?" + params.toString() : ""
  }`;
  window.history.replaceState({}, "", newUrl);
}

export function useUrlState() {
  const [state, setState] = useState<UrlState>(getStateFromUrl);

  // Update URL when state changes
  useEffect(() => {
    updateUrl(state);
  }, [state]);

  // Listen for browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setState(getStateFromUrl());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const updateState = useCallback((updates: Partial<UrlState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  return {
    searchQuery: state.q,
    selectedLineId: state.line,
    imageSize: state.size,
    selectedDeviceId: state.select,
    viewMode: state.view,
    updateState,
  };
}
