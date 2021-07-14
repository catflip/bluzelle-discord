FROM node:alpine
WORKDIR /usr/yourapplication-name
COPY package.json .
RUN yarn install --frozen-lockfile
COPY . .
RUN npx tsc
CMD ["node", "./dist/index.js"]