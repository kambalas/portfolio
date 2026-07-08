import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import { lazy, Suspense, useEffect, useState, createContext } from 'react';
import { initGA } from './lib/analytics';
import RouteTracker from './components/RouteTracker';

// Secondary routes load on demand so the homepage bundle stays small.
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const NotFound = lazy(() => import('./pages/404'));

// Initialize GA4 once, deferred to idle time so analytics never competes
// with first paint / interactivity.
const scheduleIdle =
  typeof window.requestIdleCallback === 'function'
    ? (cb) => window.requestIdleCallback(cb)
    : (cb) => setTimeout(cb, 1500);
scheduleIdle(() => initGA());

export const AppContext = createContext();

// Theme-matching blank screen while a lazy route chunk loads (imperceptible
// on fast connections, avoids a white flash on slow ones).
function RouteFallback() {
  return <div className="bg-paper min-h-screen" />;
}

function App() {
  const savedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(savedTheme || 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');

    // Keep the browser chrome color in sync with the active palette
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute('content', theme === 'dark' ? '#292420' : '#f0efeb');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  const switchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <AppContext.Provider value={{ theme, switchTheme }}>
      <BrowserRouter>
        {/* Fires a GA4 page_view on every route change, including UTM params */}
        <RouteTracker />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/project/:slug" element={<ProjectDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
