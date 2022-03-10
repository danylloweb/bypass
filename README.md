# Adonis API application Gateway ByPass

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```
npm i -g @adonisjs/cli
```

```
npm install
```

```
nano .env
HOST=0.0.0.0
PORT=3000
NODE_ENV=production
APP_NAME=gateway
APP_URL=http://${HOST}:${PORT}
CACHE_VIEWS=false
APP_KEY=oShj1Fexc832t0fPrRDvlhzU9FeBzzwp
DB_CONNECTION=mongodb
DB_DATABASE=gateway
HASH_DRIVER=bcrypt
```

```
adonis serve --dev
```

