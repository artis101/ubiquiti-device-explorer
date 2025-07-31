interface FilterDropdownHeaderProps {
  title: string;
}

export function FilterDropdownHeader({ title }: FilterDropdownHeaderProps) {
  return (
    <div className="p-3">
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
    </div>
  );
}
