import './Button.css';
import '../../App.css';
import Ripple from '../ripple/Ripple';
import { useState, useRef, useEffect } from 'react';
import { motion, useIsPresent } from 'framer-motion';

interface ButtonProps {
    id: string;
    type: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    activeState?: 'active' | 'inactive' | 'auto' | '';
}

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const Button = ({ type, children, id, onClick, style, activeState }: ButtonProps) => {
    const [active, setActive] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const resolvedActiveState = activeState == null ? 'default' : activeState;

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (resolvedActiveState === 'default') {
            setActive(true);
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => setActive(false), 200);
        } else if (resolvedActiveState === 'auto') {
            setActive(prev => !prev);
        }
        onClick?.(event);
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    let classNames = `btn ${type}`;
    if (resolvedActiveState === 'active' || (resolvedActiveState === 'auto' && active)) {
        classNames += ' active';
    } else if (resolvedActiveState === 'inactive') {
        classNames += ' inactive';
    } else if (active) {
        classNames += ' active';
    }

    return (
        <motion.div
            {...(!isSafari && {
                whileHover: { scale: 1.05 },
                whileTap: { scale: 0.95 },
            })}
            style={{
                padding: 0,
                margin: 0,
                display: 'inline-block',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent', // stops flash on iOS
                ...style,
            }}
        >
            <button
                id={id}
                className={classNames}
                onClick={handleButtonClick}
            >
                <span id="first-child">{children}</span>
                <Ripple />
            </button>
        </motion.div>
    );
};

export default Button;
