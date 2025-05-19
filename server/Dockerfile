FROM us-east1-docker.pkg.dev/resumebuilder-460301/resumebuilder/texlive-full-image

WORKDIR /app

COPY package*.json ./
RUN npm install

# Only copy server directory contents (not client)
COPY . .

EXPOSE 8080

CMD ["node", "server.js"]