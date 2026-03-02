// layout/RootLayout.jsx (Public pages — with Navbar & Footer)
import { Outlet } from 'react-router-dom';
import Navbar from './NavBarComponent';
import Footer from './FooterComponent';

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;