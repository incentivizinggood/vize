#!/bin/bash

TO_DELETE=(
    node_modules
    {api-server,web-app}/{node_modules,generated,dist}
)

if [[ "$0" != './scripts/clean.sh' ]]; then
    echo "This script must be run from the project's root."
    exit 1
fi

echo 'Warning! This script will permenently delete these files and directories.'
for i in ${TO_DELETE[*]}; do
    echo $i
done
read -p "Are you sure? This cannot be undone. [y/n]: " -r
if [[ $REPLY =~ ^[Yy]$ ]]
then
    rm -rf ${TO_DELETE[*]}
    echo "Done deleting." 
    echo "To regenerate these files run ./run.sh i."
else
    echo "Cancelled. No files deleted."
fi
