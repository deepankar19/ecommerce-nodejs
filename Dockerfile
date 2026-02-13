# Use Node.js 20 LTS (required for Next.js 16)
FROM node:20

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with verbose output
RUN npm install --verbose

# Copy source code
COPY . .

# Build the application with verbose output
RUN npm run build --verbose 2>&1 || (cat .npm/_logs/*.log || echo "Build failed")

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
