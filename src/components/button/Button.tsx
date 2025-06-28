import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useMediaQuery } from '../useMediaQuery';

interface ButtonProps {
    id?: string;
    iconName?: string;
    label?: string;
    ripple?: boolean;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
}

export default function Button({
    id,
    iconName,
    label,
    ripple = true,
    onClick,
    className,
    style,
}: ButtonProps) {
    const isMobile = useMediaQuery('(max-width: 811px)');
    const [active, setActive] = useState(false);

    // Toggle active with a small delay to avoid rapid re-renders on mobile taps
    const handleClick = () => {
        setActive(true);
        if (onClick) onClick();

        setTimeout(() => {
            setActive(false);
        }, 150); // 150ms active state duration
    };

    return (
        <motion.div
            whileHover={isMobile ? undefined : { scale: 1.05 }}
            whileTap={isMobile ? undefined : { scale: 0.95 }}
            style={{ touchAction: 'manipulation', display: 'inline-block', ...style }}
        >
            <button
                id={id}
                className={`${className ?? ''} btn ${active ? 'active' : ''} ${ripple && !isMobile ? 'ripple' : ''}`}
                onClick={handleClick}
                aria-pressed={active}
                type="button"
            >
                {iconName && (
                    <span className="material-symbols-rounded" aria-hidden="true">
                        {iconName}
                    </span>
                )}
                {label && <span className="label-text">{label}</span>}
            </button>
        </motion.div>
    );
}
