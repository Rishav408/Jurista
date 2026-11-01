import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/** Standard marketing layout: fixed navbar + page content + footer. */
export function PageLayout() {
  const { pathname } = useLocation();

  // Scroll to top on route change (except when a hash targets an anchor).
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {/* pt-20 clears the fixed navbar (py-4 + h-12 = 80px unscrolled) */}
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PageLayout;
