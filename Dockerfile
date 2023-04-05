FROM node:14-alpine as base

WORKDIR /usr/prod/app

ENV NODE_ENV=productio

COPY package.json yarn.lock ecosystem.config.json ./

RUN yarn install --production --pure-lockfile

COPY --from=base /usr/src/app/dist ./dist

EXPOSE 3000
CMD [ "yarn", "start" ]