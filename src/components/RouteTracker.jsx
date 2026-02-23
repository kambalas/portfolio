import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/analytics';

/**
 * Invisible component that fires a GA4 page_view on every route change.
 * Must live inside <BrowserRouter> so it can call useLocation().
 * Including location.search ensures UTM parameters are sent with each hit.
 */
function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    // e.g. "/" or "/project/my-app" or "/?utm_source=github&utm_medium=referral"
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  return null;
}

export default RouteTracker;
