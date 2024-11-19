import { useStore } from '@nanostores/react';
import { readingProgress } from '../stores/manga';
import { useEffect, useState } from 'react';

interface ProgressBarProps {
  chapterId: string;
  totalPages: number;
}

export default function ProgressBar({ chapterId, totalPages }: ProgressBarProps) {
  const $readingProgress = useStore(readingProgress);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="relative w-full">
        <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 dark:bg-blue-400 w-0" />
        </div>
        <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
          Loading...
        </div>
      </div>
    );
  }

  const currentPage = $readingProgress[chapterId] || 0;
  const progress = Math.round((currentPage / (totalPages - 1)) * 100) || 0;

  return (
    <div className="relative w-full">
      <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 dark:bg-blue-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
        {progress === 100 ? (
          <span className="text-green-500 dark:text-green-400">Completed</span>
        ) : progress > 0 ? (
          `${progress}% read`
        ) : (
          'Not started'
        )}
      </div>
    </div>
  );
}