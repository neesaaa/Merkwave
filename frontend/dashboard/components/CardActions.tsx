import React from "react";

type ActionType = "view" | "edit" | "delete";

interface ActionButton {
  type: ActionType;
  onClick: () => void;
  label: string;
}

interface CardActionsProps {
  actions: ActionButton[];
}

const ACTION_STYLES: Record<
  ActionType,
  { gradient: string; hover: string; color: string }
> = {
  view: {
    gradient: "from-blue-500 to-blue-600",
    hover: "hover:from-blue-600 hover:to-blue-700",
    color: "blue",
  },
  edit: {
    gradient: "from-yellow-500 to-orange-500",
    hover: "hover:from-yellow-600 hover:to-orange-600",
    color: "yellow",
  },
  delete: {
    gradient: "from-red-500 to-pink-600",
    hover: "hover:from-red-600 hover:to-pink-700",
    color: "red",
  },
};

export const CardActions: React.FC<CardActionsProps> = ({ actions }) => {
  return (
    <div className="flex gap-2">
      {actions.map((action, index) => {
        const styles = ACTION_STYLES[action.type];
        return (
          <button
            key={index}
            onClick={action.onClick}
            className={`flex-1 bg-gradient-to-r ${styles.gradient} text-white px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl ${styles.hover} transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 font-medium shadow hover:shadow-lg text-xs sm:text-sm`}
            title={action.label}
            aria-label={action.label}
          >
            {ACTION_ICONS[action.type]}
          </button>
        );
      })}
    </div>
  );
};

// Pre-defined action icons
const ACTION_ICONS: Record<ActionType, React.ReactNode> = {
  view: (
    <svg
      className="w-4 h-4 sm:w-5 sm:h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  ),
  edit: (
    <svg
      className="w-4 h-4 sm:w-5 sm:h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  ),
  delete: (
    <svg
      className="w-4 h-4 sm:w-5 sm:h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  ),
};
