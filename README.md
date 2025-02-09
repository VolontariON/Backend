# .

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### SET .env file

```sh
npm run dev
```

JWT_SECRET = "your_jwt_secret"
MAILJET_API_KEY_PUBLIC = "your_mailjet_API_KEY"
MAILJET_SECRET_KEY = "your_mailjet_SECRET_KEY"

```

### run dev server

```

npm run start (runs with node)
npm run dev (runs with nodemon)

```

### API docs

- start the server
- go to **http//:url:port/api-docs**

### status codes:

#### responses

- **201**: ✅ OK | (se è una GET ritorna il contenuto richiesto)

#### account related:

- **604**: ⚠️ email already registered
- **605**: ⚠️ email not found
- **606**: ⚠️ wrong password

#### Server related:

- **401**: ❌ Authentication token is missing
- **500**: ❌ server error
- **501**: ❌ token expired

### Project structure

```

project-root/
├── src/
│ ├── controllers/
│ │ └── ...
│ ├── models/
│ │ └── ...
│ ├── routes/
│ │ └── ...
│ ├── middlewares/
│ │ └── ...
│ ├── utils/
│ │ └── ...
│ ├── app.js
│ └── index.js
├── ...
├── .env
├── config.json
├── .gitignore
├── package.json
└── README.md

```

```
