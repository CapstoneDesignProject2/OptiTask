# Build stage
FROM node:18 as build-stage

# Create app directory
WORKDIR /app

# Install app dependencies
COPY front/package*.json ./
RUN npm install

# Bundle app source
COPY front/ .

# Build app
RUN npm run build

# Production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
