# [Vize](https://www.vize.mx/) - Incentivizing Good

Vize is a platform for accountability and a catalyst for progress.

Workers are able to share reviews of their working conditions with other
workers. This gives workers the information they need to avoid factories with
terrible working conditions. Factories with poor reputations will have trouble
getting workers, and thus are unable to fulfill orders, do business, and make
profits. This creates a direct and strong incentive for factories to improve
conditions.

Feedback coming directly from the workforce helps everyone, including the
factories. Factory managers are given access premium quality information that
would normally require expensive surveying and be abridged by fear. Bad
factories get better and good factories get awesome. By working together and
having an honest discussion everyone wins.

## Getting Started

### Set Up Development Environment

##### Don't use Windows

You will need to be running Linux, macOS, or a Linux VM. Do not use Windows.
Windows requires paying extra for their Pro or Enterprise editions to be able to
run Docker. Windows also has poor compatibility with many development tools.

##### The tools you need

-   Yarn
-   Meteor
-   Docker (Community Edition)
-   Docker Compose

##### How to install the tools

Install Yarn and Meteor by following the instructions on their websites.

-   https://yarnpkg.com/en/docs/install
-   https://www.meteor.com/install

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

### Run the App in Development Mode

1. `cd` into the project's root directory (The same directory as this readme
   file).
1. Run the command `./run.sh i` to install the projects dependencies and to
   preform other setup tasks.
1. Run the command `./run.sh db` to start the databases.
    - You will need to enter your password because the Docker commands require
      super user access.
    - This command should not exit. It should keep running until you type
      `ctrl+c` in the terminal.
    - You should see a line that says something like
      `vizemeteorapp_flyway_1 exited with code 0` if it works properly. If you
      ever see a line that says something exited with a code that is not zero
      then you have an error.
1. In a new terminal, run the command `./run.sh` to start the app.
    - You must have `./run.sh db` running for `./run.sh` to work properly.
    - Ignore the message about installing `pg-native`; We should not install
      this package.
    - The typescript build process prints out a lot of errors. Ignore them for
      now. Most of these errors are due to a problem with the Meteor-TypeScript
      integration. Install a TypeScript plugin in your editor to see the real
      errors.
1. Go to `http://localhost:3000/` to test the app.
    - This may take a while to work if you just started the app.
    - If you get a blank page or if something seems off, use your browsers dev
      tools. There are many errors that only show up in the browser.
