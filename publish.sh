#!/bin/bash
yarn build
git add -A
git tag
read -p "Enter version: " VERSION
read -p "Enter commit msg: " COMMIT
git commit -m '$VERSION $COMMIT'
yarn version --new-version $VERSION
git push
git push --tag