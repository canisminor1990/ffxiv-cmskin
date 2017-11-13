#!/bin/bash

# Build
read -p "Nead Build y/n: " BUILD
if [ "BUILD" = "y" ]
then
	yarn build
fi

git add -A
git tag

# Commit && Tag
read -p "Enter version: " VERSION
read -p "Enter commit msg: " COMMIT

if [ "$VERSION" ]
then
 git commit -m "$VERSION: $COMMIT"
 yarn version --new-version $VERSION
 git push
 git push --tag
else
 git commit -m "$COMMIT"
 git push
fi
