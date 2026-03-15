# PlaceMark v1.0

PlaceMark is a small full-stack web app built by Andre Pangoni as part of the Higher Diploma in Computer Science (2025).
It is a server-rendered Node.js/Hapi application where users can register, log in, and manage their favorite pubs in Dublin.

## Key features

- Dashboard: lists pubs and supports category filtering.
  - Add / Edit / Delete pubs: users can create and manage their own pub entries.
  - Categories: daytime, nighttime, live music, and DJ flags.
  - Pub image upload: users can upload optional pub images via Cloudinary.
- User accounts: signup, login, logout, and session-based authentication.
- Admin settings page:
  - View all users
  - Toggle admin role
  - Delete users
  - Simple analytics: total users and pubs per user
- API support:
  - JWT-based API routes
  - Swagger docs via Hapi Swagger
- Data storage:
  - MongoDB (default)
  - Firebase Firestore (optional provider)

## Why this project

This project is a fun and practical way to manage and explore favorite pub locations.
It focuses on clean user flows, simple admin controls, and core full-stack concepts including auth, validation, persistence, and image hosting.

## Deployment

You can deploy the project on Render.
For production, configure environment variables in Render instead of relying on a local `.env` file.

## Contributing / contact

For more information or support with the project, contact the developer here:

https://github.com/andreeeeh/place-mark

## How Users Can Get Started with the Project

You can fork and clone the repository from the link above.

### Environment / Secrets

Create a `.env` file in the project root using `.env_example` as an example.

Notes:

- Keep `.env` out of source control.
- Do not commit private keys or secrets.

### Run locally

1. Install dependencies

```bash
npm install
```

2. Start the app

```bash
npm run start
```

For development with auto-reload:

```bash
npm run dev
```

3. Open the app in your browser (default):

http://localhost:3000

### Run tests

```bash
npm run test
```

Extra test commands:

```bash
npm run testmodels
npm run testapi
```

## References

- Node.js (ES modules): https://nodejs.org/
- Hapi: https://hapi.dev/
- Handlebars: https://handlebarsjs.com/
- Joi: https://joi.dev/
- Mongoose: https://mongoosejs.com/
- Firebase Firestore: https://firebase.google.com/docs/firestore
- Cloudinary: https://cloudinary.com/documentation
- Axios: https://axios-http.com/docs/intro
- Mocha: https://mochajs.org/
- Chai: https://www.chaijs.com/
- Dotenv: https://www.dotenv.org/
