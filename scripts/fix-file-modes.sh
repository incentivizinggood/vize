#!/bin/bash

# A grep pattern that matches only files which need to be executable.
EX_PAT='*.sh$'

# Set the modes of all non-executable files to 644
# 644 = Everone can read, but only the owner can write.
git ls-tree --full-tree -r HEAD --name-only | egrep -v $EX_PAT | xargs chmod 644
# Set the modes of all executable files to 755.
# 755 = Everone can read and execute, but only the owner can write.
git ls-tree --full-tree -r HEAD --name-only | egrep $EX_PAT | xargs chmod 755
