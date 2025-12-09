# EKA Project

A full-stack web application with a React frontend and Node.js backend.

## Project Structure

```
├── website/          # React + TypeScript frontend (Vite)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── data/          # Static data & products
│   │   ├── hooks/         # Custom hooks
│   │   └── lib/           # Utilities
│   └── package.json
├── backend/          # Node.js + Express backend
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   └── package.json
└── package.json      # Root workspace
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install website dependencies
cd ../website
npm install
```

### Running the Application

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd website
npm run dev
```

The website will be available at `http://localhost:5173` (Vite default)

## Features

- **Frontend**: Modern React UI with TypeScript, Tailwind CSS, and shadcn/ui components
- **Backend**: Express.js REST API with order management
- **E-commerce**: Product shop and cart functionality
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Component Library**: Pre-built UI components from shadcn/ui

## Available Scripts

### Frontend (website/)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend (backend/)
- `npm start` - Start the server

## Technologies

- **Frontend**: React 18, TypeScript, Vite, TailwindCSS, shadcn/ui
- **Backend**: Node.js, Express.js
- **Styling**: TailwindCSS, PostCSS
- **Tools**: ESLint, TypeScript compiler

## License

Proprietary - EKA Project

## Contact

For questions or support, please contact the development team.
