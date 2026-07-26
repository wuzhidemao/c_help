import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Code, Bug, Zap, HardDrive, Layers, GitBranch, Network, MoreHorizontal } from 'lucide-react';
import PostList from '@/components/PostList';
import { Post, parseMarkdown, extractContent, getPostId } from '@/utils/markdown';
import categoriesConfig from '@/config/categories.json';

interface CategoryProps {
  isDark: boolean;
}

const iconMap: Record<string, typeof Code> = {
  code: Code,
  bug: Bug,
  zap: Zap,
  hardDrive: HardDrive,
  layers: Layers,
  gitBranch: GitBranch,
  network: Network,
  moreHorizontal: MoreHorizontal,
};

export default function Category({ isDark }: CategoryProps) {
  const { name } = useParams<{ name: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
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
        
        if (name !== 'all') {
          setPosts(filteredPosts.filter(p => p.metadata.category === name));
        } else {
          setPosts(filteredPosts);
        }
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [name]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className={`mb-8 animate-fade-in`}>
        <h1 className={`text-3xl font-bold mb-2 font-mono ${
          isDark ? 'text-white' : 'text-dark-800'
        }`}>
          {name === 'all' ? '所有分类' : name}
        </h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {posts.length} 个帖子
        </p>
      </div>

      <div className={`flex flex-wrap gap-3 mb-8 animate-slide-up`}>
        <Link
          to="/category/all"
          className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
            name === 'all'
              ? isDark
                ? 'bg-accent-500 text-white'
                : 'bg-primary-500 text-white'
              : isDark
              ? 'bg-dark-700 text-gray-300 hover:bg-dark-600'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          全部
        </Link>
        {categoriesConfig.categories.map((category) => {
          const Icon = iconMap[category.icon] || MoreHorizontal;
          return (
            <Link
              key={category.name}
              to={`/category/${category.name}`}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                name === category.name
                  ? isDark
                    ? 'bg-accent-500 text-white'
                    : 'bg-primary-500 text-white'
                  : isDark
                  ? 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{category.name}</span>
            </Link>
          );
        })}
      </div>

      <div className={`animate-slide-up`} style={{ animationDelay: '100ms' }}>
        {loading ? (
          <div className={`text-center py-16 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            加载中...
          </div>
        ) : (
          <PostList posts={posts} isDark={isDark} />
        )}
      </div>
    </div>
  );
}
