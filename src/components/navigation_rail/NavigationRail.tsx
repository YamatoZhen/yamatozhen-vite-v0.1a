import './NavigationRail.css';
import { useState } from "react";
import Button from '../button/Button';
import FAB from '../FAB/FAB';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useMediaQuery } from '../useMediaQuery';

function Icon({ iconName, label, id, onClick, className }: { className?: string; id?: string; iconName?: string; label?: string; onClick?: () => void; }) {
    return (
        <div className={`icon-label-container ${className}`} onClick={onClick}>
            {typeof label === 'string' ? <span className='label-name'>{label}</span> : null}
            <span className="material-symbols-rounded" id={id}>{iconName}</span>
        </div>
    );
}
export { Icon };

interface RailTabProps {
    label: string;
    id: string;
    iconName: string;
    onClick?: () => void;
    className?: string;
    tabMenu?: boolean;
    tabItems?: { label: string; onClick?: () => void; className?: string }[]; // <-- Add className here
}

function RailTab({ label, id, iconName, onClick, className }: RailTabProps) {
    return (
        <div className={`rail-tab ${className}`}>
            <Icon iconName={iconName} id={id} onClick={onClick} label={label} />
        </div>
    );
}
export { RailTab };

export default function NavgationRail({ children }: { children?: React.ReactNode; }) {
    const [open, setOpen] = useState<number | null>(null);
    const [selected, setSelected] = useState(0);
    const navigate = useNavigate();
    const darkmodeState = () => {
        const updateDarkMode = () => {
            document.body.classList.toggle('darkmode');
            const isDarkMode = document.body.classList.contains('darkmode');
            const modeIcon = document.getElementById('mode-switch')?.querySelector('.material-symbols-rounded');
            if (modeIcon) modeIcon.textContent = isDarkMode ? 'dark_mode' : 'light_mode';
        };
        document.readyState === 'complete' ? updateDarkMode() : document.addEventListener('DOMContentLoaded', updateDarkMode);
    };
    const tabIndexSelector = (index: number) => {
        setSelected(index);
        setOpen(prevOpen => (prevOpen === index ? null : index));
    };

    // Collect tabexpand elements
    const tabExpandElements: React.ReactNode[] = [];

    const isMobile = useMediaQuery('(max-width: 811px)');
    return (
        <>
            {isMobile ? (<>
                <div className="gradient"></div>
                <FAB id={"test"} iconName={"add"} className={"sticky elevated navFAB"}>
                    <div>hello</div>
                </FAB>
                <div className="bottombar">
                    <div className="bottombar-content elevated">
                        {Array.isArray(children) ? children.map((child, index) => {
                            const childProps = (child as any).props;
                            const shouldRenderTabMenu = childProps && childProps.tabMenu === true;
                            // Collect tabexpand for outside rendering
                            if (shouldRenderTabMenu) {
                                tabExpandElements.push(
                                    <div
                                        key={`alt-tabexpand-${index}`}
                                        className={`alt-tabexpand ${open === index ? 'open' : ''}`}
                                        id={`alt-tabexpand-${index}`}
                                    >
                                        {Array.isArray(childProps.tabItems) && childProps.tabItems.length > 0 && (
                                            <ul className="alt-tab-items-list">
                                                {childProps.tabItems.map(
                                                    (
                                                        item: { label: string; onClick?: () => void; className?: string },
                                                        idx: number
                                                    ) => (
                                                        <li
                                                            className={`alt-tab-item${item.className ? ` ${item.className}` : ''}`}
                                                            key={idx}
                                                            onClick={item.onClick}
                                                        >
                                                            {item.label}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                );
                            }
                            return (
                                <React.Fragment key={index}>
                                    <ul className='nav-list'>
                                        <input
                                            type="radio"
                                            className='bg-radio'
                                            name="sb-radio"
                                            id={`radio-${index}`}
                                            checked={selected === index}
                                            onChange={() => { setSelected(index); tabIndexSelector(index); }}
                                            style={{ display: "none" }}
                                        />
                                        <li
                                            className={`sb-item${selected === index ? " selected" : ""}`}
                                            onClick={() => { tabIndexSelector(index); }}
                                        >
                                            {child}
                                        </li>
                                    </ul>
                                </React.Fragment>
                            );
                        }) : null}
                    </div>
                </div>
            </>) : (<>
                <div className="width-corrector"></div>
                <div className={`sidebar`}>
                    <div className={`sidebar-content`}>
                        <ul className="nav-menu">
                            <FAB id='' className='elevation-0' iconName='search' onClick={() => navigate('/search')} />
                            {Array.isArray(children) ? children.map((child, index) => {
                                const childProps = (child as any).props;
                                const shouldRenderTabMenu = childProps && childProps.tabMenu === true;
                                // Collect tabexpand for outside rendering
                                if (shouldRenderTabMenu) {
                                    tabExpandElements.push(
                                        <div
                                            key={`tabexpand-${index}`}
                                            className={`tabexpand ${open === index ? 'open' : ''}`}
                                            id={`tabexpand-${index}`}
                                        >
                                            {Array.isArray(childProps.tabItems) && childProps.tabItems.length > 0 && (
                                                <ul className="tab-items-list">
                                                    {childProps.tabItems.map(
                                                        (
                                                            item: { label: string; onClick?: () => void; className?: string },
                                                            idx: number
                                                        ) => (
                                                            <li
                                                                className={`tab-item${item.className ? ` ${item.className}` : ''}`}
                                                                key={idx}
                                                                onClick={item.onClick}
                                                            >
                                                                {item.label}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                        </div>
                                    );
                                }
                                return (
                                    <React.Fragment key={index}>
                                        <ul className='nav-list'>
                                            <input
                                                type="radio"
                                                className='bg-radio'
                                                name="sb-radio"
                                                id={`radio-${index}`}
                                                checked={selected === index}
                                                onChange={() => { setSelected(index); tabIndexSelector(index); }}
                                                style={{ display: "none" }}
                                            />
                                            <li
                                                className={`sb-item${selected === index ? " selected" : ""}`}
                                                onClick={() => { tabIndexSelector(index); }}
                                            >
                                                {child}
                                            </li>
                                        </ul>
                                    </React.Fragment>
                                );
                            }) : null}
                        </ul>
                        <Button id={'mode-switch'} type={'outlined'} onClick={darkmodeState}>
                            <Icon label='' iconName={`${document.body.classList.contains('darkmode') ? "dark_mode" : "light_mode"}`} id={''} />
                        </Button>
                    </div>

                </div>
                {tabExpandElements}
            </>)}
        </>
    );
}