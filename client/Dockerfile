# Stage 1
FROM node:18.10 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
# Stage 2
FROM nginx:alpine
COPY --from=node /app/proxy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/client /usr/share/nginx/html
