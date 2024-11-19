import { persistentMap } from '@nanostores/persistent';

export const bookmarks = persistentMap<Record<string, boolean>>('manga-bookmarks:', {});
export const readingProgress = persistentMap<Record<string, number>>('manga-progress:', {});
export const readingHistory = persistentMap<Record<string, { lastRead: number, page: number }>>('manga-history:', {});