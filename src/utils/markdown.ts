export interface PostMetadata {
  title: string;
  author: string;
  avatar: string;
  category: string;
  tags: string[];
  date: string;
}

export interface Post {
  id: string;
  metadata: PostMetadata;
  content: string;
}

const FRONTMATTER_REGEX = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;

export function parseMarkdown(markdown: string): PostMetadata | null {
  const match = markdown.match(FRONTMATTER_REGEX);
  if (!match) return null;
  
  const frontmatter = match[1];
  const metadata: PostMetadata = {
    title: '',
    author: '',
    avatar: '',
    category: '',
    tags: [],
    date: '',
  };
  
  const lines = frontmatter.split('\n');
  lines.forEach(line => {
    const [key, value] = line.split(':').map(s => s.trim());
    if (!key || !value) return;
    
    switch (key) {
      case 'title':
        metadata.title = value.replace(/["']/g, '');
        break;
      case 'author':
        metadata.author = value.replace(/["']/g, '');
        break;
      case 'avatar':
        metadata.avatar = value.replace(/["']/g, '');
        break;
      case 'category':
        metadata.category = value.replace(/["']/g, '');
        break;
      case 'date':
        metadata.date = value.replace(/["']/g, '');
        break;
      case 'tags':
        try {
          metadata.tags = JSON.parse(value);
        } catch {
          metadata.tags = value.split(',').map(t => t.trim().replace(/["'\[\]]/g, ''));
        }
        break;
    }
  });
  
  return metadata;
}

export function extractContent(markdown: string): string {
  const match = markdown.match(FRONTMATTER_REGEX);
  return match ? match[2] : markdown;
}

export function getPostId(filename: string): string {
  return filename.replace(/\.md$/, '');
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
