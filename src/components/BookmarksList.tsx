import { useStore } from '@nanostores/react';
import { bookmarks } from '../stores/manga';
import { getChapter } from '../data/manga';
import ProgressBar from './ProgressBar';
import { useEffect, useState } from 'react';

interface BookmarksListProps {
  showUnbookmark?: boolean;
}

export default function BookmarksList({ showUnbookmark = false }: BookmarksListProps) {
  const $bookmarks = useStore(bookmarks);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const bookmarkedChapters = Object.keys($bookmarks)
    .map(getChapter)
    .filter((chapter): chapter is NonNullable<typeof chapter> => chapter != null);

  if (bookmarkedChapters.length === 0) {
    return (
      <p className="text-gray-600 dark:text-gray-400 italic">No bookmarks yet</p>
    );
  }

  return (
    <div className="space-y-3">
      {bookmarkedChapters.map((chapter) => (
        <div key={chapter.id} className="relative group">
          <a
            href={`/reader/${chapter.id}`}
            className="block p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex gap-3 items-center">
              <div className="w-12 h-16 flex-shrink-0 bg-gray-200 dark:bg-gray-700">
                {/* Note: Since this is a React component, we'll need to handle image optimization differently */}
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
                  <ProgressBar client:load chapterId={chapter.id} totalPages={chapter.pages.length} />
                </div>
              </div>
            </div>
          </a>
          {showUnbookmark && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const newBookmarks = { ...$bookmarks };
                delete newBookmarks[chapter.id];
                bookmarks.set(newBookmarks);
              }}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-800/80 backdrop-blur-sm text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
              aria-label="Remove bookmark"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}