FROM node:11

RUN mkdir /app
ADD config /app/config
ADD src /app/src
ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json

RUN cd app && npm i --verbose && npm run build

EXPOSE 1234

WORKDIR /app
CMD ["npm","start"]
