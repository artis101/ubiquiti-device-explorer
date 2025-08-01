import { useUrlState } from "@hooks/useUrlState";
import { ChevronLeft } from "lucide-react";
import { PaginationButtons } from "./PaginationButtons";
import { useProductNavigation } from "@hooks/useProductNavigation";

export function DeviceDetailsHeader() {
  const { updateState } = useUrlState();
  const { previousProductId, nextProductId, hasPrevious, hasNext } =
    useProductNavigation();

  const handleCloseDetail = () => {
    updateState({ select: undefined });
  };

  const handlePreviousProduct = () => {
    if (previousProductId) {
      updateState({ select: previousProductId });
    }
  };

  const handleNextProduct = () => {
    if (nextProductId) {
      updateState({ select: nextProductId });
    }
  };

  return (
    <div className="flex justify-between items-center w-full mb-12">
      <button
        onClick={handleCloseDetail}
        className="flex items-center p-1 pr-3 h-8 bg-white rounded focus-within:shadow-xl focus:outline-none hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center justify-center w-5 h-5">
          <ChevronLeft className="text-neutral-600 transition-colors focus:text-white active:text-white" />
        </div>
        <span className="ml-1 text-sm leading-5 flex items-center font-sans text-neutral-600 transition-colors focus:text-white active:text-white">
          Back
        </span>
      </button>
      {hasPrevious || hasNext ? (
        <PaginationButtons
          onBack={handlePreviousProduct}
          onForward={handleNextProduct}
          disableBack={!hasPrevious}
          disableForward={!hasNext}
        />
      ) : null}
    </div>
  );
}
