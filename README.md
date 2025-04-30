# Resleriana DB UI

A modern web interface for browsing characters and memoria from Resleriana, built with Next.js and React.

## Features

- **Character Viewing**: Browse and search Resleriana characters with detailed information
- **Memoria Viewing**: Explore and filter Resleriana memoria cards and their effects

## Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jsncrz/resleriana-db-ui.git
   cd resleriana-db-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the project root
   - Add necessary environment variables (refer to `.env.example` if available)

## Development

Start the development server with Turbopack:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## Related project
- [Resleriana DB API](https://github.com/jsncrz/resleriana-db) - This app uses the API URLS from this Spring app

## Project Structure

This project follows the [Bulletproof React](https://github.com/alan2207/bulletproof-react) architecture for scalable and maintainable React applications.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Architecture**: [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- **UI Components**: [shadcn UI](https://ui.shadcn.com)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack React Query](https://tanstack.com/query)

## 📋 Todo

- [ ] Add Equipments & Battle Items
- [ ] Add CI/CD pipeline


## 🙏 Acknowledgments

- Atelier Resleriana game developers.