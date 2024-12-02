import { useStore } from "@nanostores/react";
import { bookmarks } from "../stores/manga";
import { getChapter } from "../data/manga";
import ProgressBar from "./ProgressBar";
import { useEffect, useState } from "react";
import CloseIcon from "../assets/CloseIcon";

export default function BookmarksList() {
  const $bookmarks = useStore(bookmarks);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const bookmarkedChapters = Object.keys($bookmarks)
    .map(getChapter)
    .filter(
      (chapter): chapter is NonNullable<typeof chapter> => chapter != null
    );

  if (bookmarkedChapters.length === 0) {
    return (
      <div className="lg:col-span-1 order-1 lg:order-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-20">
          <h2 className="text-2xl font-bold mb-6">Bookmarks</h2>
          <p className="text-gray-600 dark:text-gray-400 italic">
            No bookmarks yet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-1 order-1 lg:order-2">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-20">
        <h2 className="text-2xl font-bold mb-6">Bookmarks</h2>
        <div className="space-y-3">
          {bookmarkedChapters.map((chapter) => (
            <div key={chapter.id} className="relative group">
              <a
                href={`/reader/${chapter.id}`}
                className="block p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex gap-3 items-center">
                  <div className="w-12 h-16 flex-shrink-0 bg-gray-200 dark:bg-gray-700">
                    <img
                      src={chapter.thumbnail}
                      alt={`Chapter ${chapter.number} Thumbnail`}
                      className="w-full h-full object-cover rounded-md"
                      loading="eager"
                      decoding="async"
                      width={96}
                      height={128}
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="text-sm font-medium mb-1 truncate">
                      Chapter {chapter.number}: {chapter.title}
                    </h3>
                    <div className="w-full">
                      <ProgressBar
                        chapterId={chapter.id}
                        totalPages={chapter.pages.length}
                      />
                    </div>
                  </div>
                </div>
              </a>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const newBookmarks = { ...$bookmarks };
                  delete newBookmarks[chapter.id];
                  bookmarks.set(newBookmarks);
                }}
                title="Remove Bookmark"
                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-700 group-hover:bg-gray-800/80 backdrop-blur-sm text-yellow-400  transition-opacity hover:scale-110 border border-gray-600"
                aria-label="Remove bookmark"
              >
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
