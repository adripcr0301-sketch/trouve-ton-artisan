import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Category from './pages/Category';
import ArtisanDetail from './pages/ArtisanDetail';
import NotFound from './pages/NotFound';
import Legal from './pages/Legal';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories/:id" element={<Category />} />
                <Route path="/recherche" element={<Category />} />
                <Route path="/artisans/:id" element={<ArtisanDetail />} />
                <Route path="/legal/:page" element={<Legal />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
