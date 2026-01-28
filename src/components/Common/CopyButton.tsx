import React, { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

interface CopyButtonProps {
  text: string;
  className?: string;
  size?: number;
  title?: string; // Optional custom title for default state
  timeout?: number; // Optional custom timeout for "copied" state (default: 2000ms)
}

const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  className = "ml-2 cursor-pointer",
  size = 16,
  title = "Copy to clipboard",
  timeout = 2000,
}) => {
  const [copied, setCopied] = useState(false);

  const copy = async (copyText: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout); // Reset after specified timeout
      return true;
    } catch (err) {
      console.error("Failed to copy: ", err);
      return false;
    }
  };

  const handleCopy = async () => {
    await copy(text);
  };

  return (
    <button
      onClick={handleCopy}
      className={className}
      title={copied ? "Copied!" : title}
      aria-label={copied ? "Copied!" : "Copy to clipboard"}
      type="button"
      disabled={copied} // Optional: disable while "copied" to prevent spam clicks
    >
      {copied ? <FaCheck size={size} /> : <FaCopy size={size} />}
    </button>
  );
};

export default CopyButton;
