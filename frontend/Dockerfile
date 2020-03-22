FROM node:12.2.0-alpine

WORKDIR /app

COPY package.json /app/package.json
RUN npm install
RUN npm install react-scripts@3.0.1 -g

COPY . /app

EXPOSE 3000
ENTRYPOINT ["npm", "start"]
