
# Use Node.js base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Vite dev server runs on
EXPOSE 5173

# Start the development server and allow external access
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
