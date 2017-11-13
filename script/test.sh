#!/bin/bash

git tag
read -p "Enter version: " VERSION
read -p "Enter commit msg: " COMMIT
gulp ngalog -v "$VERSION" -m "$COMMIT"