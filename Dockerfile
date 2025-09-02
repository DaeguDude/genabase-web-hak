# Use Node.js image as the base
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install only production dependencies (ignores devDependencies)
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js app (this will create the .next folder)
RUN npm run build

# ---- Production Image ----
FROM node:18-alpine AS runner

WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose the port that the app will run on
EXPOSE 3000

# Start Next.js in production mode
CMD ["node", "server.js"]