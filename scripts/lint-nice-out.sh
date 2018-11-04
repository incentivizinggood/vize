#!/bin/bash

shopt -s globstar
git ls-tree --full-tree -r HEAD --name-only | egrep '\.(js|jsx)$' | xargs eslint -c .eslintrc.json -f html -o ./eslint-out.html
