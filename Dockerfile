FROM node:14.17.3-alpine

# Create src directory
WORKDIR /src

# Copy files to docker 
COPY . /src

# Install app dependencies
# hadolint ignore=DL3016,DL3059
RUN npm install
# hadolint ignore=DL3016,DL3059
RUN npm install pm2 -g

EXPOSE 80 3000
#hadolint ignore=DL3025
CMD pm2-runtime /src/bin/www