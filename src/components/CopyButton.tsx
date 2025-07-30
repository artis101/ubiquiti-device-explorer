import { useCopyToClipboard } from "../hooks/useCopyToClipboard";

interface CopyButtonProps {
  textToCopy: string;
  title?: string;
  className?: string;
}

export function CopyButton({ textToCopy, title, className = "" }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button
      onClick={() => copy(textToCopy)}
      className={`text-xs text-blue-600 hover:text-blue-800 ${className}`}
      title={title}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}