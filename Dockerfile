FROM node:20

WORKDIR /usr/src/app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# If you have a build step, run it here
# RUN npm run build

# Copy the rest of your app's source code
COPY . .

# Rebuild better-sqlite3 只有在Docker沒有構建好的映像 才會呼叫
# 運行 docker-compose up --build 來構建映像
RUN npm rebuild better-sqlite3 --build-from-source

EXPOSE 3000 5173

CMD ["npm", "run", "start"]