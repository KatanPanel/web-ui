# Build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY entrypoint.sh entrypoint.sh
RUN chmod +x ./entrypoint.sh

ENV VUE_APP_KATAN_GIT_COMMIT=$SOURCE_COMMIT
ENV VUE_APP_KATAN_GIT_BRANCH=$SOURCE_COMMIT
CMD ["./entrypoint.sh"]