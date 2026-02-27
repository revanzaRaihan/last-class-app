# Last Class App 🎓

[![Tech Stack](https://img.shields.io/badge/Tech-React_%7C_Vite_%7C_Node.js-blue?style=for-the-badge)](#tech-stack)

**Last Class App** is a full-stack web application. The frontend is powered by React and Vite for blazing-fast performance and hot-module replacement, while the `backend` directory handles the API, data processing, and server-side logic.

## ✨ Features

* **Modern Frontend:** Built with React and bundled with Vite for a fast, optimized user experience.
* **Integrated Backend:** Contains a dedicated `/backend` directory to serve API requests and manage application logic.
* **Component-Driven UI:** Clean, modular, and maintainable React architecture.
* **Continuous Integration:** Pre-configured with GitHub Actions (in `.github/workflows`) for automated workflows.

## 🛠 Tech Stack

* **Frontend:** [React](https://react.dev/), [Vite](https://vitejs.dev/)
* **Backend:** JavaScript / Node.js (inside `/backend`)
* **Linting/Formatting:** ESLint

## 🚀 Getting Started

To run this project locally, you will need [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the repository
```bash
git clone [https://github.com/revanzaRaihan/last-class-app.git](https://github.com/revanzaRaihan/last-class-app.git)
cd last-class-app

2. Setup the Frontend
The root of the repository contains the React + Vite application.

# Install frontend dependencies
npm install

# Start the Vite development server
npm run dev

📂 Project Structure
last-class-app/
├── .github/workflows/   # CI/CD and automation pipelines
├── backend/             # Server-side code, APIs, and database logic
├── public/              # Static assets (favicon, etc.)
├── src/                 # React frontend source code (components, pages, assets)
├── eslint.config.js     # ESLint configuration
├── index.html           # Main HTML entry point for Vite
├── package.json         # Frontend dependencies and scripts
└── vite.config.js       # Vite configuration

📝 Available Scripts (Frontend)
In the root directory, you can run:

- npm run dev - Starts the development server.
- npm run build - Builds the app for production to the dist folder.
- npm run lint - Runs ESLint to catch code issues.
- npm run preview - Locally previews the production build.

📄 License
This project is open-source and available under the MIT License.
