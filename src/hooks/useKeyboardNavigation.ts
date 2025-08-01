import { useState, useCallback } from "react";

interface UseKeyboardNavigationProps {
  itemCount: number;
  isOpen: boolean;
  onSelect: (index: number) => void;
  onClose: () => void;
}

export function useKeyboardNavigation({
  itemCount,
  isOpen,
  onSelect,
  onClose,
}: UseKeyboardNavigationProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isKeyboardNav, setIsKeyboardNav] = useState(false);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen && e.key !== "ArrowDown") return;

      switch (e.key) {
        case "ArrowDown":
        case "ArrowUp":
          e.preventDefault();
          setIsKeyboardNav(true);
          setActiveIndex((prevIndex) => {
            if (e.key === "ArrowDown") {
              return prevIndex >= itemCount - 1 ? 0 : prevIndex + 1;
            } else {
              return prevIndex <= 0 ? itemCount - 1 : prevIndex - 1;
            }
          });
          break;

        case "Enter":
          if (activeIndex > -1 && activeIndex < itemCount) {
            e.preventDefault();
            onSelect(activeIndex);
          }
          break;

        case "Escape":
          e.preventDefault();
          onClose();
          setActiveIndex(-1);
          break;

        case "Tab":
          if (itemCount > 0) {
            e.preventDefault();
            setIsKeyboardNav(true);
            if (e.shiftKey) {
              setActiveIndex((prevIndex) => {
                return prevIndex <= 0 ? itemCount - 1 : prevIndex - 1;
              });
            } else {
              setActiveIndex((prevIndex) => {
                return prevIndex >= itemCount - 1 ? 0 : prevIndex + 1;
              });
            }
          } else {
            onClose();
            setActiveIndex(-1);
          }
          break;
      }
    },
    [isOpen, itemCount, activeIndex, onSelect, onClose]
  );

  const handleMouseEnter = useCallback((index: number) => {
    setIsKeyboardNav(false);
    setActiveIndex(index);
  }, []);

  const resetActiveIndex = useCallback(() => {
    setActiveIndex(-1);
    setIsKeyboardNav(false);
  }, []);

  return {
    activeIndex,
    isKeyboardNav,
    handleKeyDown,
    handleMouseEnter,
    resetActiveIndex,
  };
}