import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Pets from './pages/Pets';
import PetDetails from './pages/PetDetails';
import About from './pages/About';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Donations from './pages/Donations';
import Community from './pages/Community';
import Reports from './pages/Reports';
import NewsList from './pages/NewsList';
import NewsDetail from './pages/NewsDetail';
import Profile from './pages/Profile';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pet/:id" element={<PetDetails />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/community" element={<Community />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/news" element={<NewsList />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
