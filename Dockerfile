    FROM node:alpine
    WORKDIR /usr/yourapplication-name
    COPY package.json .
    RUN npm install\
        && npm install tsc -g
    COPY . .
    RUN tsc
    CMD ["node", "./dist/index.js"]