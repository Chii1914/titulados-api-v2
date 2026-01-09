# Stage 1: Build the NestJS application
FROM node:24 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Create the production image
FROM node:24

WORKDIR /usr/src/app

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

# IMPORTANT: Copy your public folder
# Make sure your NestJS app is configured to serve static files from this path
# For example, if your public folder is at the root of your project:
COPY --from=builder /usr/src/app/public ./public 

# If your public folder is inside 'src' (less common, but possible):
# COPY --from=builder /usr/src/app/src/public ./public 

# Copy any other necessary files like .env if you're not managing them through Docker environment variables
COPY .env . 

EXPOSE 3000

CMD ["node", "dist/main.js"]