FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install modules
COPY package*.json ./
RUN yarn

# Bundle app source
COPY . .

ENV NODE_ENV=production PORT=3000 HOST=localhost JWT_SECRET=test_secret

EXPOSE 3000
CMD ["yarn", "start:prod"]
