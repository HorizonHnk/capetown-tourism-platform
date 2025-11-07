import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingChatWidget from '../chat/FloatingChatWidget';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <FloatingChatWidget />
    </div>
  );
};

export default Layout;
