# Project Structure

## Overview

This document outlines the organization and purpose of files and directories within the `@/src` folder. The project follows a modular architecture pattern with clear separation of concerns.

### Component Updates Required

⚠️ **IMPORTANT**: Update this file as the project grows to prevent out of date data.

## Root Structure

```
@/src/
├── environment.ts          # Environment configuration and validation
├── router.tsx             # Main application routing configuration
├── main.tsx               # Application entry point
├── common/                # Shared utilities, components, and types
└── modules/               # Feature-specific modules
```

## Common Directory (`@/src/common/`)

The `common` directory contains shared code used across multiple modules.

### Components (`@/src/common/components/`)

Reusable UI components and error boundaries:

- **`error-boundary/`** - Error handling components
  - `auth-layout-with-error.tsx` - Error element preserving auth layout
  - `login-layout-with-error.tsx` - Error element preserving login layout
  - `route-error.tsx` - Main error display component
- **`theme-provider.tsx`** - Theme context provider (dark/light/system)
- **`theme-toggle.tsx`** - Theme switching component (commented - requires UI library)

### Lib (`@/src/common/lib/`)

External library integrations, utilities, and services:

- **`utils.ts`** - General utility functions
  - `cn()` - Class name merging utility (clsx + tailwind-merge)
  - `urlB64ToUint8Array()` - Base64 to Uint8Array conversion
- **`services/`** - API and external service integrations
  - `query.interceptor.ts` - HTTP interceptor (commented - requires setup)

### Hooks (`@/src/common/hooks/`)

Custom React hooks:

- **`use-mobile.tsx`** - Mobile detection hook
  - `useIsMobile()` - Returns boolean for mobile viewport detection

### Layouts (`@/src/common/layouts/`)

Layout components for different page types:

- **`auth-layout.tsx`** - Layout for authenticated pages
  - Includes sidebar space, auth validations, and guards
- **`layout.tsx`** - Layout for non-authenticated pages (landing, signup)

### Stores (`@/src/common/stores/`)

State management stores:

- **`.gitkeep`** - Placeholder for state management files
- Add Zustand, Redux, or other state management stores here

### Types (`@/src/common/types/`)

TypeScript type definitions:

- **`routes.ts`** - Application route constants
  - `Routes` enum with all application routes

### Utils (`@/src/common/utils/`)

Utility functions and helpers:

- **`api-error.ts`** - API error handling utilities
  - `ApiError` interface and `isApiError()` type guard
- **`constants.ts`** - Application-wide constants and enums
  - `QUEST_IDS` - Quest identifier constants including `USER_SIGNUP`
- **`date.ts`** - Date formatting utilities
  - `formatDate()` - Formats dates for display
- **`debounce.ts`** - Debounce utility function
  - `debounce()` - Creates debounced function with cancel capability
- **`logger.ts`** - Logging utility with PostHog integration
  - `Logger` class with debug, info, warn, error methods
- **`wallet.ts`** - Wallet-related utilities
  - `parseWalletAddress()` - Formats wallet addresses for display

### Views (`@/src/common/views/`)

Shared page-level components:

- **`not-found.tsx`** - 404 page component
  - Handles both authenticated and non-authenticated states

## Modules Directory (`@/src/modules/`)

Feature-specific modules following a consistent structure.

### Home Module (`@/src/modules/home/`)

Example module structure:

- **`router.tsx`** - Module-specific routing configuration
- **`assets/`** - Module-specific assets (images, icons, etc.)
- **`components/`** - Module-specific UI components
- **`hooks/`** - Module-specific custom hooks
- **`types/`** - Module-specific TypeScript types
- **`views/`** - Module-specific page components
  - `home.tsx` - Main home page component

## Configuration Files

### Environment (`@/src/environment.ts`)

Environment variable configuration using Zod validation:

- **Port configuration** - Default port 3000
- **Node environment** - Development/production/test
- **Database configuration** - Connection URL and pool settings
- **PostHog configuration** - Analytics and monitoring settings

### Router (`@/src/router.tsx`)

Main application routing with error handling and scroll restoration:

- **Route configuration** - Combines all module routes
- **Error handling** - Adds error boundaries to routes
- **Scroll restoration** - Maintains scroll position on navigation
- **Layout integration** - Applies appropriate layouts to routes

## File Naming Conventions

- **Components**: PascalCase (e.g., `ThemeProvider.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useMobile.tsx`)
- **Utilities**: camelCase (e.g., `api-error.ts`, `wallet.ts`, `debounce.ts`)
- **Types**: camelCase (e.g., `routes.ts`)
- **Constants**: UPPER_SNAKE_CASE in files (e.g., `QUEST_IDS`)

## Import Aliases

The project uses the `@/src` alias for imports:

```typescript
// Instead of relative imports
import { Routes } from "../../common/types/routes";

// Use alias imports
import { Routes } from "@/common/types/routes";
```

## Module Structure Pattern

Each module should follow this structure:

```
@/src/modules/[module-name]/
├── router.tsx          # Module routes
├── assets/             # Module assets
├── components/         # Module components
├── hooks/              # Module hooks
├── types/              # Module types
└── views/              # Module views
```

## Best Practices

1. **Keep common code in `@/src/common/`** - Avoid duplicating shared functionality
2. **Use module structure for features** - Organize feature-specific code in modules
3. **Follow naming conventions** - Maintain consistent file and folder naming
4. **Use TypeScript** - All files should have proper type definitions
5. **Document complex utilities** - Add JSDoc comments for helper functions
6. **Keep components focused** - Each component should have a single responsibility

## Adding New Modules

To add a new module:

1. Create a new directory in `@/src/modules/[module-name]/`
2. Follow the standard module structure
3. Create a `router.tsx` file for module routes
4. Add module routes to the main router configuration
5. Update this documentation with the new module structure
