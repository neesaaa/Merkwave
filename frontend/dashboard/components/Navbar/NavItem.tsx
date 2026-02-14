import Link from "next/link";

interface NavItemProps {
  name: string;
  path: string;
  isActive: boolean;
  isMobile?: boolean;
  onClick?: () => void;
}

export const NavItem = ({
  name,
  path,
  isActive,
  isMobile = false,
  onClick,
}: NavItemProps) => {
  const baseClasses = "transition-all duration-300 font-medium";

  const desktopClasses = `px-4 xl:px-5 py-2 xl:py-2.5 rounded-xl text-sm xl:text-base ${
    isActive
      ? "bg-white text-purple-600 shadow-lg font-semibold scale-105"
      : "hover:bg-white/20 backdrop-blur-sm hover:scale-105"
  }`;

  const mobileClasses = `block px-4 py-3 rounded-xl ${
    isActive
      ? "bg-white text-purple-600 shadow-lg font-semibold"
      : "bg-white/10 backdrop-blur-sm hover:bg-white/20"
  }`;

  return (
    <Link
      href={path}
      onClick={onClick}
      className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
    >
      {name}
    </Link>
  );
};
