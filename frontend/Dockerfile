FROM oraclelinux:8

WORKDIR /app

COPY package.json vite.config.ts tsconfig.json ./
COPY tailwind.config.js postcss.config.js ./
RUN microdnf install -y nodejs npm && npm install && npm install -g vite

COPY index.html ./
COPY src ./src
RUN npm run build

EXPOSE 80
CMD ["npx", "vite", "preview", "--port", "80"]
