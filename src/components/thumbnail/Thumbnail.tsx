import React from 'react';
import './Thumbnail.css';

interface GridContainerProps {
  children?: React.ReactNode;
  setColumns: number;
  setRows?: number;
  className?: string;
}

function GridContainer({ className, children, setColumns, setRows }: GridContainerProps) {
  const minWidth = 600 / setColumns;

  return (
    <div
      className={`GridContainer ${className}`}
      style={{
        margin: "16px 0 16px 0",
        display: "grid",
        gap: "16px",
        gridTemplateColumns: `repeat(${setColumns}, 1fr)`,
        gridTemplateRows: `repeat(${setRows}, 1fr)`,
      }}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { minWidth });
        }
        return child;
      })}
    </div>
  );
}
export { GridContainer };

interface ThumbnailProps {
  src: string;
  alt: string;
}

export default function Thumbnail({ src, alt }: ThumbnailProps) {
  return (
    <>
      <div className="thumbnail">
        <div className="thumbnail-container">
          <img src={src} alt={alt} />
        </div>
        <div className="text-container">
          <h3>Updated: Figma M3 Design Kit</h3>
          <p>
          A new way to organize related buttons—with shape-shifting buttons that bump and react to each other

          </p>
        </div>
      </div>
    </>
  );
}