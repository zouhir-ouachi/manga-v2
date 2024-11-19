import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { currentPage, isLoadingMore, CHAPTERS_PER_PAGE } from '../stores/pagination';
import { searchQuery, filterType } from '../stores/search';
import { readingProgress, bookmarks } from '../stores/manga';
import { preloadThumbnails } from '../data/manga';
import ChapterCard from './ChapterCard';

interface ChapterPaginationProps {
  chapters: any[];
  totalPages: number;
}

export default function ChapterPagination({ chapters, totalPages }: ChapterPaginationProps) {
  const $currentPage = useStore(currentPage);
  const $isLoadingMore = useStore(isLoadingMore);
  const $searchQuery = useStore(searchQuery);
  const $filterType = useStore(filterType);
  const $readingProgress = useStore(readingProgress);
  const $bookmarks = useStore(bookmarks);
  const [displayedChapters, setDisplayedChapters] = useState<any[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const observerTarget = useRef(null);

  // Filter and search chapters
  const filterChapters = (chapters: any[]) => {
    return chapters.filter(chapter => {
      const matchesSearch = chapter.title.toLowerCase().includes($searchQuery.toLowerCase()) ||
                          `Chapter ${chapter.number}`.toLowerCase().includes($searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      const progress = $readingProgress[chapter.id] || 0;
      const totalPages = chapter.pages.length;
      const isBookmarked = $bookmarks[chapter.id];

      switch ($filterType) {
        case 'bookmarked':
          return isBookmarked;
        case 'unread':
          return progress === 0;
        case 'reading':
          return progress > 0 && progress < totalPages - 1;
        case 'completed':
          return progress === totalPages - 1;
        default:
          return true;
      }
    });
  };

  useEffect(() => {
    const filteredChapters = filterChapters(chapters);
    const startIdx = 0;
    const endIdx = $currentPage * CHAPTERS_PER_PAGE;
    setDisplayedChapters(filteredChapters.slice(startIdx, endIdx));
    
    if (isInitialLoad && filteredChapters.length > 0) {
      setTimeout(() => setIsInitialLoad(false), 500);
    }
  }, [$currentPage, chapters, $searchQuery, $filterType, $readingProgress, $bookmarks]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !$isLoadingMore && !isInitialLoad) {
          const filteredChapters = filterChapters(chapters);
          if (displayedChapters.length < filteredChapters.length) {
            isLoadingMore.set(true);
            setTimeout(() => {
              currentPage.set($currentPage + 1);
              isLoadingMore.set(false);
            }, 500);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [$currentPage, $isLoadingMore, isInitialLoad, chapters, displayedChapters.length]);

  if (isInitialLoad) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="rounded-lg overflow-hidden">
            <div className="flex gap-4 p-4 bg-gray-100 dark:bg-gray-800">
              <div className="w-16 h-24 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
              <div className="flex-grow space-y-3">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
                <div className="mt-auto">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-full animate-pulse" />
                  <div className="mt-1 h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse" />
                </div>
              </div>
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (displayedChapters.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">No chapters found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {displayedChapters.map((chapter) => (
        <ChapterCard key={chapter.id} chapter={chapter} />
      ))}
      
      <div ref={observerTarget} className="py-4 text-center">
        {$isLoadingMore && (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-t-2 border-blue-500 rounded-full animate-spin"></div>
            <span className="text-gray-600 dark:text-gray-400">Loading more chapters...</span>
          </div>
        )}
      </div>
    </div>
  );
}