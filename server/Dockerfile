FROM node:20-slim

# Install TeX Live only if not already installed, and set default paper size to letter
RUN if ! command -v pdflatex >/dev/null 2>&1; then \
      apt-get update && \
      apt-get install -y texlive-latex-base; \
    fi && \
    echo "letter" > /etc/papersize && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

# Only copy server directory contents (not client)
COPY . .

EXPOSE 3001

CMD ["node", "server.js"]