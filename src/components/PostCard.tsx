import { Clock, Tag, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Post, formatDate } from '@/utils/markdown';

interface PostCardProps {
  post: Post;
  isDark: boolean;
}

export default function PostCard({ post, isDark }: PostCardProps) {
  const { metadata, id } = post;

  return (
    <Link
      to={`/post/${id}`}
      className={`group block p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 ${
        isDark
          ? 'bg-dark-700/50 border border-gray-700 hover:border-accent-500/50 hover:shadow-xl hover:shadow-accent-500/10'
          : 'bg-white border border-gray-200 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/10'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={metadata.avatar}
            alt={metadata.author}
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
          />
          <div>
            <p className={`font-medium ${isDark ? 'text-white' : 'text-dark-800'}`}>
              {metadata.author}
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{formatDate(metadata.date)}</span>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          isDark
            ? 'bg-accent-500/20 text-accent-400'
            : 'bg-primary-100 text-primary-600'
        }`}>
          {metadata.category}
        </span>
      </div>

      <h3 className={`text-xl font-semibold mb-3 group-hover:underline transition-all duration-300 ${
        isDark ? 'text-white' : 'text-dark-800'
      }`}>
        {metadata.title}
      </h3>

      <p className={`text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4`}>
        {post.content.substring(0, 150)}...
      </p>

      <div className="flex items-center space-x-2">
        <Tag className="w-4 h-4 text-gray-400" />
        {metadata.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className={`px-2 py-1 rounded-md text-xs ${
              isDark
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {tag}
          </span>
        ))}
        {metadata.tags.length > 3 && (
          <span className="text-xs text-gray-500">+{metadata.tags.length - 3}</span>
        )}
      </div>
    </Link>
  );
}
