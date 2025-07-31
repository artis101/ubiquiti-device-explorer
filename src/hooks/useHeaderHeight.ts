import { useState, useEffect, type DependencyList, useRef } from "react";

export function useHeaderHeight(dependencies: DependencyList = []) {
  const [headerHeight, setHeaderHeight] = useState(49);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { headerHeight, headerRef };
}
