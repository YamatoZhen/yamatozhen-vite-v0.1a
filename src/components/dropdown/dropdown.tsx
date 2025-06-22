import { AnimatePresence, motion } from "framer-motion";
import Button from "../button/Button";
import { Icon } from "../navigation_rail/NavigationRail";
import './dropdown.css';
import { useState, useRef, useEffect } from "react";

function Dropdown({
    id,
    children,
    label,
    items,
    type,
    position,
    iconName
}: {
    iconName?: string;
    position?: "left" | "right";
    type: string;
    items: { href: string; label: string; }[];
    label: string;
    id: string;
    children?: React.ReactNode;
}) {

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLUListElement>(null);

    const handleDropClick = () => {
        setOpen((prev) => !prev);
    };

    useEffect(() => {
        const handle = (e: MouseEvent) => dropdownRef.current && !dropdownRef.current.contains(e.target as Node) && setOpen(false);
        if (open) document.addEventListener("mousedown", handle);
        return () => document.removeEventListener("mousedown", handle);
    }, [open]);

    return (<>
        <div style={{
            display: "inline-flex",
            margin: "4px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute"
        }}>
            <Button
                onClick={handleDropClick}
                activeState={open ? 'active' : 'inactive'}
                type={`dropdown-button label-icon ${type}`}
                id={id}>
                <Icon label={label} iconName={iconName ? iconName : "arrow_drop_down"} />
            </Button>
            <AnimatePresence>
                { open && (
                <motion.div
                    style={{
                        top: "64px",
                        left: "0px",
                        zIndex: "100",
                        position: "inherit",
	                    display: "block"
                    }}

                    initial={{ opacity: 0, scaleY: 0.8 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0.8 }}
                    transition={{ duration: 0.4, ease: [0.55, 0.57, 0, 1.58] }}
                >
                    <ul className={` ${position} dropdown-content elevated ${open ? "active" : ""}`}>
                        {items.map((item, index) => (
                            <li key={index}>
                                <a href={item.href}>{item.label}</a>
                            </li>
                        ))}
                        {children}
                    </ul>
                </motion.div>
                )}
            </AnimatePresence>
        </div>
    </>);
} export default Dropdown;