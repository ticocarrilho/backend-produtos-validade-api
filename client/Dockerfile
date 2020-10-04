FROM node:12
RUN mkdir app
WORKDIR /app
COPY . /app
RUN npm i
COPY . /app
RUN npm run build
EXPOSE 4200
CMD ["npm", "start"]