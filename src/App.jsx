import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import { lazy, Suspense, useEffect, useState } from 'react';
import { AppContext } from './context.js';
import { initAnalytics, setUserProperties, trackThemeToggle } from './lib/analytics';
import { useWebVitals } from './hooks/useWebVitals';
import RouteTracker from './components/RouteTracker';

// Secondary routes load on demand so the homepage bundle stays small.
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const NotFound = lazy(() => import('./pages/404'));

// Initialize GA4 + Clarity once, deferred to idle time so analytics never
// competes with first paint / interactivity.
const scheduleIdle =
  typeof window.requestIdleCallback === 'function'
    ? (cb) => window.requestIdleCallback(cb)
    : (cb) => setTimeout(cb, 1500);
scheduleIdle(() => initAnalytics());

export { AppContext };

// Theme-matching blank screen while a lazy route chunk loads (imperceptible
// on fast connections, avoids a white flash on slow ones).
function RouteFallback() {
  return <div className="bg-paper min-h-screen" />;
}

function App() {
  const savedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(savedTheme || 'dark');

  // Core Web Vitals from real visitors, reported when the page is hidden.
  useWebVitals();

  // Theme is a user-scoped property, so every event from this visitor can be
  // segmented by it (register it under Admin → Custom definitions).
  useEffect(() => {
    setUserProperties({ preferred_theme: theme });
  }, [theme]);

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
    const next = theme === 'dark' ? 'light' : 'dark';
    trackThemeToggle(next);
    setTheme(next);
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
