import { useStore } from "@nanostores/react";
import { bookmarks } from "../stores/manga";
import { useEffect, useState } from "react";
import BookmarkIcon from "../assets/BookmarkIcon";

interface BookmarkButtonProps {
  chapterId: string;
}

export default function BookmarkButton({ chapterId }: BookmarkButtonProps) {
  const $bookmarks = useStore(bookmarks);
  const [isClient, setIsClient] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const showTooltipMessage = (message: string) => {
    setTooltipMessage(message);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative bg-gray-700 group-hover:bg-gray-800/80 rounded-full">
      <button
        onClick={toggleBookmark}
        className={`w-8 h-8 flex items-center justify-center rounded-full  backdrop-blur-sm hover:scale-110 transition-all ${
          $bookmarks[chapterId] ? "text-yellow-400" : "text-gray-400"
        }`}
        aria-label={$bookmarks[chapterId] ? "Remove bookmark" : "Add bookmark"}
      >
        <BookmarkIcon height={16} />
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
