# Navbar Component Structure

This directory contains the refactored Navbar component split into smaller, reusable modules for better maintainability and readability.

## Component Breakdown

### `index.tsx`

Main Navbar component that orchestrates all sub-components. Handles:

- Authentication state management
- Route navigation
- Mobile menu toggling

### `NavLogo.tsx`

Dashboard logo and branding component.

- Fully self-contained
- Links to `/dashboard`

### `NavItem.tsx`

Individual navigation link component.

- Props: `name`, `path`, `isActive`, `isMobile`, `onClick`
- Supports both desktop and mobile styling
- Handles active state highlighting

### `LogoutButton.tsx`

Logout button with responsive variants.

- Props: `onLogout`, `isMobile`
- Different layouts for desktop vs mobile
- Includes SVG icon

### `MobileMenuToggle.tsx`

Hamburger menu toggle button.

- Props: `isOpen`, `onToggle`
- Animated icon transition (hamburger ↔ X)
- Hidden on desktop (lg+ breakpoint)

### `DecorativeBackground.tsx`

Decorative blur orbs for visual enhancement.

- Purely presentational
- No props needed

## Usage

```tsx
import Navbar from "@/components/Navbar";

// In your layout or page
<Navbar />;
```

## Benefits of This Structure

- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Components like `NavItem` and `LogoutButton` can be used elsewhere
- **Testability**: Smaller components are easier to unit test
- **Maintainability**: Changes to one component don't affect others
- **Readability**: Main Navbar file is now ~80 lines instead of 130+
