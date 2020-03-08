FROM node as stage
WORKDIR /app
COPY . /app/

RUN npm install --silent
RUN npm run build

FROM nginx:alpine
COPY --from=stage /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]