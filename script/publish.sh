#!/bin/bash

echo '[Eslint] Start'
yarn lint:es
echo '[Eslint] Done'

# Build
read -p "Nead Build y/n: " BUILD
if [ "$BUILD" = "y" ]
then
  echo '[Roadhog] Build'
	yarn build
	echo '[Roadhog] Done'
fi

# Tag list
git tag

# Commit && Tag
read -p "Enter version: " VERSION
read -p "Enter commit msg: " COMMIT

if [ "$VERSION" ]
then
 gulp changelog -v "$VERSION" -m "$COMMIT"
 git add -A
 git commit -m "$VERSION: $COMMIT"
 yarn version --new-version $VERSION
 git push
 git push --tag
else
 git add -A
 git commit -m "$COMMIT"
 git push
fi
