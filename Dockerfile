FROM node:6.11.0

LABEL maintainer Terry J. Owen <terry@iknowmac.com>

# Set environment variables
ENV DB_HOST=mongodb
ENV DB_PORT=27017
ENV DB_NAME=ramen

# Install nodemon globally
RUN npm install -g nodemon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source and install dependencies
COPY . /usr/src/app
RUN npm install

EXPOSE 8080

USER node

CMD [ "start:production" ]

ENTRYPOINT [ "npm", "run" ]

# run 'docker build -f Dockerfile -t ramen-api .' in app root
# run 'docker run --name=ramen-api -p 8080:8080 --link=mongodb:mongodb -d ramen-api'
