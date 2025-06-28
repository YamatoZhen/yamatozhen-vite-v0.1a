// Accordion.tsx
import { useState, Children, isValidElement, cloneElement, ReactElement } from 'react';
import './Accordion.css';
import { AnimatePresence, motion } from 'framer-motion';

// ===== Accordion Component =====
export default function Accordion({ children }: { children?: React.ReactNode }) {
  const [expandedIndex, setExpandedIndex] = useState<null | number>(null);

  const tabs = Children.toArray(children)
    .filter(isValidElement)
    .map((child, index) => {
      if (child.type === Accordion.Tab) {
        return cloneElement(child as ReactElement<any>, {
          isExpanded: expandedIndex === index,
          onToggle: () => setExpandedIndex(prev => (prev === index ? null : index)),
        });
      }
      console.warn('Only <Accordion.Tab> is allowed inside <Accordion>');
      return null;
    });

  return <ul className="accordion-wrapper">{tabs}</ul>;
}

// ===== Accordion.Tab Component =====
Accordion.Tab = function Tab({
  children,
  isExpanded,
  onToggle,
}: {
  children?: React.ReactNode;
  isExpanded?: boolean;
  onToggle?: () => void;
}) {
  const validChildren = Children.toArray(children).filter(isValidElement);

  const hasOnlyAllowed = validChildren.every(
    child => child.type === Accordion.Header || child.type === Accordion.Text
  );

  if (!hasOnlyAllowed) {
    console.warn('Accordion.Tab only accepts <Accordion.Header> and <Accordion.Text>');
    return null;
  }

  return (
    <li className={`accordion-tab tab ${isExpanded ? 'exp' : ''}`} onClick={onToggle}>
      {validChildren.map((child) =>
        isValidElement(child)
          ? cloneElement(child as ReactElement<any>, { isExpanded })
          : child
      )}
    </li>
  );
};

// ===== Accordion.Header Component =====
Accordion.Header = function Header({
  children,
}: {
  children?: React.ReactNode;
  isExpanded?: boolean; // accept it but ignore it
}) {
  return <h1 className="title">{children}</h1>;
};

// ===== Accordion.Text Component =====
Accordion.Text = function Text({
  children,
  isExpanded,
}: {
  children?: React.ReactNode;
  isExpanded?: boolean;
}) {
  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          className="text-wrapper"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.55, 0.57, 0, 1.58] }}
        >
          <p className="text">{children}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
