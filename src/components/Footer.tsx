import { Code2, Github, Heart } from 'lucide-react';

interface FooterProps {
  isDark: boolean;
}

export default function Footer({ isDark }: FooterProps) {
  return (
    <footer className={`mt-16 py-8 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Code2 className={`w-5 h-5 ${isDark ? 'text-accent-400' : 'text-primary-600'}`} />
            <span className={`font-medium ${isDark ? 'text-white' : 'text-dark-800'}`}>
              C++ Help
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/wuzhidemao/c_help"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-2 transition-colors duration-300 ${
                isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Github className="w-5 h-5" />
              <span className="text-sm">GitHub</span>
            </a>

            <p className={`flex items-center space-x-1 text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <Heart className="w-4 h-4 text-red-500" />
              <span>Made with passion</span>
            </p>
          </div>

          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            © {new Date().getFullYear()} C++ Help Community
          </p>
        </div>
      </div>
    </footer>
  );
}
