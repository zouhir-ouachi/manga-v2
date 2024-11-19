interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  coverImage: string;
  excerpt: string;
  content: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'evolution-of-manga',
    title: 'The Evolution of Manga: From Traditional Art to Digital Age',
    date: '2024-01-15',
    category: 'History',
    coverImage: 'https://picsum.photos/seed/manga-blog-1/800/400',
    excerpt: 'Explore the fascinating journey of manga from its origins in traditional Japanese art to its current status as a global digital phenomenon.',
    content: `
      <p>Manga has come a long way from its humble beginnings in traditional Japanese art. What started as simple woodblock prints has evolved into a sophisticated form of storytelling that combines art, narrative, and cultural expression.</p>

      <h2>Traditional Roots</h2>
      <p>The origins of manga can be traced back to the 12th century, with the earliest examples found in temple scrolls. These early works, known as "emakimono," combined pictures with text to tell stories, much like modern manga.</p>

      <h2>Post-War Revolution</h2>
      <p>The post-World War II era saw a revolution in manga, led by artists like Osamu Tezuka, often called the "God of Manga." His cinematic style and complex narratives set new standards for the medium.</p>

      <h2>Digital Transformation</h2>
      <p>Today, manga has embraced digital technology, with many artists working entirely digitally and publications being distributed through online platforms. This has made manga more accessible than ever before.</p>

      <h2>Global Impact</h2>
      <p>Manga's influence now extends far beyond Japan, inspiring artists and storytellers worldwide. The medium continues to evolve, incorporating new technologies and storytelling techniques while maintaining its unique artistic traditions.</p>
    `
  },
  {
    slug: 'reading-techniques',
    title: 'Essential Manga Reading Techniques for Beginners',
    date: '2024-01-10',
    category: 'Guide',
    coverImage: 'https://picsum.photos/seed/manga-blog-2/800/400',
    excerpt: 'New to manga? Learn the essential reading techniques and conventions that will enhance your manga reading experience.',
    content: `
      <p>Reading manga can be a unique experience for newcomers. Unlike Western comics, manga has its own set of conventions and reading patterns that might take some getting used to.</p>

      <h2>Right-to-Left Reading</h2>
      <p>The most fundamental aspect of reading manga is that pages and panels are read from right to left. This follows traditional Japanese writing direction and is maintained in most translated works.</p>

      <h2>Panel Flow</h2>
      <p>Understanding how to follow panel sequences is crucial. Start from the top-right corner and work your way left and down. Speech bubbles follow the same pattern.</p>

      <h2>Sound Effects</h2>
      <p>Japanese sound effects (onomatopoeia) are an integral part of manga storytelling. Many translations keep these in their original form to preserve the artistic integrity.</p>

      <h2>Cultural Context</h2>
      <p>Familiarize yourself with basic Japanese cultural references and common manga symbols to better understand the story and character interactions.</p>
    `
  },
  {
    slug: 'digital-revolution',
    title: 'The Digital Revolution in Manga Creation',
    date: '2024-01-05',
    category: 'Technology',
    coverImage: 'https://picsum.photos/seed/manga-blog-3/800/400',
    excerpt: 'Discover how digital tools and technologies are transforming the way manga is created and distributed.',
    content: `
      <p>The digital revolution has transformed manga creation, offering artists new tools and possibilities while maintaining the medium's distinctive style.</p>

      <h2>Digital Drawing Tools</h2>
      <p>Modern manga artists increasingly use digital tablets and specialized software for drawing. These tools offer features like layers, undo options, and various effects that streamline the creation process.</p>

      <h2>Online Distribution</h2>
      <p>Digital platforms have revolutionized manga distribution, making it easier for creators to reach global audiences and for readers to access their favorite series.</p>

      <h2>New Possibilities</h2>
      <p>Digital technology enables new forms of expression, from animated effects to interactive elements, pushing the boundaries of traditional manga.</p>

      <h2>Future Trends</h2>
      <p>As technology continues to evolve, we can expect to see more innovations in manga creation and distribution, potentially including AR and VR experiences.</p>
    `
  },
  {
    slug: 'preservation-techniques',
    title: 'How to Preserve Your Manga Collection',
    date: '2024-01-01',
    category: 'Collection',
    coverImage: 'https://picsum.photos/seed/manga-blog-4/800/400',
    excerpt: 'Learn the best practices for maintaining and preserving your physical manga collection to ensure it lasts for years to come.',
    content: `
      <p>A well-maintained manga collection can last for generations. Here are essential tips for preserving your precious volumes.</p>

      <h2>Storage Conditions</h2>
      <p>Store your manga in a cool, dry place away from direct sunlight. Excessive heat and humidity can damage paper and binding. Consider using bookshelf with proper ventilation.</p>

      <h2>Handling Tips</h2>
      <p>Always wash your hands before handling manga. Use bookmarks instead of folding pages, and avoid laying books face down or forcing them open.</p>

      <h2>Protection Methods</h2>
      <p>Consider using manga bags and boards for valuable volumes. These materials protect against dust, moisture, and general wear.</p>

      <h2>Restoration Techniques</h2>
      <p>Learn basic restoration techniques for minor damage, but leave significant repairs to professionals to avoid causing more harm.</p>
    `
  }
];

export const getBlogPosts = () => BLOG_POSTS;
export const getBlogPost = (slug: string) => BLOG_POSTS.find(post => post.slug === slug);