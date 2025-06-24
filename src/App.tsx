import { useEffect, useState } from 'react';
import './App.css';
import NavgationRail, { RailTab } from './components/navigation_rail/NavigationRail';
import './components/navigation_rail/NavigationRail.css';
import Loader from './components/loader/Loader';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import StorePage from './pages/StorePage';
import LinksPage from './pages/LinksPage';
import PortfolioPage from './pages/PortfolioPage';
import Search from './pages/Search';
import './colors.css'

function App() {
    const [loading, setLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setFadeOut(true), 2000); // Start fade out after delay
        return () => clearTimeout(timer);
    }, []);

    // After fade out animation, hide loader
    useEffect(() => {
        if (fadeOut) {
            const timer = setTimeout(() => setLoading(false), 2000); // Match your fade-out duration
            return () => clearTimeout(timer);
        }
    }, [fadeOut]);

    useEffect(() => {
        console.log('Checking system theme...');
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
      
        const updateTheme = () => {
          console.log('System prefers dark?', mq.matches);
          document.body.classList.toggle('darkmode', mq.matches);
        };
      
        updateTheme();
        mq.addEventListener('change', updateTheme);
      
        return () => mq.removeEventListener('change', updateTheme);
      }, []);
      
      

    return (
        <>
            <NavgationRail>
                <RailTab label='Home' iconName='Home' id={''} onClick={() => navigate('/home')} />
                <RailTab label='Projects' iconName='folder_code' id={''} onClick={() => navigate('/projects')}/>    
                <RailTab
                  label="Store"
                  iconName="storefront"
                  id=""
                  tabMenu={true}
                  tabItems={[
                    { label: "Subitem 1", onClick: () => console.log("Subitem 1") },
                    { label: "Subitem 2", onClick: () => console.log("Subitem 2") },
                  ]}
                />
                <RailTab label='Links' iconName='link' id={''} onClick={() => navigate('/links')}/>
                <RailTab label='Portfolio' iconName='thread_unread' id={''} onClick={() => navigate('/prtfolio')} />
            </NavgationRail>
            <section className='content-section'>
                <AnimatePresence mode="wait">
                    <Routes>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route path="/store" element={<StorePage />} />
                        <Route path="/links" element={<LinksPage />} />
                        <Route path="/portfolio" element={<PortfolioPage />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/search" element={<Search />} />
                    </Routes>
                </AnimatePresence>
            </section>
            {loading && (
                <div className={`preloader${fadeOut ? ' fade-out' : ''}`}>
                    <Loader />
                </div>
            )}
        </>
    );
}

export default App;
