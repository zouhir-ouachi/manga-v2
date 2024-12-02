import { useState } from "react";
import ShareIcon from "../assets/ShareIcon";

interface ShareButtonProps {
  chapterId: string;
  chapterNumber?: number;
  chapterTitle?: string;
}

export default function ShareButton({
  chapterId,
  chapterNumber,
  chapterTitle,
}: ShareButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const url = `${window.location.origin}/reader/${chapterId}`;
    const title =
      chapterNumber && chapterTitle
        ? `One Piece Chapter ${chapterNumber}: ${chapterTitle}`
        : "Read this chapter of One Piece";
    const text = "Check out this chapter from One Piece!";

    try {
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ url })
      ) {
        await navigator.share({
          title,
          text,
          url,
        });
        showTooltipMessage("Shared successfully!");
      } else {
        await copyToClipboard(url);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log("Share error:", err.name);
        if (err.name === "AbortError") {
          return;
        } else {
          await copyToClipboard(url);
        }
      }
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        showTooltipMessage("Link copied to clipboard!");
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-999999px";
        textarea.style.top = "-999999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
          document.execCommand("copy");
          showTooltipMessage("Link copied to clipboard!");
        } catch (err) {
          showTooltipMessage("Failed to copy link");
          console.error("Copy failed:", err);
        }

        document.body.removeChild(textarea);
      }
    } catch (err) {
      showTooltipMessage("Failed to copy link");
      console.error("Copy failed:", err);
    }
  };

  const showTooltipMessage = (message: string) => {
    setTooltipMessage(message);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <div className="relative bg-gray-700 group-hover:bg-gray-800/80 rounded-full">
      <button
        onClick={handleShare}
        className="w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm text-gray-200 hover:scale-110 transition-all"
        aria-label="Share chapter"
        type="button"
      >
        <ShareIcon />
      </button>
      {showTooltip && (
        <div
          className="fixed transform -translate-x-1/2 px-3 py-1.5 text-xs text-white bg-gray-900 rounded-lg whitespace-nowrap shadow-lg"
          style={{
            zIndex: 1001,
            left: "50%",
            bottom: "calc(100% + 8px)",
          }}
        >
          {tooltipMessage}
        </div>
      )}
    </div>
  );
}
