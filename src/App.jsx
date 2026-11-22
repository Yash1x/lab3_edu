import { useEffect } from 'react';
import NavigationPanel from './components/NavigationPanel/NavigationPanel.jsx';
import Footer from './components/Footer/Footer.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import { matchRoute, useLocation } from './router/router.js';
import { routes } from './routes.js';

export default function App() {
  const { pathname } = useLocation();
  const match = matchRoute(routes, pathname);
  const Page = match ? match.route.component : NotFoundPage;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <>
      <NavigationPanel />
      {/* key сбрасывает состояние страницы (поиск, выбранный тариф) при смене адреса */}
      <main className="page">
        <Page key={pathname} {...match?.params} />
      </main>
      <Footer />
    </>
  );
}
