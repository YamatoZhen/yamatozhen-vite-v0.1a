import React, { useImperativeHandle, useRef, forwardRef } from 'react';
import './Ripple.css';

export interface RippleHandle {
  triggerRipple: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Ripple = forwardRef<RippleHandle>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    triggerRipple(e: React.MouseEvent<HTMLButtonElement>) {
      const container = containerRef.current;
      if (!container) return;

      const circle = document.createElement('span');
      circle.className = 'ripple';

      const rect = container.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      circle.style.width = circle.style.height = `${size}px`;
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;

      container.appendChild(circle);

      circle.addEventListener('animationend', () => {
        circle.remove();
      });
    }
  }));

  return <div className="ripple-container" ref={containerRef} />;
});

export default Ripple;
