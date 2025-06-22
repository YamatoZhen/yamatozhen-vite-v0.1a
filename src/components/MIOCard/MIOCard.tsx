import { Icon } from "../navigation_rail/NavigationRail";
import './MIOCard.css'

export default function MIOCard({nav, hideIcon, iconName, title, text, onClick}:{nav?: 'right' | 'left' ; hideIcon?: '1'; text?: string; title: string; iconName:string; onClick?: ()=> void}){
    return(<>
        <div className="mio-container" onClick={onClick}>
        <div className={`mio-span-bg ${((nav && ['left', 'right'].includes(nav)) || hideIcon === '1') ? 'noSpan' : ''}`}>

                <Icon id='mioSpan' iconName={iconName} label=''/>
                <svg className="mio-path" style={{ ["--i" as string]: 5 }} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.8729 0.620696C23.8872 -1.99138 29.9914 4.11282 27.3793 10.1271L26.9474 11.1214C26.1499 12.9576 26.1499 15.0424 26.9474 16.8786L27.3793 17.8729C29.9914 23.8872 23.8872 29.9914 17.8729 27.3793L16.8786 26.9474C15.0424 26.1499 12.9576 26.1499 11.1214 26.9474L10.1271 27.3793C4.11281 29.9914 -1.99138 23.8872 0.620698 17.8729L1.05257 16.8786C1.85006 15.0424 1.85005 12.9576 1.05257 11.1214L0.620696 10.1271C-1.99138 4.11281 4.11282 -1.99138 10.1271 0.620698L11.1214 1.05257C12.9576 1.85005 15.0424 1.85005 16.8786 1.05257L17.8729 0.620696Z"></path>
                </svg>
            </div>
            <div className="text-container">
                { nav === "left" ? <Icon id="lr" className="left" iconName="arrow_left_alt" label="Previous"/> :
                  nav === "right" ? <Icon id="lr" className="right" iconName="arrow_right_alt" label="Up next"/> : null }
                <h1>{title}</h1>
                { ( nav === 'left' || nav === 'right' ) ? null : <p>{text}</p> }
            </div>
        </div>
    </>);
}