#!/bin/bash

# Start development environment for Thundracs application

echo "Starting Thundracs development environment..."
echo "============================================"

# Function to handle cleanup on exit
cleanup() {
    echo "\nShutting down services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Trap Ctrl+C and other termination signals
trap cleanup SIGINT SIGTERM

# Check if Maven is available
if command -v mvn &> /dev/null; then
    MAVEN_CMD="mvn"
    echo "✓ Using system Maven"
elif [ -f "backend/mvnw" ]; then
    MAVEN_CMD="./mvnw"
    echo "✓ Using Maven wrapper"
    # Fix for mvnw macOS options on Linux
    export MAVEN_SKIP_RC=true
else
    echo "✗ Maven not found. Please install Maven or ensure mvnw exists in backend/"
    exit 1
fi

# Start backend
echo "\nStarting Spring Boot backend..."
cd backend
$MAVEN_CMD spring-boot:run > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend started with PID: $BACKEND_PID"
echo "Backend logs: backend.log"
cd ..

# Wait longer for backend to start (Spring Boot can take time)
echo "\nWaiting for backend to start (10 seconds)..."
sleep 10

# Check if backend is running
echo "Checking backend status..."
if curl -s --max-time 5 http://localhost:8080/api/hello > /dev/null; then
    echo "✓ Backend is running and responding"
else
    echo "✗ Backend may not be running properly. Check backend.log for details"
    echo "Last 10 lines of backend.log:"
    tail -10 backend.log
fi

# Start frontend with correct Node.js version
echo "\nStarting React frontend..."

# Set up fnm Node.js environment
FNM_NODE_PATH="$HOME/.local/share/fnm/node-versions/v25.8.1/installation/bin"
if [ -d "$FNM_NODE_PATH" ]; then
    echo "Using Node.js v25.8.1 from fnm"
    export PATH="$FNM_NODE_PATH:$PATH"
else
    echo "Warning: fnm Node.js v25.8.1 not found at $FNM_NODE_PATH"
    echo "Falling back to system Node.js"
fi

# Verify Node.js version
NODE_VERSION=$(node --version 2>/dev/null || echo "Unknown")
echo "Node.js version: $NODE_VERSION"

# Check if Node.js version is compatible (Vite requires >=20.19.0)
if [[ "$NODE_VERSION" =~ ^v([0-9]+)\. ]]; then
    MAJOR_VERSION="${BASH_REMATCH[1]}"
    if [ "$MAJOR_VERSION" -lt 20 ]; then
        echo "✗ Node.js version $NODE_VERSION is too old. Vite requires Node.js >=20.19.0"
        echo "Please install Node.js v25.8.1 using: fnm install 25.8.1"
        echo "Or update the FNM_NODE_PATH in this script"
    else
        echo "✓ Node.js version is compatible with Vite"
    fi
else
    echo "✗ Could not determine Node.js version"
fi

cd frontend
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend started with PID: $FRONTEND_PID"
echo "Frontend logs: frontend.log"
cd ..

# Wait for frontend to start
sleep 3

# Check if frontend is running
echo "\nChecking frontend status..."
if curl -s --max-time 5 http://localhost:5173 > /dev/null; then
    echo "✓ Frontend is running"
else
    echo "✗ Frontend may not be running properly. Check frontend.log for details"
    echo "Last 10 lines of frontend.log:"
    tail -10 frontend.log
fi

echo "\n============================================"
echo "Services are running!"
echo "- Backend: http://localhost:8080"
echo "- Frontend: http://localhost:5173"
echo "- API endpoint: http://localhost:8080/api/hello"
echo "\nTest the API:"
echo "  curl http://localhost:8080/api/hello"
echo "\nOpen the frontend in your browser:"
echo "  open http://localhost:5173  # on macOS"
echo "  xdg-open http://localhost:5173  # on Linux"
echo "\nPress Ctrl+C to stop all services"
echo "============================================"

# Wait for user to press Ctrl+C
wait