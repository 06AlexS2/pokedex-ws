FROM node:20-alpine

RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY package.json ./
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 && npm install
ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . .
RUN chown -R node:node /opt/app
USER node
RUN cd src/context/pokemon/infrastructure/persistence/SQLite/ && npx prisma migrate deploy
RUN npm run build

EXPOSE 3001

# Command to run the application
CMD ["npm", "start"]
