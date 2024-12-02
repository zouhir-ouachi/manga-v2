import { memo } from "react";
import ProgressBar from "./ProgressBar";
import BookmarkButton from "./BookmarkButton";
import LastRead from "./LastRead";
import ShareButton from "./ShareButton";
import thumbnail from "../assets/manga-thumbnail.webp";

interface ChapterCardProps {
  chapter: {
    id: string;
    number: number;
    title: string;
    pages: string[];
  };
}

const ChapterCard = memo(({ chapter }: ChapterCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-colors">
      <a href={`/reader/${chapter.id}`} className="block">
        <div className="flex gap-4 p-4">
          <div className="relative w-16 h-24 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
            <div className="w-full h-full" style={{ aspectRatio: "2/3" }}>
              <img
                src={thumbnail.src}
                alt={`Chapter ${chapter.number} Thumbnail`}
                className="w-full h-full object-cover rounded-md"
                loading="lazy"
                decoding="async"
                width={128}
                height={192}
              />
            </div>
          </div>
          <div className="flex-grow flex flex-col justify-between min-h-[6rem]">
            <div>
              <h3 className="text-lg font-medium mb-1 min-h-[1.75rem]">
                Chapter {chapter.number}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 min-h-[1.25rem]">
                {chapter.title}
              </p>
              <LastRead chapterId={chapter.id} />
            </div>
            <div className="w-full">
              <ProgressBar
                chapterId={chapter.id}
                totalPages={chapter.pages.length}
              />
            </div>
          </div>
          <div className="absolute top-4 right-4 flex items-center gap-2  transition-opacity z-20 ">
            <ShareButton
              chapterId={chapter.id}
              chapterNumber={chapter.number}
              chapterTitle={chapter.title}
            />
            <BookmarkButton chapterId={chapter.id} />
          </div>
        </div>
      </a>
    </div>
  );
});

ChapterCard.displayName = "ChapterCard";

export default ChapterCard;
