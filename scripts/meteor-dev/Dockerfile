FROM ubuntu:18.04

# Install system dependencies.
RUN apt-get update
RUN apt-get install -y curl git

# Create a mirror of the user on the host system so
# that this container can write to user owned volumes
# without causing permission and ownership conflicts.
ARG APP_USER_ID
ARG APP_USER=app-user
RUN useradd -mU -u $APP_USER_ID $APP_USER
# Switch to the new user.
USER $APP_USER
ENV HOME=/home/$APP_USER

# Don't install meteor here. This container will just share
# the host's installation via a volume.
ENV PATH="$HOME/.meteor:$PATH"

WORKDIR $HOME/meteor-app
CMD ["/bin/bash"]
