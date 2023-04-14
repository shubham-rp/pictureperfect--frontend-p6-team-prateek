# Picture Perfect

### A platform which connects Photo Studios with potential customers.

The application is split into a frontend that will be hosted on Netlify and a backend that will be hosted on Render. (Backend repository is provided separately)

### Getting Started

To get started with this application, follow these steps:

1. Clone this repository to your local machine.
2. Install the dependencies by running npm install.
3. Create a .env.local file in the root of the project and fill in the required environment variables (see the "Environment Variables" section below).
4. Run the application using npm start.
5. The application should now be running at http://localhost:3000.

### Environment Variables

The following environment variables are used by this application:

`REACT_APP_API_URL`: The URL of the backend API. This should be set to the URL of your Render deployment.

To set these environment variables, create a file called .env.local in the root of the project and add the following lines:

REACT_APP_API_URL=<your Render API URL>

### Deploying to Netlify

To deploy the frontend of this application to Netlify, follow these steps:

1. Create a new site in Netlify.
2. Connect the site to your Git repository.
3. Set the following build settings:
   Build command: `CI= npm run build`
   Publish directory: build/
4. Set the following environment variables:
   REACT_APP_API_URL: The URL of the backend API. This should be set to the URL of your Render deployment.
5. Deploy the site.

### Deploying the backend to Render

To deploy the backend of this application to Render, follow these steps:

1. Create a new Node.js web service in Render.
2. Connect the service to your Git repository.
3. Set the following environment variables:
   `PORT`
   `DB_URL`
   `SECRET`
   `AWS_BUCKET_NAME`
   `AWS_BUCKET_REGION`
   `AWS_ACCESS_KEY`
   `AWS_SECRET_KEY`
   `RAZORPAY_KEY`
   `RAZORPAY_SECRET`

4. Deploy the service.

### Contributing

If you would like to contribute to this project, please follow these guidelines:

1. Fork this repository to your own GitHub account and clone it to your local machine.
2. Create a new branch for your changes using git checkout -b <branch-name>.
3. Make your changes and commit them with a descriptive message.
4. Push your changes to your fork using git push origin <branch-name>.
5. Submit a pull request to this repository.
