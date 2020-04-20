#!/usr/bin/env bash

# start browserSync as a server. 
# serve from "site" folder and watch this folder and "css" sub-folder
# assume browser sync is installed locally using:
#	npm install browser-sync --save-dev 

# browser-sync start --server "site" --files "site, site/css/*.css, site/js/*.js"
./node_modules/.bin/browser-sync start --server "site" --files "site, site/css/*.css, site/js/*.js"
#./node_modules/.bin/browser-sync start --server "site" --files "site"

# with local sympolic link to make the path simpler
#./browser-sync start --server "./site" --files "./site, ./site/css/*.css"
