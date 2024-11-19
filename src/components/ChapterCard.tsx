import { memo } from 'react';
import ProgressBar from './ProgressBar';
import BookmarkButton from './BookmarkButton';
import LastRead from './LastRead';
import ShareButton from './ShareButton';

interface ChapterCardProps {
  chapter: {
    id: string;
    number: number;
    title: string;
    thumbnail: string;
    pages: string[];
  };
}

const ChapterCard = memo(({ chapter }: ChapterCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-colors">
      <a href={`/reader/${chapter.id}`} className="block">
        <div className="flex gap-4 p-4">
          <div className="relative w-16 h-24 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
            {/* Note: Since this is a React component, we can't use Astro's Image component directly.
                We'll need to optimize these images through other means or create a separate Astro component */}
            <img
              src={chapter.thumbnail}
              alt={`Chapter ${chapter.number} Thumbnail`}
              className="w-full h-full object-cover rounded-md"
              loading="lazy"
              decoding="async"
              width={128}
              height={192}
            />
          </div>
          <div className="flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-medium mb-1">
                Chapter {chapter.number}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {chapter.title}
              </p>
              <LastRead client:load chapterId={chapter.id} />
            </div>
            <div className="w-full">
              <ProgressBar client:load chapterId={chapter.id} totalPages={chapter.pages.length} />
            </div>
          </div>
        </div>
      </a>
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <ShareButton 
          client:load 
          chapterId={chapter.id}
          chapterNumber={chapter.number}
          chapterTitle={chapter.title}
        />
        <BookmarkButton client:load chapterId={chapter.id} />
      </div>
    </div>
  );
});

ChapterCard.displayName = 'ChapterCard';

export default ChapterCard;