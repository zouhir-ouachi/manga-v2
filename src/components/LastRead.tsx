import { useStore } from '@nanostores/react';
import { readingHistory } from '../stores/manga';
import { useEffect, useState } from 'react';

interface LastReadProps {
  chapterId: string;
}

export default function LastRead({ chapterId }: LastReadProps) {
  const $readingHistory = useStore(readingHistory);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const historyEntry = $readingHistory[chapterId];
  if (!historyEntry) return null;

  const timeAgo = (date: number) => {
    const seconds = Math.floor((Date.now() - date) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
      }
    }
    return 'Just now';
  };

  return (
    <p className="text-sm text-gray-500 dark:text-gray-400">
      Last read {timeAgo(historyEntry.lastRead)}
    </p>
  );
}