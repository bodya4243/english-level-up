FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json from vite-project directory
COPY vite-project/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY vite-project .

# Expose the port Vite runs on
EXPOSE 5173

# Build the project
RUN npm run build

# Start the server
CMD ["npm", "run", "dev"]
