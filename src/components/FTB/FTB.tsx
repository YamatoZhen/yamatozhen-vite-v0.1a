import './FTB.css';
import { Icon } from '../navigation_rail/NavigationRail';
import { useEffect, useRef, useState } from 'react';

function FTB({ tabs, id }: { id: string; tabs: { iconName: string; label: string; }[] }) {
    const [selectedTab, setSelectedTab] = useState(0);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const [isFloating, setIsFloating] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const shouldFloat = !entry.isIntersecting;
                setIsFloating(prev => (prev !== shouldFloat ? shouldFloat : prev));
            },
            {
                threshold: 0,
                rootMargin: '-10px 0px 0px 0px',
            }
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current);
            }
        };
    }, []);

    return (
        <>
            {/* This small div is observed */}
            <div ref={sentinelRef} style={{ height: '10px' }} />
            <div className="holder">
            <div className={`FTB-container ${isFloating ? 'nav-mode elevated' : ''}`}>
                {Array.isArray(tabs)
                    ? tabs.map((tab, index) => (
                          <span
                              key={index}
                              className={`tab-container ${selectedTab === index ? 'current-tab' : ''}`}
                              onClick={() => setSelectedTab(index)}
                          >
                              <Icon iconName={tab.iconName} label={tab.label} id={id} />
                          </span>
                      ))
                    : null}
            </div>
            </div>
        </>
    );
}

export default FTB;
