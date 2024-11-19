import { useState, useEffect, useCallback } from 'react';
import { useStore } from '@nanostores/react';
import { readingProgress, readingHistory } from '../stores/manga';
import ReaderControls from './ReaderControls';

interface ReaderProps {
  chapterId: string;
  pages: string[];
}

export default function Reader({ chapterId, pages }: ReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(pages.length).fill(false));
  const $readingProgress = useStore(readingProgress);
  const $readingHistory = useStore(readingHistory);

  // Initialize page from saved progress or history
  useEffect(() => {
    const savedProgress = $readingProgress[chapterId];
    if (savedProgress !== undefined && savedProgress < pages.length) {
      setCurrentPage(savedProgress);
    } else {
      const historyEntry = $readingHistory[chapterId];
      if (historyEntry && historyEntry.page < pages.length) {
        setCurrentPage(historyEntry.page);
      } else {
        setCurrentPage(0);
      }
    }
    setImagesLoaded(new Array(pages.length).fill(false));
  }, [chapterId, pages.length]);

  // Save progress and update history when page changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Ensure we never save a page number larger than the total pages
      const validPage = Math.min(currentPage, pages.length - 1);
      readingProgress.set({ ...$readingProgress, [chapterId]: validPage });
      readingHistory.set({
        ...$readingHistory,
        [chapterId]: {
          lastRead: Date.now(),
          page: validPage
        }
      });
    }, 500); // Debounce updates

    return () => clearTimeout(timeoutId);
  }, [chapterId, currentPage, pages.length]);

  const handlePrevious = useCallback(() => {
    setCurrentPage(p => Math.max(0, p - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage(p => Math.min(pages.length - 1, p + 1));
  }, [pages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        handlePrevious();
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevious, handleNext]);

  // Preload adjacent images
  useEffect(() => {
    const preloadImage = (index: number) => {
      if (index >= 0 && index < pages.length && !imagesLoaded[index]) {
        const img = new Image();
        img.src = pages[index];
        img.onload = () => {
          setImagesLoaded(prev => {
            const next = [...prev];
            next[index] = true;
            return next;
          });
        };
      }
    };

    // Preload current, next, and previous images
    preloadImage(currentPage);
    preloadImage(currentPage + 1);
    preloadImage(currentPage - 1);
  }, [currentPage, pages, imagesLoaded]);

  // Ensure currentPage is within bounds
  const validCurrentPage = Math.min(currentPage, pages.length - 1);

  return (
    <div className="relative max-w-4xl mx-auto">
      <ReaderControls
        currentPage={validCurrentPage}
        totalPages={pages.length}
        chapterId={chapterId}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      <div className="relative min-h-[50vh] flex items-center justify-center">
        {!imagesLoaded[validCurrentPage] && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 dark:border-gray-600 border-t-blue-500"></div>
          </div>
        )}
        {/* Note: Since this is a React component, we'll need to handle image optimization differently */}
        <img
          key={pages[validCurrentPage]}
          src={pages[validCurrentPage]}
          alt={`Page ${validCurrentPage + 1}`}
          className={`w-full h-auto ${imagesLoaded[validCurrentPage] ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          loading="eager"
          width={800}
          height={1200}
          onLoad={() => {
            setImagesLoaded(prev => {
              const next = [...prev];
              next[validCurrentPage] = true;
              return next;
            });
          }}
        />
      </div>
    </div>
  );
}