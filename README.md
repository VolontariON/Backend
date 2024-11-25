# Volontarion-Ingegneria-del-software

### Installation

```
git clone git@github.com:MarcoMattiuz/Volontarion-Ingegneria-del-software.git
```

```
npm install
```

### SET .env file

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
