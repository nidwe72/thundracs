#!/bin/bash

# Verify Thundracs project setup

echo "Verifying Thundracs project setup..."
echo "====================================="

# Check directory structure
echo "\n1. Checking directory structure..."
if [ -d "backend" ] && [ -d "frontend" ]; then
    echo "✓ Backend and frontend directories exist"
else
    echo "✗ Missing backend or frontend directory"
    exit 1
fi

# Check backend files
echo "\n2. Checking backend files..."
if [ -f "backend/pom.xml" ]; then
    echo "✓ Backend pom.xml exists"
else
    echo "✗ Missing backend/pom.xml"
fi

if [ -f "backend/src/main/java/sciens/webapp/thundracs/Main.java" ]; then
    echo "✓ Spring Boot main class exists"
else
    echo "✗ Missing Spring Boot main class"
fi

if [ -f "backend/src/main/java/sciens/webapp/thundracs/controller/ExampleController.java" ]; then
    echo "✓ Example controller exists"
else
    echo "✗ Missing example controller"
fi

# Check frontend files
echo "\n3. Checking frontend files..."
if [ -f "frontend/package.json" ]; then
    echo "✓ Frontend package.json exists"
    # Check for React dependencies
    if grep -q "react" frontend/package.json; then
        echo "✓ React dependency found"
    else
        echo "✗ React dependency not found"
    fi
else
    echo "✗ Missing frontend/package.json"
fi

if [ -f "frontend/src/App.tsx" ]; then
    echo "✓ Frontend App.tsx exists"
else
    echo "✗ Missing frontend App.tsx"
fi

if [ -f "frontend/src/services/api.ts" ]; then
    echo "✓ API service exists"
else
    echo "✗ Missing API service"
fi

# Check for required directories
echo "\n4. Checking for required directories..."
if [ -d "frontend/src/components" ]; then
    echo "✓ Components directory exists"
else
    echo "✗ Missing components directory"
fi

if [ -d "frontend/src/pages" ]; then
    echo "✓ Pages directory exists"
else
    echo "✗ Missing pages directory"
fi

if [ -d "frontend/src/services" ]; then
    echo "✓ Services directory exists"
else
    echo "✗ Missing services directory"
fi

if [ -d "backend/src/main/java/sciens/webapp/thundracs/controller" ]; then
    echo "✓ Backend controller directory exists"
else
    echo "✗ Missing backend controller directory"
fi

if [ -d "backend/src/main/java/sciens/webapp/thundracs/service" ]; then
    echo "✓ Backend service directory exists"
else
    echo "✗ Missing backend service directory"
fi

if [ -d "backend/src/main/java/sciens/webapp/thundracs/repository" ]; then
    echo "✓ Backend repository directory exists"
else
    echo "✗ Missing backend repository directory"
fi

if [ -d "backend/src/main/java/sciens/webapp/thundracs/model" ]; then
    echo "✓ Backend model directory exists"
else
    echo "✗ Missing backend model directory"
fi

echo "\n====================================="
echo "Setup verification complete!"
echo "\nTo start the application:"
echo "  ./start-dev.sh"
echo "\nOr manually:"
echo "  Backend: cd backend && ./mvnw spring-boot:run"
echo "  Frontend: cd frontend && npm run dev"