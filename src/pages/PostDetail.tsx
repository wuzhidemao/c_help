import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, Share2, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { parseMarkdown, extractContent, formatDate } from '@/utils/markdown';

interface PostDetailProps {
  isDark: boolean;
}

export default function PostDetail({ isDark }: PostDetailProps) {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState('');
  const [metadata, setMetadata] = useState<ReturnType<typeof parseMarkdown>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const postFiles = import.meta.glob('../posts/*.md', { as: 'raw', eager: true }) as Record<string, string>;
        const filePath = `../posts/${id}.md`;
        
        if (!(filePath in postFiles)) {
          throw new Error('Post not found');
        }

        const markdown = postFiles[filePath];
        const meta = parseMarkdown(markdown);
        
        if (!meta) {
          throw new Error('Invalid post format');
        }

        setMetadata(meta);
        setContent(extractContent(markdown));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className={`text-center py-16 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          加载中...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className={`text-center py-16 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <p className="text-lg">帖子未找到</p>
          <Link to="/" className={`mt-4 inline-block ${
            isDark ? 'text-accent-400' : 'text-primary-600'
          }`}>
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className={`flex items-center space-x-2 mb-6 transition-colors duration-300 ${
          isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>返回首页</span>
      </Link>

      <article className={`animate-fade-in`}>
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={metadata!.avatar}
              alt={metadata!.author}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
            />
            <div>
              <p className={`font-semibold ${isDark ? 'text-white' : 'text-dark-800'}`}>
                {metadata!.author}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  {formatDate(metadata!.date)}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  isDark
                    ? 'bg-accent-500/20 text-accent-400'
                    : 'bg-primary-100 text-primary-600'
                }`}>
                  {metadata!.category}
                </span>
              </div>
            </div>
          </div>

          <h1 className={`text-3xl md:text-4xl font-bold mb-4 font-mono ${
            isDark ? 'text-white' : 'text-dark-800'
          }`}>
            {metadata!.title}
          </h1>

          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-gray-400" />
            {metadata!.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-md text-sm ${
                  isDark
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className={`prose prose-lg max-w-none markdown-content ${
          isDark ? 'dark' : ''
        }`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content}
          </ReactMarkdown>
        </div>

        <footer className={`mt-12 pt-8 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <Share2 className="w-5 h-5" />
              <span className="text-sm">分享帖子</span>
            </div>
            <div className={`flex items-center space-x-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              <User className="w-4 h-4" />
              <span className="text-sm">作者：{metadata!.author}</span>
            </div>
          </div>
        </footer>
      </article>

      <div className={`mt-12 p-6 rounded-2xl ${
        isDark ? 'bg-dark-700/50' : 'bg-white'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-dark-800'}`}>
          相关讨论
        </h3>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          欢迎在 GitHub Issues 中讨论这个问题，或者创建新的帖子分享你的解决方案。
        </p>
      </div>
    </div>
  );
}
