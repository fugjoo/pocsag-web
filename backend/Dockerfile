FROM oraclelinux:8

WORKDIR /app

COPY package.json tsconfig.json ./
COPY prisma ./prisma
RUN microdnf install -y nodejs npm && \
    npm install && \
    npm install -g prisma && \
    npx prisma generate

COPY src ./src
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/index.js"]
