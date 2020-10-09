FROM node:12 as client
WORKDIR /client
COPY /client .
RUN npm i
RUN npm run build

FROM node:12 as server
WORKDIR /server
COPY /server .
COPY --from=client /client/dist ./dist
RUN npm i
EXPOSE 3000
ENV NODE_ENV=production
CMD ["npm", "start"]
