export function TableHeader() {
  return (
    <div className="shadow-xs">
      <div className="flex items-start mx-auto max-w-7xl">
        <div className="flex items-center justify-center w-9 h-8 px-2 py-1.5 gap-2 border-b border-ui-gray-200">
          {/* Intentionally empty as per Figma design */}
        </div>
        <div className="flex items-center flex-1 min-w-0 h-8 px-2 py-1.5 gap-2 border-b border-ui-gray-200">
          <span className="font-sans text-sm font-normal text-ui-text-muted">
            Line
          </span>
        </div>
        <div className="flex items-center flex-1 min-w-0 h-8 px-2 py-1.5 gap-2 border-b border-ui-gray-200">
          <span className="font-sans text-sm font-normal text-ui-text-subtle">
            Name
          </span>
        </div>
      </div>
    </div>
  );
}
