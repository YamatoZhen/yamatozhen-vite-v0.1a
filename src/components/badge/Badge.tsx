import './Badge.css'

function Badge({
    children,
    type,
  }: {
    type?: 'warning' | 'success' | 'danger';
    children?: React.ReactNode;
  }) {
    return <span className={`badge ${type ?? 'default'}`}>{children}</span>;
  }
  
  export { Badge };