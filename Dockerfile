FROM node:18.13.0-alpine

# Create src directory
WORKDIR /src

# Copy files to docker 
COPY . /src

# Install app dependencies
RUN npm install
RUN npm install pm2 -g

EXPOSE 80

CMD ["exec pm2-runtime /src/bin/www"]