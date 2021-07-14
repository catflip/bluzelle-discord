FROM node:alpine
WORKDIR /usr/yourapplication-name
COPY package.json .
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
CMD ["node", "./dist/index.js"]