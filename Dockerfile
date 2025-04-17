# Use Node.js 16 or 18 as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (this will install express and other dependencies)
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Command to run the app
CMD ["node", "index.js"]
