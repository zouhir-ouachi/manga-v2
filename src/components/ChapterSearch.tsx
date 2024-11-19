import { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { searchQuery, filterType, updateSearch, updateFilter } from '../stores/search';
import { bookmarks } from '../stores/manga';

const filterOptions = [
  { value: 'all', label: 'All Chapters' },
  { value: 'bookmarked', label: 'Bookmarked' },
  { value: 'unread', label: 'Unread' },
  { value: 'reading', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

export default function ChapterSearch() {
  const $searchQuery = useStore(searchQuery);
  const $filterType = useStore(filterType);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col sm:flex-row gap-4 animate-pulse">
        <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="w-40 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <input
          type="search"
          placeholder="Search chapters..."
          value={$searchQuery}
          onChange={(e) => updateSearch(e.target.value)}
          className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
        />
        <svg
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <select
        value={$filterType}
        onChange={(e) => updateFilter(e.target.value)}
        className="w-full sm:w-40 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
      >
        {filterOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}