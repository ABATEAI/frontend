# ABATE AI frontend

This is the [Next.js](https://nextjs.org/)-based frontend bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
for abateai.com

## Quick start

### Prerequisites for Development

- [GitHub Account](https://github.com/)
- [Docker Hub Account](https://hub.docker.com/)
- [Docker Engine](https://docs.docker.com/get-docker/) and
  [Docker Compose](https://docs.docker.com/compose/install/) as standalone
  binaries OR [Docker Desktop](https://docs.docker.com/desktop/), which is
  simpler and includes Docker Engine and Docker Compose

### Installation

First, clone the repo and change directory into it with

```bash
$ git clone --recurse-submodules https://github.com/ABATEAI/frontend.git
$ cd frontend

# OR

$ git clone https://github.com/ABATEAI/frontend.git
$ cd frontend
$ git submodule update --init
```

Copy [config.toml.example](config.toml.example) and rename the copy to
`config.toml`. Populate the configuration fields with development values.
Please reach out to [@jeffrylew](https://github.com/jeffrylew) for the specific
values. Make sure `config.toml` does not get version controlled or added to
GitHub! It has been added to [.gitignore](.gitignore),
[.dockerignore](.dockerignore), and [.gcloudignore](.gcloudignore) to avoid
leaking credentials.

Assuming you have installed Docker Desktop, open the application and sign in.
Then build the Docker images for the ABATE AI frontend and backend services via
`docker-compose`

```bash
$ docker-compose build
```

Verify the images were created by running the following in a terminal

```bash
$ docker image ls
REPOSITORY                      TAG         IMAGE ID       CREATED        SIZE
frontend-frontend               latest      some_hash_01   1 minute ago   606MB
frontend-backend                latest      some_hash_02   1 minute ago   1.16GB
```

### Development

ABATE AI's frontend is based on Next.js and the following links can be
referenced during development.

- Next.js + FastAPI Starter:
  https://vercel.com/templates/next.js/nextjs-fastapi-starter
- Next.js + FastAPI Example: https://github.com/digitros/nextjs-fastapi
- Next.js + Flask Example:
  https://github.com/vercel/examples/tree/main/python/nextjs-flask
- https://vercel.com/guides/how-to-use-python-and-javascript-in-the-same-application

The services are started with

```bash
$ docker-compose up -d
```

You can also build and start the services with the combined command

```bash
$ docker-compose up -d --build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`.
The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization)
to automatically optimize and load Inter, a custom Google Font.

Once you are done with development, shut down the services with

```bash
$ docker-compose down
```

and quit Docker Desktop (don't just exit, ensure you power down the engine).

### Suggestions

Frontend development suggestions can be requested by opening a new ticket at
https://github.com/ABATEAI/frontend/issues.
