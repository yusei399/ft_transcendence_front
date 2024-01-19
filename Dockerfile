FROM node:latest

WORKDIR /app_front-end
COPY package.json yarn.lock tsconfig.json next.config.mjs ./
COPY app ./app
COPY public/ ./public

RUN rm -rf node_modules yarn.lock && yarn
# RUN yarn build

ENTRYPOINT [ "yarn", "dev" ]