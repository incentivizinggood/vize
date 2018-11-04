#!/bin/bash

shopt -s globstar
git ls-tree --full-tree -r HEAD --name-only | egrep '\.(js|jsx)$' | xargs eslint -c .eslintrc.json
