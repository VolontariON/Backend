# Volontarion-Ingegneria-del-software

### Installation

```
git clone git@github.com:MarcoMattiuz/Volontarion-Ingegneria-del-software.git
```

```
npm install
```

### run

```
npm start
```

### Project structure

```
project-root/
├── src/
│ ├── controllers/
│ │ ├── ...
│ ├── models/
│ │ ├── ...
│ ├── routes/
│ │ ├── ...
│ ├── middlewares/
│ │ └── ...
│ ├── config/
│ │ └── ...
│ ├── utils/
│ │ └── ...
│ ├── app.js
│ └── index.js
├── ...
├── .env
├── package.json
└── README.md
```

### status codes:

#### responses

- **201**: ✅ OK | (se è una GET ritorna il contenuto richiesto)

#### account related:

- **604**: ⚠️ email already registered
- **605**: ⚠️ email not found
- **606**: ⚠️ wrong password

#### Server related:

- **500**: ❌ server error
