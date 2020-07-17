FROM node:12

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
