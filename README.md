# Wedding Website - Viktória & Bence

A beautiful wedding website built with modern web technologies for Viktória Barbara Pintér & Bence Szabó's wedding on May 1st, 2026.

## Features

- Elegant and responsive design
- Wedding countdown timer
- Venue information and location
- RSVP functionality
- Photo gallery
- Wedding details and schedule

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn/ui** - Modern UI components
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

## Development

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Getting Started

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd wedding-website
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

Build the project for production:

```sh
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── wedding/        # Wedding-specific components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Static assets
```
