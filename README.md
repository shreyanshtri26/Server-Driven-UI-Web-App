# Server-Driven UI Web App

A modern web application that demonstrates server-driven UI rendering with React frontend and Node.js backend.

## Features

- Dynamic UI component rendering based on server-side JSON data
- JWT-based authentication
- MongoDB database integration
- Modern React components with routing
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or a cloud instance)
- npm or yarn package manager

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd server-driven-ui-web-app
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/server-driven-ui
JWT_SECRET=your-secret-key-here
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. In a new terminal, start the frontend development server:
```bash
cd frontend
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- POST `/api/register` - Register a new user
- POST `/api/login` - Login and get JWT token
- GET `/api/components` - Get UI components (requires authentication)
- POST `/api/components` - Create new UI component (requires authentication)

## Example UI Component JSON Structure

```json
{
  "type": "div",
  "props": {
    "className": "card",
    "style": {
      "padding": "20px",
      "margin": "10px",
      "backgroundColor": "white",
      "borderRadius": "8px",
      "boxShadow": "0 2px 4px rgba(0,0,0,0.1)"
    }
  },
  "children": [
    {
      "type": "h2",
      "props": {},
      "children": ["Welcome to the Dashboard"]
    },
    {
      "type": "p",
      "props": {},
      "children": ["This is a dynamically rendered component"]
    }
  ]
}
```