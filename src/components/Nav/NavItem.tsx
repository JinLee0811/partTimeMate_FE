import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";

interface NavItemProps {
  label: string;
  path: string;
  menuKey: string;
}

export default function NavItem({ label, path, menuKey }: NavItemProps) {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  // 현재 경로 스타일 적용 함수
  const isActive = location.pathname === path ? "text-blue-600 rounded-md" : "text-gray-800";

  return (
    <div
      className='relative'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Link to={path} className={`hover:text-blue-500 ${isActive}`}>
        {label}
      </Link>

      {/* 확장 메뉴 */}
      {isHovered && <DropdownMenu menuKey={menuKey} />}
    </div>
  );
}
