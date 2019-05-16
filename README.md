# The Vize Web App

Semaphore CI
[![Semaphore Build Status](https://semaphoreci.com/api/v1/vize/vize-meteor-app/branches/master/badge.svg)](https://semaphoreci.com/vize/vize-meteor-app)

---

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

---

## Getting Started

### Set Up Development Environment

You will need to be running Linux, macOS, or a Linux VM. Do not use Windows.
Windows requires paying extra for their Pro or Enterprise editions to be able to
run Docker. Windows also has poor compatibility with many development tools.

-   Yarn
-   Meteor
-   Docker (Community Edition)
-   Docker Compose

Install Yarn and Meteor by following the instructions on their websites.

-   https://yarnpkg.com/en/docs/install
-   https://www.meteor.com/install

Docker's web site is so full of marketing BS that it is hard to find anything
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
1. Run the command `./run.sh i` to install the projects dependencies and other
   setup tasks.
1. Run the command `./run.sh db` to start the database(s). This command should
   not exit.
1. In a new terminal, run the command `./run.sh` to start the app. Note: You
   must have `./run.sh db` running for `./run.sh` to work properly.
