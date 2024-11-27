import { siteConfig } from "./site-config";

const MANGA_DATA = {
  title: siteConfig.title,
  description: siteConfig.description,
  tags: [
    { id: "action", name: "Action" },
    { id: "adventure", name: "Adventure" },
    { id: "comedy", name: "Comedy" },
    { id: "fantasy", name: "Fantasy" },
    { id: "shounen", name: "Shounen" },
    { id: "super-power", name: "Super Power" },
  ],
  chapters: Array.from({ length: 100 }, (_, i) => ({
    id: `chapter-${i + 1}`,
    number: i + 1,
    title: `Chapter ${i + 1}`,
    thumbnail: `https://picsum.photos/seed/manga-${i + 1}-thumb/200/300`,
    pages: Array.from(
      { length: 15 },
      (_, j) => `https://picsum.photos/seed/manga-${i + 1}-${j + 1}/800/1200`
    ),
  })),
};

// Cache for preloaded thumbnails
const thumbnailCache = new Map<string, string>();

// Preload the next batch of thumbnails
export const preloadThumbnails = (startIndex: number, count: number) => {
  MANGA_DATA.chapters
    .slice(startIndex, startIndex + count)
    .forEach((chapter) => {
      if (!thumbnailCache.has(chapter.id)) {
        const img = new Image();
        img.src = chapter.thumbnail;
        thumbnailCache.set(chapter.id, chapter.thumbnail);
      }
    });
};

export const getManga = () => MANGA_DATA;
export const getChapters = () => MANGA_DATA.chapters;
export const getChapter = (id: string) =>
  MANGA_DATA.chapters.find((chapter) => chapter.id === id);
