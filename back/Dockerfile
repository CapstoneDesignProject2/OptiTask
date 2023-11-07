FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY back/package*.json ./
RUN npm install

# Bundle app source
COPY back/ .

# Build app
RUN npm run build

# Expose port
EXPOSE 3000

# Run app
CMD ["npm", "start"]