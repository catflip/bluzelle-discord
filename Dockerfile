FROM node:alpine
WORKDIR /usr/yourapplication-name
COPY package.json .
RUN npm install
RUN npm install typescript
RUN npm install -g tsc
COPY . .
RUN npm run build
CMD ["node", "./dist/index.js"]