# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

```
src/
├── components/          # All reusable UI components
│   ├── Header/
│   │   ├── Header.tsx
│   │   ├── Header.module.css
│   │   └── Header.test.tsx
│   ├── Footer/
│   └── ...
│
├── pages/               # Page-level components
│   ├── Home/
│   │   ├── Home.tsx
│   │   ├── Home.module.css
│   │   └── Home.test.tsx
│   ├── About/
│   └── ...
│
├── hooks/               # Custom React hooks
│   ├── useFetchData.ts
│   ├── useAuth.ts
│   └── ...
│
├── services/            # API services or business logic
│   ├── apiService.ts
│   └── authService.ts
│
├── context/             # React Context files
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   └── ...
│
├── utils/               # Utility functions
│   ├── formatDate.ts
│   ├── constants.ts
│   └── ...
│
├── types/               # TypeScript types and interfaces
│   ├── User.ts
│   ├── ApiResponse.ts
│   └── ...
│
├── App.tsx              # Main app entry point
├── index.tsx            # ReactDOM render
└── styles/              # Global styles
    ├── index.css
    └── variables.css

```


## User Require ment
1. server dashboard
   1. nice to have
2. user dashboard