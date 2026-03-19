# Thundracs Application

A full-stack web application with Spring Boot backend and React frontend.

## Project Structure

```
project-name/
├── backend/                 # Spring Boot application
│   ├── src/main/java/      # Java source code (controllers, services, repositories)
│   └── pom.xml             # Maven build configuration
└── frontend/               # React application
    ├── src/
    │   ├── App.tsx
    │   ├── components/     # Reusable React components
    │   ├── pages/          # Page components
    │   └── services/       # API communication logic
    └── package.json
```

## Getting Started

### Backend (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build and run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

3. The backend will be available at `http://localhost:8080`

### Frontend (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The frontend will be available at `http://localhost:5173` (or similar)

## API Endpoints

- `GET /api/hello` - Returns a greeting message from the backend

## Development

### Backend Structure
- `controller/` - REST API controllers
- `service/` - Business logic services
- `repository/` - Data access layer
- `model/` - Data models/entities

### Frontend Structure
- `components/` - Reusable UI components
- `pages/` - Page-level components
- `services/` - API communication services