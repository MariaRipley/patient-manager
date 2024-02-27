# Task Manager

This is a task management project developed with React.js on the frontend, using Vite as the build tool and Tailwind CSS for styling. On the backend, it utilizes Node.js with Express, and MongoDB as the database.

## Installation

To run this project on your local machine, follow these steps:

1. Clone this repository:

git clone https://github.com/MariaRipley/patient-manager.git

2. In the project folder, install frontend and backend dependencies:

   - On the root folder: npm install
   - cd client
     npm install

## Database Setup

Before starting the backend server, ensure you have MongoDB installed on your system. Then, start the MongoDB server from the console:

mongod.exe --version
mongod

Then, open another console window and execute the following command to start the MongoDB shell:

mongosh

## Backend Configuration

The backend server is configured in the `app.js` file located in the `src` folder. It includes middleware for logging, parsing JSON data, parsing cookies, and handling CORS. Routes for authentication and tasks are defined and mounted under the `/api` endpoint.

## Frontend Configuration

The frontend is built using React.js and the main component is defined in the `App.jsx` file located in the `client/src` folder. It sets up routing using `react-router-dom` and provides authentication and task context using `AuthProvider` and `TaskProvider`. Protected routes are implemented using `ProtectedRoute` component.

## Execution

To start the backend server, run the following command from the root folder:

npm run dev

To start the frontend server, run the following command from the `client` folder:

cd client
npm run dev

## Usage

Once the servers are up and running, you can access the application from your browser at `http://localhost:5173`. Make sure to be registered and logged in to access functionalities like creating, editing, and deleting tasks.

## Technologies Used

- React.js
- Vite
- Tailwind CSS
- Node.js
- Express
- MongoDB

## Contributions

Contributions are welcome. If you wish to contribute to this project, please create a Pull Request and ensure to follow the contribution guidelines.

## License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).
