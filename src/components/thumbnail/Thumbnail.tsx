import React from 'react';
import './Thumbnail.css';
import { useMediaQuery } from '../useMediaQuery';

interface GridContainerProps {
  children?: React.ReactNode;
  setColumns: number;
  setRows?: string | number;
  className?: string;
}

function GridContainer({ className, children, setColumns, setRows }: GridContainerProps) {
  const isMobile = useMediaQuery('(max-width: 600px)');

  const columns = isMobile ? 1 : setColumns;

  return (
    <div
      className={`GridContainer ${className}`}
      style={{
        margin: "8px 0",
        display: "grid",
        gap: "8px",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${setRows}, 1fr)`,
      }}
    >
      {children}
    </div>
  );
}

export { GridContainer };

interface ThumbnailProps {
  src: string | null;
  alt?: string;
  p?: string;
  h?: string;
}

export default function Thumbnail({ src, alt, p, h }: ThumbnailProps) {
  return (
    <>
      <div className="thumbnail">
        <div className="thumbnail-container">
          {typeof src === 'string' && src.trim() !== '' && (
            <img src={src} alt={alt || ''} />
          )}
        </div>
        <div className="text-container">
          <h3>{h}</h3>
          <p>
            {p}
          </p>
        </div>
      </div>
    </>
  );
}