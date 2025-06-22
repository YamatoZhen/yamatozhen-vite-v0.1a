import "./GradientText.css";
import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  animationSpeed?: number;
  showBorder?: boolean;
  fontSize?: string;
}

export default function GradientText({
  fontSize = "",
  children,
  className = "",
  animationSpeed = 8,
  showBorder = false,
}: GradientTextProps) {
  const colors = [
    "var(--md-sys-color-surface-tint)",
    "var(--md-sys-color-secondary)", 
    "var(--md-sys-color-tertiary)", 
    "var(--md-sys-color-secondary)", 
    "var(--md-sys-color-primary)",
    "var(--md-sys-color-secondary)",
    "var(--md-sys-color-tertiary)",
  ]
  const gradientStyle = {
    fontSize: `${fontSize}`,
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <div className={`animated-gradient-text ${className}`}>
      {showBorder && (
        <div className="gradient-overlay" style={gradientStyle}></div>
      )}
      <div className="text-content" style={gradientStyle}>
        {children}
      </div>
    </div>
  );
}
