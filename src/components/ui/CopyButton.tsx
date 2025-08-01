import { useCopyToClipboard } from "@hooks/useCopyToClipboard";

interface CopyButtonProps {
  textToCopy: string;
  title?: string;
  className?: string;
}

export function CopyButton({
  textToCopy,
  title,
  className = "",
}: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button
      onClick={() => copy(textToCopy)}
      className={`text-xs text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 active:scale-95 transition-transform ${className}`}
      title={title}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
