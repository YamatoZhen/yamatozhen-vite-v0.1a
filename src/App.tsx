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

function usePrefersDarkMode() {
    const getPref = () =>
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

    const [isDark, setIsDark] = useState(getPref);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    return isDark;
}

function App() {
    const [loading, setLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [currentTheme, setCurrentTheme] = useState<'yellow' | 'green' | 'charcoal' | 'lavender' | 'red' | 'blushvelvet' | 'chartreuse'>('yellow');
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setFadeOut(true), 5000); // Start fade out after delay
        return () => clearTimeout(timer);
    }, []);

    // After fade out animation, hide loader
    useEffect(() => {
        if (fadeOut) {
            const timer = setTimeout(() => setLoading(false), 500); // Match your fade-out duration
            return () => clearTimeout(timer);
        }
    }, [fadeOut]);

    const isDark = usePrefersDarkMode();

    useEffect(() => {
        document.body.classList.toggle('darkmode', isDark);
    }, [isDark]);

    function setThemeClass(theme: typeof currentTheme) {
        document.body.classList.remove('theme-yellow', 'theme-green', 'theme-charcoal', 'theme-lavender', 'theme-red', 'theme-blushvelvet', 'theme-chartreuse');
        document.body.classList.add(`theme-${theme}`);
        setCurrentTheme(theme);
    }

    // Load default theme on mount
    useEffect(() => {
        setThemeClass('yellow');
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
                <RailTab 
                    id=''
                    label='themes' 
                    iconName='playing_cards'
                    tabMenu={true}
                    tabItems={[
                        { label: "Red", onClick: () => setThemeClass('red'), className: currentTheme === 'red' ? 'active' : '' },
                        { label: "Yellow", onClick: () => setThemeClass('yellow'), className: currentTheme === 'yellow' ? 'active' : '' },
                        { label: "Chartreuse", onClick: () => setThemeClass('chartreuse'), className: currentTheme === 'chartreuse' ? 'active' : '' },
                        { label: "Emerald", onClick: () => setThemeClass('green'), className: currentTheme === 'green' ? 'active' : '' },
                        { label: "Charcoal", onClick: () => setThemeClass('charcoal'), className: currentTheme === 'charcoal' ? 'active' : '' },
                        { label: "Lavender", onClick: () => setThemeClass('lavender'), className: currentTheme === 'lavender' ? 'active' : '' },
                        { label: "Blush Velvet", onClick: () => setThemeClass('blushvelvet'), className: currentTheme === 'blushvelvet' ? 'active' : '' },
                    ]}
                />
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
