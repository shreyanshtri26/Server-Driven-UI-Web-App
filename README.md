
# Server-Driven UI Web Application

A modern web application that demonstrates server-driven UI rendering with React frontend and Node.js backend. This app enables dynamic UI component creation, storage, and rendering based on JSON definitions from the server.

## Features

- Server-driven UI architecture with JSON component definitions
- Dynamic rendering of UI components on the client
- JWT-based authentication system
- MongoDB database for component and user storage
- Responsive modern design with animations
- Component creation with visual previews
- Custom color selection for components

## Architecture Overview

### Backend

The backend is built with Node.js and Express, providing a RESTful API that handles:

- User authentication (registration and login) using JWT
- Component storage and retrieval from MongoDB
- Dynamic UI component definitions as JSON structures
- API security through authentication middleware

**Key Components:**
- **Models**: MongoDB schemas for users and UI components
- **Controllers**: Logic for handling auth and component operations
- **Routes**: API endpoints for client-server communication
- **Middleware**: Authentication and request processing

### Frontend

The frontend is built with React, providing a dynamic UI that:

- Renders components based on server-provided JSON definitions
- Provides an intuitive interface for creating custom components
- Offers secure authentication with JWT storage
- Shows live previews of components during creation

**Key Components:**
- **Authentication**: Context-based auth system with protected routes
- **Dynamic Renderer**: Custom component that renders UI from JSON
- **Component Container**: Manages fetching and displaying components
- **Dashboard**: Interface for creating new components with previews

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm package manager

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/shreyanshtri26/Server-Driven-UI-Web-App.git
cd server-driven-ui-web-app
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/server-driven-ui
JWT_SECRET=your-secret-key-here" > .env
```

> Note: Replace the MongoDB URI with your actual database connection string. For MongoDB Atlas, use the connection string provided by the service.

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

## Running the Application

### 1. Start MongoDB

If you're using a local MongoDB instance, make sure it's running:

```bash
# Example for starting MongoDB locally (commands may vary by installation method)
mongod --dbpath=/path/to/data/db
```

### 2. Start the Backend Server

```bash
cd backend
npm start
```

The server will start on http://localhost:5000 (or the port specified in your .env file).

### 3. Start the Frontend Development Server

```bash
cd frontend
npm start
```

The React development server will start on http://localhost:3000 and automatically open in your browser.

## Application Workflow

1. **Register/Login**: Create an account or log in to access the dashboard
2. **Dashboard**: Create custom UI components with:
   - Different component types (cards, alerts, buttons)
   - Custom text content
   - Color customization
   - Real-time preview
3. **Components View**: View all your created components rendered dynamically

## API Endpoints

- **POST** `/api/register` - Register a new user
- **POST** `/api/login` - Authenticate and receive JWT token
- **GET** `/api/user` - Get current user information
- **GET** `/api/components` - Retrieve all components for the authenticated user
- **POST** `/api/components` - Create a new UI component
- **GET** `/api/components/:id` - Get a specific component by ID

## Example Component JSON Structure

```json
{
  "type": "div",
  "props": {
    "className": "dynamic-card",
    "style": {
      "padding": "20px",
      "backgroundColor": "#f0f0f0",
      "borderRadius": "8px",
      "boxShadow": "0 2px 4px rgba(0,0,0,0.1)"
    }
  },
  "children": [
    {
      "type": "h2",
      "props": {
        "style": {
          "color": "#000000"
        }
      },
      "children": ["Card Title"]
    },
    {
      "type": "p",
      "props": {
        "style": {
          "color": "#000000"
        }
      },
      "children": ["This is a dynamically rendered card component."]
    }
  ]
}
```

## Technologies Used

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT
- **Frontend**: React, React Router, Axios, Context API
- **Styling**: CSS with custom animations, Font Awesome icons

## Project Structure

```
server-driven-ui-web-app/
├── backend/                 # Node.js server
│   ├── config/              # Database configuration
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Auth middleware
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── .env                 # Environment variables
│   ├── package.json         # Dependencies
│   └── server.js            # Entry point
│
└── frontend/                # React client
    ├── public/              # Static files
    ├── src/
    │   ├── components/      # React components
    │   ├── containers/      # Container components
    │   ├── context/         # Context providers
    │   ├── pages/           # Page components
    │   ├── App.js           # Main component
    │   ├── App.css          # Global styles
    │   └── index.js         # Entry point
    └── package.json         # Dependencies
```

## Future Improvements

- Component editing functionality
- Component templates/blueprints
- More advanced component types
- Drag-and-drop component builder
- Server-side rendering for improved performance
- Component sharing between users

