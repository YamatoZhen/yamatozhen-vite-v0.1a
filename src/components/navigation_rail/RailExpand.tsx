export default function RailExpand({
    menuItems,
    children
}: {
    menuItems: { label: string; href?: string; onClick?: () => void; className?: string }[];
    children?: React.ReactNode;
}) {
    return (
        <div className="rail-container">
            <div className="rail-content">
                {menuItems.map((menuItem, index) => (
                    <li className={menuItem.className} key={index}>
                        <a onClick={menuItem.onClick} href={menuItem.href}>
                            {menuItem.label}
                        </a>
                    </li>
                ))}
                {children}
            </div>
        </div>
    );
}