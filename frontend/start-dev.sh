#!/bin/bash

# Load fnm if available
FNM_NODE_PATH="$HOME/.local/share/fnm/node-versions/v25.8.1/installation/bin"
if [ -d "$FNM_NODE_PATH" ]; then
    echo "Using Node.js v25.8.1 from fnm"
    export PATH="$FNM_NODE_PATH:$PATH"
else
    # Fallback to nvm
    if [ -s "$HOME/.nvm/nvm.sh" ]; then
        source "$HOME/.nvm/nvm.sh"
        nvm use 24.14.0 2>/dev/null || nvm use default
    fi
fi

# Check Node version
NODE_VERSION=$(node --version 2>/dev/null || echo "Unknown")
echo "Using Node.js version: $NODE_VERSION"

# Check if Node version is sufficient (Vite requires >=20.19.0)
if [[ "$NODE_VERSION" =~ ^v([0-9]+)\. ]]; then
    MAJOR_VERSION="${BASH_REMATCH[1]}"
    if [ "$MAJOR_VERSION" -lt 20 ]; then
        echo "ERROR: Node.js version $NODE_VERSION is too old. Vite requires Node.js >=20.19.0"
        echo "Please install Node.js v25.8.1 using: fnm install 25.8.1"
        exit 1
    else
        echo "Node.js version is compatible with Vite"
    fi
else
    echo "WARNING: Could not determine Node.js version"
fi

# Start the dev server
echo "Starting Vite dev server..."
npm run dev