import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationButtonsProps {
  onBack: () => void;
  onForward: () => void;
  disableBack: boolean;
  disableForward: boolean;
}

export function PaginationButtons({
  onBack,
  onForward,
  disableBack,
  disableForward,
}: PaginationButtonsProps) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={onBack}
        className="flex items-center p-1 h-8 bg-white rounded focus-within:shadow-xl focus:outline-none hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous product"
        disabled={disableBack}
      >
        <div className="flex items-center justify-center w-5 h-5">
          <ChevronLeft className="text-neutral-600 transition-colors focus:text-white active:text-white" />
        </div>
      </button>
      <button
        onClick={onForward}
        className="flex items-center p-1 h-8 bg-white rounded focus-within:shadow-xl focus:outline-none hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next product"
        disabled={disableForward}
      >
        <div className="flex items-center justify-center w-5 h-5">
          <ChevronRight className="text-neutral-600 transition-colors focus:text-white active:text-white" />
        </div>
      </button>
    </div>
  );
}
