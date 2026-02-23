# GovTech Permit Application

A full-stack web application for managing permits, built with NestJS backend and Next.js frontend.

## Project Structure

This project consists of two main components:

- **back-end/**: NestJS API server handling permit management
- **permit-app/**: Next.js web application for the permit interface

## Features

- Permit creation and management
- RESTful API endpoints for permit operations
- Modern web interface for permit applications
- TypeScript throughout the stack

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Backend Setup (NestJS)

1. Navigate to the backend directory:
   ```bash
   cd back-end
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start:dev
   ```

The backend will be running on `http://localhost:3000`

### Frontend Setup (Next.js)

1. Navigate to the frontend directory:
   ```bash
   cd permit-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be running on `http://localhost:3001`

### Running the Full Application

1. Open two terminal windows
2. In the first terminal, start the backend (follow backend setup steps 1-3)
3. In the second terminal, start the frontend (follow frontend setup steps 1-3)
4. Access the application at `http://localhost:3001`

## API Endpoints

The backend provides the following endpoints:

- `GET /permit` - Get all permits
- `POST /permit` - Create a new permit
- `GET /permit/:id` - Get a specific permit
- `PUT /permit/:id` - Update a permit
- `DELETE /permit/:id` - Delete a permit

## Technologies Used

- **Backend**: NestJS, TypeScript, Jest (for testing)
- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS (configured in frontend)

## Development

- Backend uses ESLint for code linting
- Frontend uses ESLint and PostCSS
- Both projects include Jest for unit testing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request