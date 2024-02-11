FROM node:lts-alpine

RUN addgroup -g 1001 -S transcendence_group && adduser -u 1001 -S transcendence -G transcendence_group
WORKDIR /app_front-end
COPY package*.json yarn.lock tsconfig*.json next.config.mjs ./
COPY app/ ./app
COPY lib/ ./lib
COPY services ./services
COPY public ./public
COPY shared ./shared

RUN yarn install && \
    yarn build && \
    rm -rf app lib services shared tsconfig*.json node_modules && \
    yarn install --production && \
    rm -f package*.json yarn.lock

RUN chown -R transcendence:transcendence_group ./
USER transcendence

ENTRYPOINT [ "npx", "next", "start" ]