import { useState, useEffect } from 'react';
import { Search, Flame, BookOpen, Users } from 'lucide-react';
import PostList from '@/components/PostList';
import { Post, parseMarkdown, extractContent, getPostId } from '@/utils/markdown';

interface HomeProps {
  isDark: boolean;
}

export default function Home({ isDark }: HomeProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const postFiles = import.meta.glob('../posts/*.md', { as: 'raw', eager: true }) as Record<string, string>;
        const postPromises = Object.entries(postFiles).map(([path, markdown]) => {
          const metadata = parseMarkdown(markdown);
          if (!metadata) return null;
          
          const id = getPostId(path.split('/').pop() || '');
          return {
            id,
            metadata,
            content: extractContent(markdown),
          } as Post;
        });

        const filteredPosts = postPromises.filter((p): p is Post => p !== null);
        filteredPosts.sort((a, b) => 
          new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
        );
        setPosts(filteredPosts);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.metadata.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { icon: BookOpen, label: '帖子数量', value: posts.length, color: 'primary' },
    { icon: Users, label: '活跃用户', value: '128', color: 'accent' },
    { icon: Flame, label: '本周热度', value: '356', color: 'orange' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className={`text-center mb-12 animate-fade-in`}>
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 font-mono ${
          isDark ? 'text-white' : 'text-dark-800'
        }`}>
          C++ Help
        </h1>
        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          一个帮助 C++ 开发者解决问题的社区
        </p>
      </div>

      <div className={`flex justify-center mb-8 animate-fade-in`} style={{ animationDelay: '100ms' }}>
        <div className={`relative w-full max-w-xl`}>
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
            isDark ? 'text-gray-400' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder="搜索帖子..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 ${
              isDark
                ? 'bg-dark-700 border-gray-600 text-white placeholder-gray-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20'
                : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
            }`}
          />
        </div>
      </div>

      <div className={`grid grid-cols-3 gap-6 mb-12 animate-slide-up`} style={{ animationDelay: '200ms' }}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`p-6 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1 ${
              isDark
                ? 'bg-dark-700/50 border border-gray-700 hover:border-accent-500/30'
                : 'bg-white border border-gray-200 hover:border-primary-300'
            }`}
          >
            <stat.icon className={`w-8 h-8 mx-auto mb-3 ${
              stat.color === 'primary'
                ? isDark ? 'text-primary-400' : 'text-primary-500'
                : stat.color === 'accent'
                ? 'text-accent-400'
                : 'text-orange-500'
            }`} />
            <p className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-dark-800'}`}>
              {stat.value}
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className={`animate-slide-up`} style={{ animationDelay: '300ms' }}>
        <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-dark-800'}`}>
          最新求助
        </h2>
        {loading ? (
          <div className={`text-center py-16 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            加载中...
          </div>
        ) : (
          <PostList posts={filteredPosts} isDark={isDark} />
        )}
      </div>
    </div>
  );
}
