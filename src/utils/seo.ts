import type { Chapter } from "../types";

interface WebsiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  description: string;
  url: string;
  potentialAction: {
    "@type": "ReadAction";
    target: string;
  };
}

interface BookSchema {
  "@context": "https://schema.org";
  "@type": "Book";
  name: string;
  description: string;
  author: {
    "@type": "Person";
    name: string;
  };
  numberOfPages: number;
  publisher: string;
  genre: string;
  inLanguage: string;
}

interface ChapterSchema {
  "@context": "https://schema.org";
  "@type": "Chapter";
  isPartOf: {
    "@type": "Book";
    name: string;
  };
  name: string;
  position: number;
  url: string;
}

export const generateWebsiteSchema = (
  name: string,
  description: string,
  url: string
): WebsiteSchema => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name,
  description,
  url,
  potentialAction: {
    "@type": "ReadAction",
    target: url,
  },
});

export const generateBookSchema = (
  name: string,
  description: string,
  author: string,
  publisher: string,
  numberOfChapters: number,
  genres: string[]
): BookSchema => ({
  "@context": "https://schema.org",
  "@type": "Book",
  name,
  description,
  author: {
    "@type": "Person",
    name: author,
  },
  numberOfPages: numberOfChapters,
  publisher,
  genre: genres.join(", "),
  inLanguage: "en",
});

export const generateChapterSchema = (
  bookName: string,
  chapter: Chapter,
  url: string
): ChapterSchema => ({
  "@context": "https://schema.org",
  "@type": "Chapter",
  isPartOf: {
    "@type": "Book",
    name: bookName,
  },
  name: chapter.title,
  position: chapter.number,
  url,
});
