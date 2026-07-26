import { ExternalLink, Globe } from 'lucide-react';
import friendsConfig from '@/config/friends.json';

interface FriendsProps {
  isDark: boolean;
}

export default function Friends({ isDark }: FriendsProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className={`mb-8 animate-fade-in`}>
        <h1 className={`text-3xl font-bold mb-2 font-mono ${
          isDark ? 'text-white' : 'text-dark-800'
        }`}>
          友情链接
        </h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          志同道合的伙伴们
        </p>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up`}>
        {friendsConfig.friends.map((friend, index) => (
          <a
            key={friend.name}
            href={friend.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group p-6 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2 ${
              isDark
                ? 'bg-dark-700/50 border border-gray-700 hover:border-accent-500/50 hover:shadow-xl hover:shadow-accent-500/10'
                : 'bg-white border border-gray-200 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/10'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              isDark ? 'bg-accent-500/20' : 'bg-primary-100'
            }`}>
              <Globe className={`w-8 h-8 ${isDark ? 'text-accent-400' : 'text-primary-600'}`} />
            </div>

            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-dark-800'}`}>
              {friend.name}
            </h3>

            <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {friend.description}
            </p>

            <div className={`flex items-center justify-center space-x-1 text-sm ${
              isDark ? 'text-accent-400' : 'text-primary-600'
            }`}>
              <span>访问</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>
        ))}
      </div>

      <div className={`mt-12 p-6 rounded-2xl ${
        isDark ? 'bg-dark-700/50' : 'bg-white'
      } animate-fade-in`} style={{ animationDelay: '400ms' }}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-dark-800'}`}>
          申请友链
        </h3>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          如果你有一个不错的技术博客或网站，欢迎通过 GitHub Issues 申请友情链接。
          请提供网站名称、链接和描述，我会尽快审核并添加。
        </p>
      </div>
    </div>
  );
}
