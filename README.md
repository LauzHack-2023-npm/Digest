# Digest
<<<<<<< HEAD

> Digest: Where Ideas Speak to You.
=======
https://youtu.be/rAXkra7h3kw
# awesome-react-flask-Docker
Hackathon template with a React frontend and Flask backend. Docker containers for easy deployment.
>>>>>>> 1c303293843fe6d37a8216e3a6f5f7666d39e04b

## What is does

Digest crafts personalized podcasts from arXiv and beyond, delivering curated insights to your ears.

## Demo

# Running

## In Development

You need `Node.js` (to use `npm`) and `Python` with the required dependencies. On MacOS:
```bash
# For the React package manager
brew install node
# Python dependencies
conda create -n backend Python=3.9
conda activate backend
conda install --file backend-react-client/requirements.txt
```

Install [Docker](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository) and [docker-compose](https://docs.docker.com/compose/install/linux/#install-using-the-repository).

Running the app:

```bash
# Run the backend before the frontend.
cd backend-flask-server
flask run

cd ../frontend-react-client
npm run start
# or
# DANGEROUSLY_DISABLE_HOST_CHECK=true npm run start
# See this issue: https://stackoverflow.com/questions/70374005/invalid-options-object-dev-server-has-been-initialized-using-an-options-object
```

> The backend listens to port `4000` (because MacOS hijacks the default). If you want to change this, you need to modify the following files:
>- `backend-flask-server/.flaskenv`
>- `Dockerfile.backend`
>- `frontend-react-client/deployment/nginx.default.conf`
>- `frontend-react-client/package.json`
> 
> The frontend listens to default port `3000`.

## Deployment

Using a Gunicorn server for the Python project, and nginx as a reverse proxy in front of it. All commands are run from the root directory.

### Building the Docker images together with docker-compose

```bash
docker compose up
```

or `docker-compose up` on older versions. Use `docker compose up -d --no-deps --build` to rebuild.
