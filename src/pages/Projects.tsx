import { Github, Star, ExternalLink } from 'lucide-react';
import projectsConfig from '@/config/projects.json';

interface ProjectsProps {
  isDark: boolean;
}

export default function Projects({ isDark }: ProjectsProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className={`mb-8 animate-fade-in`}>
        <h1 className={`text-3xl font-bold mb-2 font-mono ${
          isDark ? 'text-white' : 'text-dark-800'
        }`}>
          推荐项目
        </h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          精选的 C++ 开源项目，值得学习和使用
        </p>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up`}>
        {projectsConfig.projects.map((project, index) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 ${
              isDark
                ? 'bg-dark-700/50 border border-gray-700 hover:border-accent-500/50 hover:shadow-xl hover:shadow-accent-500/10'
                : 'bg-white border border-gray-200 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/10'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  isDark ? 'bg-accent-500/20' : 'bg-primary-100'
                }`}>
                  <Github className={`w-6 h-6 ${isDark ? 'text-accent-400' : 'text-primary-600'}`} />
                </div>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-dark-800'}`}>
                  {project.name}
                </h3>
              </div>
              <ExternalLink className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`} />
            </div>

            <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {project.description}
            </p>

            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-1 text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <Star className="w-4 h-4 text-yellow-500" />
                <span>Star</span>
              </div>
              <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                GitHub
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
