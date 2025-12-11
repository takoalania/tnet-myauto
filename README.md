# MyAuto.ge Search UI (React + TypeScript)

A simple and clean implementation of the MyAuto.ge-style search page
using React, TypeScript, Vite, and TailwindCSS. The project includes a
full filter sidebar, product list with cards, data-loading skeletons,
and a clean folder structure.

## Features

-   Filter sidebar with:
-   Category tabs (car, moto, tractor)
-   Manufacturer multiselect
-   Model multiselect grouped by manufacturer
-   Category select
-   Price range and currency switch
-   Product list with:
-   Highlighted (promoted) items
-   Image, specifications and location
-   Custom price formatting
-   Responsive mobile/desktop layout
-   Skeleton loader while data loads

## Tech Stack

-   React + TypeScript
-   Vite
-   TailwindCSS
-   Custom hooks for API requests
-   Feature-based folder structure
-   SVG support via `?react`

## Project Structure

    src/
      assets/
        icons/            # SVG files used as React components
      components/
        common/           # Shared UI components (Header, Breadcrumb, etc.)
        FilterSidebar/    # UI-only filter components
        ProductCard/      # Product card UI + small helper utils
      features/
        filters/          # Filtering logic, hooks, utils, types
        products/         # Product fetching logic, hooks, types
      pages/
        Home.tsx          # Main page
      types/              # Global shared types
      config/             # API configs

## Installation

    npm install
    npm run dev

## Development Commands

    npm run dev
    npm run build
    npm run preview

## Notes

-   Icons used inside the UI are loaded via `?react`.
-   Flags remain in the `public/flags` directory and are referenced as image URLs.
