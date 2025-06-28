import './FTB.css';
import { Icon } from '../navigation_rail/NavigationRail';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useMediaQuery } from '../useMediaQuery';

type Tab = {
  iconName: string;
  label: string;
};

function FTB({
  tabs,
  id,
  onTabChange,
}: {
  id: string;
  tabs: Tab[];
  onTabChange?: (index: number) => void;
}) {
  const [selectedTab, setSelectedTab] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isFloating, setIsFloating] = useState(false);

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const isMobile = useMediaQuery('(max-width: 811px)');

  
  //Floating nav logic (only triggers when top is passed)
  useEffect(() => {
    if (typeof isMobile !== 'boolean') return;//return if isMobile is undefined
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldFloat = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        setIsFloating(prev => (prev !== shouldFloat ? shouldFloat : prev));
      },
      {
        threshold: 0,
        rootMargin: "-10px 0px 0px 0px"
      }
    );
  
    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);
    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, []);  

  //Scroll syncing logic
  useEffect(() => {
    sectionRefs.current = tabs.map(tab =>
      document.getElementById(tab.label.toLowerCase())
    );

    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(
              ref => ref === entry.target
            );
            if (index !== -1 && selectedTab !== index) {
              setSelectedTab(index);
              onTabChange?.(index);
            }
          }
        });
      },
      {
        threshold: 0.6, // Section must be at least 60% visible
      }
    );

    sectionRefs.current.forEach(ref => {
      if (ref) sectionObserver.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach(ref => {
        if (ref) sectionObserver.unobserve(ref);
      });
    };
  }, [tabs, selectedTab, onTabChange]);

  //Manual tab click scroll
  const handleTabClick = useCallback(
    (index: number) => {
      setSelectedTab(index);
      onTabChange?.(index);
      const section = sectionRefs.current[index];
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    },
    [onTabChange]
  );

  return (
    <>
      <div ref={sentinelRef} style={{ height: "10px" }} />
      <div className="holder">
        <div
          className={`FTB-container ${isFloating ? 'nav-mode elevated' : ''}`}
          role="tablist"
        >
          {tabs.map((tab, index) => (
            <span
              key={index}
              role="tab"
              aria-selected={selectedTab === index}
              tabIndex={0}
              className={`tab-container ${selectedTab === index ? 'current-tab' : ''}`}
              onClick={() => handleTabClick(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleTabClick(index);
                }
              }}
            >
              <Icon iconName={tab.iconName} label={tab.label} id={id} />
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default FTB;

// Custom Section Component
//The component scrolls into view by comparing tab.label and id between the two components. They need t obe the same string!!!
FTB.Section = function Section({
  id,
  children,
}: {
  id: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      id={id}
      style={{
        padding: 0,
        margin: 0,
        position: 'relative',
        height: 'fit-content',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
};
