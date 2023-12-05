# Delivery Tracker

Delivery Tracker is an innovative delivery tracking platform, designed to provide a seamless and efficient user experience. This system allows users to track their deliveries, offering transparency and reliability in the delivery process.

## Getting Started

These instructions will help you set up and run Delivery Tracker locally on your system. Ensure you follow the steps correctly.

### Prerequisites

Before you begin, make sure you have the following prerequisites installed on your system:

- Node.js and npm
- Docker and Docker Compose

### Cloning the Repository

If you haven't already, clone the GitHub repository to your local machine:

```bash
git clone https://github.com/fedect1/Delivery-Tracker

### Backend Configuration

1. Navigate to the backend directory:

```bash
  cd Delivery-Tracker/backend
```

2. Create an .env file in the backend directory and configure the MongoDB connection string:

```bash
  MONGODB_URI_DEV=<Your MongoDB Connection String>
  MONGODB_URI_TEST=<Your MongoDB Connection String>
  MONGODB_URI_PROD=<Your MongoDB Connection String>
  SECRET_KEY=<Your KEY Secret>
```

Replace `<Your MongoDB Connection String>` with your MongoDB connection details and `<Your Key Secret>` with a secret key for session management.

3. Install backend dependencies:

```bash
  npm install
```

### Frontend Configuration

1. Navigate to the frontend directory:

```bash
  cd Delivery-Tracker/frontend
```

2. Create an .env file in the frontend directory and configure the API base URL:

```bash
  VITE_API_URL=<Your Backend API URL>
```

Replace `<Your Backend API URL>` with the URL of your backend server.

3. Install frontend dependencies:

```bash
  npm install
```

### Running the Application

Before running the application, note that the backend server is configured to run on port 4000 by default, as specified in the `package.json` under the `scripts` section:

```json
"scripts": {
  "dev": "cross-env NODE_ENV=development PORT=4000 nodemon app.js",
  ...
}
```

Return to the root directory of your project and use Docker Compose to build and run the containers:

```bash
  docker-compose up --build
```

Once the containers are up and running, you can access the frontend of Delivery-tracker at `http://localhost:5173` in your web browser.

### Stopping the Application

To stop the containers and clean up the resources, run the following command in the root directory of your project:

```bash
  docker-compose down
```

These updated instructions ensure that users install the necessary dependencies for both the backend and frontend before running the application.

---