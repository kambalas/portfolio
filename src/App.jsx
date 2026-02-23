import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ProjectDetails from './pages/ProjectDetails';
import NotFound from './pages/404';
import { useEffect, useState } from 'react';
import { createContext } from 'react';
import 'preline/preline';
import { initGA } from './lib/analytics';
import RouteTracker from './components/RouteTracker';

// Initialize GA4 once before the app renders
initGA();

export const AppContext = createContext();

function App() {
  const savedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(savedTheme || 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');

    localStorage.setItem('theme', theme);
  }, [theme]);

  const switchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <AppContext.Provider value={{ theme, switchTheme }}>
      <BrowserRouter basename="/portfolio">
        {/* Fires a GA4 page_view on every route change, including UTM params */}
        <RouteTracker />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/project/:slug" element={<ProjectDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
