FROM node:18

WORKDIR /app

COPY package*.json ./

RUN app-get update && app-get install -y ffmpeg

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm", "start", "serve"]