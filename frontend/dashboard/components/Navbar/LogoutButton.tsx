interface LogoutButtonProps {
  onLogout: () => void;
  isMobile?: boolean;
}

export const LogoutButton = ({
  onLogout,
  isMobile = false,
}: LogoutButtonProps) => {
  const baseClasses =
    "flex items-center gap-2 bg-red-500/90 hover:bg-red-600 rounded-xl transition-all duration-300 font-medium shadow-lg backdrop-blur-sm";

  const desktopClasses =
    "px-4 xl:px-5 py-2 xl:py-2.5 hover:shadow-xl hover:scale-105 text-sm xl:text-base";
  const mobileClasses = "w-full justify-center px-4 py-3";

  return (
    <button
      onClick={onLogout}
      className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
    >
      <svg
        className="w-4 h-4 xl:w-5 xl:h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      {isMobile ? (
        <span>Logout</span>
      ) : (
        <>
          <span className="hidden xl:inline">Logout</span>
          <span className="xl:hidden">Exit</span>
        </>
      )}
    </button>
  );
};
