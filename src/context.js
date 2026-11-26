import { createContext } from 'react';

// Lives in its own module so the prerender (Node) can import pages without
// pulling in App.jsx, which touches window at import time.
export const AppContext = createContext({ theme: 'dark', switchTheme: () => {} });
