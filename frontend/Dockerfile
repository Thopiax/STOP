FROM node:12.16.1-alpine AS builder
WORKDIR /app
COPY yarn.lock /app/yarn.lock
COPY package.json /app/package.json
RUN yarn install
COPY src /app/src
COPY public /app/public
COPY .env.production /app/.env.production
RUN yarn run build


FROM node:12.16.1-alpine
WORKDIR /app
RUN yarn add serve
COPY --from=builder /app/build /app/build
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/yarn.lock /app/yarn.lock
EXPOSE 3000
CMD yarn serve -s build -l tcp://0.0.0.0:$PORT
