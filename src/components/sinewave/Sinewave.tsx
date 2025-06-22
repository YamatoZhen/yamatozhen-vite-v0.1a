import React from "react";

type SinewaveProps = {
  width?: number;
  height?: number;
  frequency?: number;
  amplitude?: number;
  stroke?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
  className?: string;
};

const Sinewave: React.FC<SinewaveProps> = ({
    width = 1000,
    height = 20,
    frequency = 35,
    amplitude = 4,
    stroke = "var(--md-sys-color-primary-container)", // Added default fallback color
    strokeWidth = 2,
    className,
}) => {
    const points: string[] = [];
    for (let x = 0; x <= width; x++) {
        const y =
            height / 2 +
            amplitude * Math.sin((x / width) * frequency * 2 * Math.PI);
        points.push(`${x},${y}`);
    }
    const pathData = "M" + points.join(" L ");

    return (<>
        <div 
            className="sinewave-container" 
            style={{
                height: "20px",
                overflow: "hidden"
        }}>
            <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                stroke: "var(--md-sys-color-primary-container)",
                transition: "stroke var(--transition-expressive-color)",
                position: "relative",
                margin: "0",
                padding: "0",
            }}
            className={className}
        >
            <path d={pathData} stroke={stroke} strokeWidth={strokeWidth} fill="none" />
        </svg>
        </div>
    </>
    );
};

export default Sinewave;