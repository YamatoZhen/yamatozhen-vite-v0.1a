import { motion } from 'framer-motion';
import { Icon } from '../navigation_rail/NavigationRail';
import Ripple from '../ripple/Ripple';
import './FAB.css'

export default function FAB({id,iconName,className, onClick}:{id: string; iconName:string; className: string; onClick?: ()=> void;}){
     return(
        <> 
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ padding: "0", margin: "0"}}
        >
            <button onClick={onClick} className={`FAB elevated ${className}`}>
               <Icon id={id} iconName={iconName} label=''/>
                <Ripple/>
            </button>
        </motion.div>
        </>
     );
}