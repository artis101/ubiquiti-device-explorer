interface DeviceAliasesProps {
  shortnames: string[];
}

export function DeviceAliases({ shortnames }: DeviceAliasesProps) {
  if (!shortnames || shortnames.length === 0) {
    return null;
  }

  return (
    <div>
      <h4 className="text-md font-medium text-gray-900 mb-2">Aliases</h4>
      <div className="flex flex-wrap gap-1">
        {shortnames.map((name, index) => (
          <span
            key={index}
            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}