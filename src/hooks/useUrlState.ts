import { useState, useEffect, useCallback } from "react";

export interface UrlState {
  q: string; // search query
  line?: string; // selected line filter
  select?: string; // selected device ID
  view: "list" | "grid"; // view mode
  productLines?: string[]; // selected product lines
}

const DEFAULT_STATE: UrlState = {
  q: "",
  view: "list",
};

const URL_STATE_CHANGE_EVENT = "urlStateChange";

function getStateFromUrl(): UrlState {
  const params = new URLSearchParams(window.location.search);

  const productLinesParam = params.get("productLines");
  const productLines = productLinesParam
    ? productLinesParam.split(",")
    : undefined;

  return {
    q: params.get("q") || DEFAULT_STATE.q,
    line: params.get("line") || undefined,
    select: params.get("select") || undefined,
    view: (params.get("view") as "list" | "grid") || DEFAULT_STATE.view,
    productLines,
  };
}

function updateUrl(state: UrlState) {
  const params = new URLSearchParams();

  if (state.q) params.set("q", state.q);
  if (state.line) params.set("line", state.line);
  if (state.select) params.set("select", state.select);
  if (state.view !== DEFAULT_STATE.view) params.set("view", state.view);
  if (state.productLines && state.productLines.length > 0)
    params.set("productLines", state.productLines.join(","));

  const newUrl = `${window.location.pathname}${
    params.toString() ? "?" + params.toString() : ""
  }`;
  window.history.replaceState({}, "", newUrl);
}

export function useUrlState() {
  const [state, setState] = useState<UrlState>(getStateFromUrl);

  const updateState = useCallback((updates: Partial<UrlState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  useEffect(() => {
    const currentUrlState = getStateFromUrl();
    if (JSON.stringify(state) !== JSON.stringify(currentUrlState)) {
      updateUrl(state);
      window.dispatchEvent(new Event(URL_STATE_CHANGE_EVENT));
    }
  }, [state]);

  useEffect(() => {
    const handleStateChange = () => {
      setState(getStateFromUrl());
    };

    window.addEventListener("popstate", handleStateChange);
    window.addEventListener(URL_STATE_CHANGE_EVENT, handleStateChange);

    return () => {
      window.removeEventListener("popstate", handleStateChange);
      window.removeEventListener(URL_STATE_CHANGE_EVENT, handleStateChange);
    };
  }, []);

  return {
    searchQuery: state.q,
    selectedLineId: state.line,
    selectedDeviceId: state.select,
    viewMode: state.view,
    selectedProductLines: state.productLines || [],
    updateState,
  };
}
