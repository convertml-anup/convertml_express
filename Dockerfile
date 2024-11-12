# Use official Node.js image
FROM node:18

# Create and set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other files
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose the port the app will run on
EXPOSE 5000

# Command to run the app
CMD ["npm", "run", "start"]
