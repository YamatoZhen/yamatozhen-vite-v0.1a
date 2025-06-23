import { motion, useInView } from "framer-motion";
import React from "react";
import { useRef } from "react";

export default function AnimateChildren({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      {React.Children.map(children, (child, i) => {
        const ref = useRef(null);
        const inView = useInView(ref, { once: true, margin: "1% 0px" });

        return (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.98, y: 24 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: i * 0.01, duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            {child}
          </motion.div>
        );
      })}
    </>
  );
}