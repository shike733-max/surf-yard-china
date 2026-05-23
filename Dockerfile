FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY server.mjs ./
COPY index.html ./
COPY mobile-preview.html ./
COPY admin.html ./
COPY script.js ./
COPY styles.css ./
COPY README.md ./
COPY data ./data
COPY generated ./generated

ENV NODE_ENV=production
ENV PORT=4173

EXPOSE 4173

CMD ["npm", "start"]

