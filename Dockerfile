
# Stage 1 - Build the app
FROM node:lts as mapa-innovacio-build
WORKDIR /app
COPY . ./
RUN npm ci
RUN npm run build

# Stage 2 - The production environment
FROM nginx:alpine as mapa-innovacio
LABEL maintainer="Francesc Busquets <fbusquets@xtec.cat>"
EXPOSE 80
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=mapa-innovacio-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
