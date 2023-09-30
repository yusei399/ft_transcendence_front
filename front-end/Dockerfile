FROM node:latest

WORKDIR /app_front-end
COPY package.json yarn.lock tsconfig.json next.config.js ./
COPY app ./app
COPY public/ ./public

RUN npm install yarn
RUN yarn install
RUN yarn build

ENTRYPOINT [ "yarn", "start" ]