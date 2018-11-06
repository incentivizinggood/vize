#!/bin/bash

git ls-tree --full-tree -r HEAD --name-only | grep -v '.sh$' | xargs chmod 644
git ls-tree --full-tree -r HEAD --name-only | grep '.sh$' | xargs chmod 755
