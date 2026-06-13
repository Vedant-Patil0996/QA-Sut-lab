# Stage 1: Build the React Frontend
FROM node:20-alpine AS build-frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build the FastAPI Backend
FROM python:3.11-slim
WORKDIR /app

# Install backend dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./

# Copy built frontend assets to the backend's static folder
COPY --from=build-frontend /app/frontend/dist ./static

# Expose port (Render sets PORT env variable, defaulting to 8099)
ENV PORT=8099
EXPOSE $PORT

# Start script
COPY start.sh .
RUN chmod +x start.sh

CMD ["./start.sh"]
