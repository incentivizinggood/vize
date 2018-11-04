#!/bin/bash

shopt -s globstar
git ls-tree --full-tree -r HEAD --name-only | egrep '\.(js|jsx|json|yaml|yml|css|scss|md)$' | xargs prettier --list-different
