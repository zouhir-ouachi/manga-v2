import { useStore } from "@nanostores/react";
import { bookmarks } from "../stores/manga";
import ShareButton from "./ShareButton";
import { useEffect, useState } from "react";

interface ReaderControlsProps {
  currentPage: number;
  totalPages: number;
  chapterId: string;
  onPrevious: () => void;
  onNext: () => void;
}

export default function ReaderControls({
  currentPage,
  totalPages,
  chapterId,
  onPrevious,
  onNext,
}: ReaderControlsProps) {
  const $bookmarks = useStore(bookmarks);
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const showTooltipMessage = (message: string) => {
    setTooltipMessage(message);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  const toggleBookmark = () => {
    if ($bookmarks[chapterId]) {
      const newBookmarks = { ...$bookmarks };
      delete newBookmarks[chapterId];
      bookmarks.set(newBookmarks);
      showTooltipMessage("Removed from bookmarks");
    } else {
      bookmarks.set({ ...$bookmarks, [chapterId]: true });
      showTooltipMessage("Added to bookmarks");
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800/80 text-white px-4 py-2 rounded-full backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onPrevious}
          disabled={currentPage === 0}
          className="px-3 py-1 rounded hover:bg-gray-700/50 disabled:opacity-50 disabled:hover:bg-transparent"
          aria-label="Previous page"
        >
          ←
        </button>
        <span className="min-w-[80px] text-center">
          {Math.min(currentPage + 1, totalPages)} / {totalPages}
        </span>
        <button
          onClick={onNext}
          disabled={currentPage >= totalPages - 1}
          className="px-3 py-1 rounded hover:bg-gray-700/50 disabled:opacity-50 disabled:hover:bg-transparent"
          aria-label="Next page"
        >
          →
        </button>
        <div className="flex items-center gap-2">
          <ShareButton chapterId={chapterId} />
          {mounted && (
            <div className="relative">
              <button
                onClick={toggleBookmark}
                className={`hover:scale-110 transition-transform ${
                  $bookmarks[chapterId] ? "text-yellow-400" : "text-gray-400"
                }`}
                aria-label={
                  $bookmarks[chapterId] ? "Remove bookmark" : "Add bookmark"
                }
              >
                ★
              </button>
              {showTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-900 rounded whitespace-nowrap">
                  {tooltipMessage}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
