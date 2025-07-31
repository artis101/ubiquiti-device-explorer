import { useUrlState } from "@hooks/useUrlState";

export function DeviceDetailsHeader() {
  const { updateState } = useUrlState();

  const handleBack = () => {
    updateState({ select: undefined });
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center p-1 mb-12 w-14 h-7 bg-white rounded focus-within:shadow-xl focus:outline-none hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-center w-5 h-5">
        <svg
          width="6"
          height="12"
          viewBox="0 0 6 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-neutral-600 transition-colors focus:text-white active:text-white"
        >
          <path
            d="M5 1L1 6L5 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="ml-1 text-sm leading-5 flex items-center font-sans text-neutral-600 transition-colors focus:text-white active:text-white">
        Back
      </span>
    </button>
  );
}
