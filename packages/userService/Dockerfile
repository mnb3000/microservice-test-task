FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install modules
COPY package*.json ./
RUN yarn

# Bundle app source
COPY . .

ENV NODE_ENV=production PORT=3000 HOST=localhost JWT_SECRET=test_secret TYPEORM_SYNCHRONIZE=true TYPEORM_LOGGING=true TYPEORM_ENTITIES=src/entities/*.ts

EXPOSE 3000
CMD ["yarn", "start:prod"]
