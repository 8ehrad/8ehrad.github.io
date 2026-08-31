# Behrad Zabihi — portfolio

Public SvelteKit portfolio deployed to GitHub Pages at [behradzabihi.app](https://behradzabihi.app).

This repository owns only browser-delivered code and public static assets. The digital-twin API and private personal tooling are deployed independently from private repositories and are consumed through versioned HTTP APIs. No backend source data, generated private documents, Terraform state, or service credentials belong in this repository.

## Local development

```bash
npm install
npm run check
npm run dev
```

Runtime endpoints are configured with public `VITE_*` build variables in `.github/workflows/deploy.yml`. Treat every value compiled into the frontend as public; authentication and authorization are enforced by the backend APIs.
