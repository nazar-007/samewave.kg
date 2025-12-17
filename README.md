# Symfony + React Full-Stack Application

A unified full-stack application with Symfony 6 as the backend API and React 18 as the frontend, all in a single project structure.

## Project Structure

```
symfony-react/
├── assets/              # React source files
│   ├── components/
│   │   ├── ItemForm.jsx
│   │   ├── ItemForm.css
│   │   ├── ItemList.jsx
│   │   └── ItemList.css
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── config/              # Symfony configuration
│   └── packages/
│       └── nelmio_cors.yaml
├── public/              # Public web directory
│   ├── build/          # Compiled React assets (after build)
│   └── index.php       # Symfony entry point
├── src/                 # Symfony source code
│   └── Controller/
│       └── ApiController.php
├── vendor/              # Symfony dependencies
├── node_modules/        # Node dependencies
├── composer.json        # PHP dependencies
├── package.json         # JavaScript dependencies
├── vite.config.js       # Vite configuration
├── index.html           # React HTML template
└── README.md
```

## Features

- **Backend (Symfony 6)**
  - RESTful API with CRUD operations
  - CORS configuration for frontend communication
  - JSON responses
  - In-memory data storage (for demo purposes)

- **Frontend (React 18)**
  - Modern UI with glassmorphism effects
  - Axios for API communication
  - Form validation
  - Real-time updates
  - Responsive design

## Prerequisites

- PHP 8.1 or higher
- Composer
- Node.js 18+ and npm

## Installation

1. Install PHP dependencies:
   ```bash
   php /tmp/composer install
   ```

2. Install JavaScript dependencies:
   ```bash
   npm install
   ```

## Development

### Option 1: Run Both Servers Separately (Recommended for Development)

**Terminal 1 - Start Symfony backend:**
```bash
php -S localhost:8000 -t public
```

**Terminal 2 - Start Vite dev server:**
```bash
npm run dev
```

Then open your browser to the Vite dev server URL (usually `http://localhost:5173`). The Vite dev server will proxy API requests to the Symfony backend.

### Option 2: Build Frontend and Serve via Symfony

1. Build the React application:
   ```bash
   npm run build
   ```

2. Start the Symfony server:
   ```bash
   php -S localhost:8000 -t public
   ```

3. Open your browser to `http://localhost:8000`

## API Endpoints

### Items

- `GET /api/items` - Get all items
- `GET /api/items/{id}` - Get a specific item
- `POST /api/items` - Create a new item
  ```json
  {
    "name": "Item name",
    "description": "Item description"
  }
  ```
- `DELETE /api/items/{id}` - Delete an item

## Available Scripts

### Frontend
- `npm run dev` - Start Vite development server with hot reload
- `npm run build` - Build production-ready React app to `public/build/`
- `npm run preview` - Preview production build locally

### Backend
- `php -S localhost:8000 -t public` - Start PHP development server
- `php /tmp/composer install` - Install PHP dependencies
- `php /tmp/composer update` - Update PHP dependencies

## Technologies Used

### Backend
- Symfony 6.4
- PHP 8.1
- Nelmio CORS Bundle
- Symfony Maker Bundle

### Frontend
- React 18
- Vite 5.4
- Axios
- Modern CSS with glassmorphism
- Google Fonts (Inter)

## Development Notes

- The backend uses in-memory storage, so data will be lost when the server restarts
- CORS is configured to allow all origins for development purposes
- Vite dev server proxies `/api` requests to `http://localhost:8000`
- For production, build the frontend and serve everything through Symfony

## Project Structure Benefits

This unified structure provides:
- ✅ Single repository for both frontend and backend
- ✅ Simplified deployment process
- ✅ Shared configuration and dependencies
- ✅ Easy to maintain and version control
- ✅ Clear separation between source (`assets/`) and build (`public/build/`)

## Future Enhancements

- Add database integration (Doctrine ORM already installed)
- Implement authentication
- Add update/edit functionality
- Add pagination for items list
- Add search and filtering
- Create Symfony controller to serve React app for production
- Deploy to production environment

## License

This is a demo project for educational purposes.
