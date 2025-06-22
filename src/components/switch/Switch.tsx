import { Icon } from '../navigation_rail/NavigationRail';
import './Switch.css'
import { useState } from 'react'

export default function Switch({ id, onClick }: { id: string; onClick?: () => void; }) {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxState = () => {
        setIsChecked((prev) => !prev);
    }
    return (<>
        <label className={`switch-container ${isChecked ? 'checked' : ''}`}>
            <input
                type='checkbox'
                checked={isChecked}
                onChange={() => {
                handleCheckboxState();
                onClick?.();
                }}
            />
            <span className="switch-bg">
                <Icon id={`switch-icon ${id}`} label='' iconName={isChecked ? 'check' : 'check'} />
            </span>
        </label>
    </>);
}