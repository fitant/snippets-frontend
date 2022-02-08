FROM node:lts as build
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci --silent
COPY . .
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/dist/xBin /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf