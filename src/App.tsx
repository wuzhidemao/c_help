import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Category from '@/pages/Category';
import Projects from '@/pages/Projects';
import Friends from '@/pages/Friends';
import PostDetail from '@/pages/PostDetail';

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDark = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'dark' : ''
      }`}>
        <Navbar isDark={isDark} onToggleDark={toggleDark} />
        
        <main className="pt-20 pb-8">
          <Routes>
            <Route path="/" element={<Home isDark={isDark} />} />
            <Route path="/category/:name" element={<Category isDark={isDark} />} />
            <Route path="/projects" element={<Projects isDark={isDark} />} />
            <Route path="/friends" element={<Friends isDark={isDark} />} />
            <Route path="/post/:id" element={<PostDetail isDark={isDark} />} />
          </Routes>
        </main>
        
        <Footer isDark={isDark} />
      </div>
    </Router>
  );
}
