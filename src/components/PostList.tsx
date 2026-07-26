import PostCard from './PostCard';
import { Post } from '@/utils/markdown';

interface PostListProps {
  posts: Post[];
  isDark: boolean;
}

export default function PostList({ posts, isDark }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className={`text-center py-16 rounded-2xl ${
        isDark ? 'bg-dark-700/50' : 'bg-white'
      }`}>
        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          暂无帖子，快来发布第一个求助吧！
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <div
          key={post.id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <PostCard post={post} isDark={isDark} />
        </div>
      ))}
    </div>
  );
}
