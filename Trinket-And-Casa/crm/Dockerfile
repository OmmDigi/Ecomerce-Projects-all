# # ------------------------
# # Stage 1: Build
# # ------------------------
# FROM node:18-alpine AS builder
# WORKDIR /app

# COPY package*.json ./
# RUN npm ci

# COPY . .
# RUN npm run build

# # ------------------------
# # Stage 2: Runtime (Minimal)
# # ------------------------
# FROM alpine:3.18

# # Create app folder
# WORKDIR /app

# # Copy ONLY the dist folder
# COPY --from=builder /app/dist ./dist

# # No command needed — just export files


# ------------------------
# Stage 1: Build
# ------------------------
FROM node:24 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

ARG VITE_API_BASE_URL
ARG VITE_API_UPLOAD_BASE_URL

COPY . .
RUN npm run build

# ------------------------
# Stage 2: Runtime (nginx)
# ------------------------
FROM nginx:1.25-alpine

# remove default site
RUN rm -rf /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80