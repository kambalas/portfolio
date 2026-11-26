import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Routes, Route } from 'react-router-dom';
import { AppContext } from './context.js';
import Homepage from './pages/Homepage.jsx';
import ProjectDetails from './pages/ProjectDetails.jsx';
import user_info from './data/user_info.js';

// Every URL that gets its own prerendered HTML file at build time.
export const routes = ['/', ...user_info.projects.map((p) => `/project/${p.slug}/`)];

export { user_info };

/**
 * Render one route to static HTML so crawlers and AI assistants read real
 * content instead of an empty <div id="root">.
 * @param {string} url
 * @returns {string}
 */
export function render(url) {
  return renderToString(
    <AppContext.Provider value={{ theme: 'dark', switchTheme: () => {} }}>
      <StaticRouter location={url}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/project/:slug" element={<ProjectDetails />} />
        </Routes>
      </StaticRouter>
    </AppContext.Provider>
  );
}
