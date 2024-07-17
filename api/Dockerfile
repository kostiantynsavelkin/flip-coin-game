FROM node:12.14.0-alpine as build-stage
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm i

# Production stage
ENV PORT=9000

CMD npm start