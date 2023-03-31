FROM node:14
RUN mkdir -p /app/src
WORKDIR /app/src
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3003
EXPOSE 8080
# CMD ["node", "index.js"]
# RUN npm run start
CMD ["node", "server/index.js"]