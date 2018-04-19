
FROM node:9
MAINTAINER Daniel Biales <daniel.biales@libertymutual.com>

# install deps
ADD package.json /tmp/package.json
RUN npm config set registry https://repo.forge.lmig.com/api/npm/npm/
RUN cd /tmp && npm install

# Copy deps
RUN mkdir -p /opt/microservices/hello-node && cp -a /tmp/node_modules /opt/microservices/hello-node

# Setup workdir
WORKDIR /opt/microservices/hello-node
COPY . /opt/microservices/hello-node

# run
EXPOSE 9080
CMD ["npm", "start"]
