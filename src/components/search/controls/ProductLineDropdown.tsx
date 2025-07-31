import type { NormalizedDevice } from "types/uidb";

interface ProductLineDropdownProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export function ProductLineDropdown({ isOpen, children }: ProductLineDropdownProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute z-50 mt-2 w-48 bg-white shadow-2xl rounded-md -left-36">
      {children}
    </div>
  );
}