FROM node:17-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci && npm run prisma:generate

COPY . .

EXPOSE 2024

CMD ["sh", "-c", "npm run build && npm run start"]
