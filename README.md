# Eressea Solutions React Vite Boilerplate

Estamos utilizando Vite + React para este proyecto. El proyecto tiene Bootstrap 5.3.2 instalado.

## Instalar
Para instalar los paquetes debemos correr:
```bash
npm install
```
## Configuración de ENV
Debemos crear archivo de variables de entorno `.env` en la raíz del proyecto.

```bash
VITE_APP_DOMAIN=XXXXXXXXXXXXXX
```

## Correr
```bash
npm run dev
```

## Compilar
Los builds se compilan en la carpeta `dist`.
```bash
npm run build
```

## Archivos
```text
src/
├── App.jsx
├── main.jsx
├── assets/
│   └── scss/
│       ├── stylesheet.scss
│       └── styles/
│           ├── style.scss
│           ├── typography.scss
│           └── variables.scss
├── components/
│   └── NavBar/
│       ├── NavBar.jsx
│       └── NavBarOptions.jsx
├── config/
│   └── site.config.js
├── components/
│   └── NavBar/
│       ├── NavBar.jsx
│       └── NavBarOptions.jsx
├── pages/
│   ├── Admin/
│   │   └── LoginPage
│   │       └── LoginPage.jsx
│   ├── HomePage/
│   │   └── HomePage.jsx
│   └── ReduxExamplesPage/
│       └── ReduxExamplesPage.jsx
├── redux/
└── services/
