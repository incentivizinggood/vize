# [Vize](https://www.vize.mx/) - Incentivizing Good

## Getting Started

### Set Up Development Environment

#### Don't use Windows

You will need to be running Linux, macOS, or a Linux VM. Do not use Windows.
Windows requires paying extra for their Pro or Enterprise editions to be able to
run Docker. Windows also has poor compatibility with many development tools.

#### The tools you need

-   Node Version Manager
-   Yarn
-   Docker (Community Edition)
-   Docker Compose
-   Heroku CLI

#### How to install the tools

##### Node Version Manager and Yarn

Install Node Version Manager and Yarn by following the instructions on their
websites:

-   https://github.com/nvm-sh/nvm#installing-and-updating
-   https://yarnpkg.com/en/docs/install

##### Docker and Docker Compose

Docker's web site is so full of marketing junk that it is hard to find anything
useful there. Plus they do stupid things like
[this](https://github.com/docker/docker.github.io/issues/6910). Don't even
bother trying to install it from their website.

Docker and Docker Compose for Ubuntu can be installed with the commands:

```bash
sudo apt update
sudo apt install docker-ce docker-compose
```

Docker Desktop for macOS can be downloaded
[here](https://download.docker.com/mac/stable/Docker.dmg). This should include
both Docker and Docker Compose.

##### Heroku CLI

You do not need the Heroku CLI unless you are deploying the app.

First, install the Heroku CLI and login by following the instructions here:
https://devcenter.heroku.com/articles/heroku-cli. Just install the Heroku CLI
and login. Don't create an app or anything else.

To connect your computer to the Heroku apps, run:

```bash
heroku git:remote --app vize-testing --remote heroku-staging
heroku git:remote --app vize-production --remote heroku-production
```

### Run the App in Development Mode

1. `cd` into the project's root directory (The same directory as this readme
   file).
2. Run the command `č./scripts/run-databases.sh` to start the databases.
    - You will need to enter your password because the Docker commands require
      super user access.
    - This command should not exit. It should keep running until you type
      `Ctrl`+`c` in the terminal.
    - You should see a line that says something like
      `vizemeteorapp_flyway_1 exited with code 0` if it works properly. If you
      ever see a line that says something exited with a code that is not zero
      then you have an error.
3. In a new terminal, run the command `nvm use` to make sure you are using the
   correct version of node.
4. Run the command `yarn install` to install the projects dependencies.
5. Run the command `./scripts/run-dev-mode.sh` to start the app.
    - You must have `./scripts/run-databases.sh` running for
      `./scripts/run-dev-mode.sh` to work properly.
6. Go to `http://localhost:3000/` to test the app.
    - This may take a while to work if you just started the app.
    - If you get a blank page or if something seems off, use your browsers dev
      tools. There are many errors that only show up in the browser.

## Deploying

This app is currently hosted on Heroku. While Heroku provides several services
for continuous deployment (deploying from GitHub directly to Heroku without
using tools on your computer) we are not using them. Flyway, our tool for
database migrations, does not "just work" in Heroku so instead we deploy from a
computer with the development environment installed on it so that we can run
Flyway using Docker.

For Meteor we were using `settings.json` files to set the environment variables
for the app. These are no longer needed. Environment variables are now set and
stored on Heroku.

### Pre-deploy checklist

Before deploying the app, make sure that:

-   You have set up the development environment.
-   You have set up the Heroku CLI and are logged in.
-   You have committed all changes. `git status` should say that there is
    nothing to commit.
-   You have tested the app locally.
-   You have let the team know that you are going to deploy.
-   If deploying to production,
    -   You are at the exact same commit as is currently running on staging.
    -   You and the team have thoroughly tested the app on staging.
    -   The team has okay with you deploying this version.

### The Deployment Process

The deployment process is automated. To deploy the app to run
`./scripts/deploy.sh` and give it the name of the remote for the Heroku app that
you wish to deploy to. I.e. to deploy to staging run
`./scripts/deploy.sh heroku-staging`. To deploy to production run
`./scripts/deploy.sh heroku-production`.

This script will:

1. Download the database connection info from Heroku.
2. Run Flyway to migrate the database.
3. Push the current commit to Heroku.

Heroku will then build the app and stream the build logs back to your terminal.
You may `Ctrl`+`c` to exit at this point. Heroku will not stop building.
