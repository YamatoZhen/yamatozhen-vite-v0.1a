import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '../navigation_rail/NavigationRail';
import Ripple from '../ripple/Ripple';
import './FAB.css';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '../useMediaQuery';

export default function FAB({
    id,
    iconName,
    className,
    onClick,
    children
}: {
    id: string;
    iconName: string;
    className: string;
    onClick?: () => void;
    children?: React.ReactNode;
}) {
    const isMobile = useMediaQuery('(max-width: 811px)');
    const buttonRef = useRef<HTMLButtonElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        if (onClick) onClick();
        setIsOpen((prev) => !prev);
    };

    // Outside click, Escape key, and scroll-to-close
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            const button = buttonRef.current;
            const popover = popoverRef.current;
            if (
                isOpen &&
                button &&
                popover &&
                !button.contains(e.target as Node) &&
                !popover.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        const handleScroll = () => {
            setIsOpen(false);
        };

        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen || !buttonRef.current) return;

        const btnRect = buttonRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let paddingTop = 6;
        let paddingBottom = 4;
        let paddingLeft = -8;
        let paddingRight = 10;

        const popoverWidthDefault = 200;
        const popoverHeightDefault = 150;

        let popoverWidth: number | string = popoverWidthDefault;
        let popoverHeight: number | string = popoverHeightDefault;

        let popoverWidthNum = popoverWidthDefault;
        let popoverHeightNum = popoverHeightDefault;

        if (isMobile) {
            popoverWidth = '92%';
            popoverHeight = 'auto';
            popoverWidthNum = viewportWidth;
            popoverHeightNum = 300;
        }

        let top = 0;
        let left = 0;
        let transformOrigin = 'top left';

        if (btnRect.top > viewportHeight / 2) {
            top = btnRect.top - popoverHeightNum - paddingTop;
            transformOrigin = 'bottom';
            paddingLeft = 0;
            paddingTop = -18;
        } else {
            top = btnRect.bottom + paddingBottom;
            transformOrigin = 'top';
        }

        if (btnRect.left < viewportWidth / 2) {
            left = btnRect.right + paddingRight;
            transformOrigin += ' left';
        } else {
            left = btnRect.left - popoverWidthNum - paddingLeft;
            transformOrigin += ' right';
        }

        left = Math.min(Math.max(left, paddingLeft), viewportWidth - popoverWidthNum - paddingRight);
        top = Math.min(Math.max(top, paddingTop), viewportHeight - popoverHeightNum - paddingBottom);

        setPopoverStyle({
            position: 'fixed',
            top,
            left: isMobile && transformOrigin.startsWith('bottom') ? '4%' : left,
            width: popoverWidth,
            height: popoverHeight,
            display: 'flex',
            flexDirection: 'column-reverse',
            alignItems: 'flex-end',
            transformOrigin,
            padding: 0,
            zIndex: 10000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderRadius: '26px',
            ...(isMobile ? { bottom: 92 } : {}),
        });
    }, [isOpen]);

    return (
        <>
            <motion.button
                ref={buttonRef}
                onClick={handleClick}
                animate={{ rotate: isOpen && children ? -45 : 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.55, 0.75, 0.15, 1.87] }}
                className={`FAB ${className} ${isOpen && children ? 'trigger' : ''}`}
                style={{
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    zIndex: 9999,
                    ...(isOpen && children ? {
                        borderRadius: 28,
                        backgroundColor: 'var(--md-sys-color-primary)',
                        color: 'var(--md-sys-color-on-primary)'
                    } : {})
                }}
            >
                <Icon id={id} iconName={iconName} label="" />
                <Ripple />
            </motion.button>

            {children && (
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            key="fab-popover"
                            ref={popoverRef}
                            style={popoverStyle}
                            className="fab-popover"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </>
    );
}
