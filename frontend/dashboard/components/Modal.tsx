import React, { ReactNode } from "react";

type ModalTheme = "blue-purple" | "purple-pink" | "green-teal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  theme?: ModalTheme;
  children: ReactNode;
}

const THEME_STYLES: Record<ModalTheme, string> = {
  "blue-purple": "from-blue-600 to-purple-600",
  "purple-pink": "from-purple-600 to-pink-600",
  "green-teal": "from-green-600 to-teal-600",
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  theme = "blue-purple",
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div
          className={`sticky top-0 bg-gradient-to-r ${THEME_STYLES[theme]} text-white p-4 sm:p-6 rounded-t-2xl`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
};
