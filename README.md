# Nooro Frontend

A Next.js frontend application for the Nooro project.

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the root directory and add your backend API URL:

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

**Note:** Replace `http://localhost:4000` with your actual Express backend API URL.

## Running the App

### Development Mode

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

- `app/` - Next.js app directory with components and pages
- `components/ui/` - Reusable UI components
- `types/` - TypeScript type definitions
- `lib/` - Utility functions

## Technologies & Tools

- **Next.js 15.5.0** - React framework with App Router and Turbopack
- **React 19.1.0** - Latest React version with modern features
- **React Query (TanStack Query) 5.85.5** - Server state management and data fetching
- **shadcn/ui** - Pre-built, accessible UI components built on Radix UI
- **TypeScript 5** - Type-safe JavaScript development
- **Tailwind CSS 4** - Latest version of utility-first CSS framework
- **ESLint 9** - Latest version for code linting and quality enforcement

### Component Architecture

The app follows a modular component structure:

- **UI Components** (`components/ui/`) - Reusable, styled components like buttons, cards, and inputs
- **Feature Components** (`app/components/`) - Business logic components specific to the application
- **Custom Hooks** (`app/hooks/`) - Reusable logic for data fetching and state management
