# Set up necessary programs
1. Node needed.  Check version. Install if needed.
	node -v

1. See if npm is installed. Install it if needed (www.npmjs.com)
	npm -v

1. Yarn is optional, but npm now has a package manager. 
The rest of this assumes npm usage, and not yarn.

# Set up Webpack
1. Make a package.json file
	Go to target site folder
	npm init
	fill in the prompts

1. Install webpack
(locally)
npm install --save-dev webpack
npm install --save-dev webpack-cli

(globally) use -g instead of --save-dev

1. Create webpack.config.js file in site root
	module.exports = {
		mode: 'development',
		entry: './src/app.js',
		output: {
			filename: 'app.bundle.js'
		}
	}

1. Create index.html for example that runs 'app.bundle.js' (the webpack output file)

1. Run webpack. This will create ./dist/app.bundle.js

1. The scripts in package.json can be run with npm using
	npm run <script name>
	for example, if package.json contains
	  "scripts": {
		"dev": "webpack -d",
		"test": "echo \"Error: no test specified\" && exit 1"
	  },
	
	the npm run dev will execute webpack -d


# Set up Babel

1. Install babel with npm
	npm install --save-dev @babel/core @babel/preset-env @babel/preset-react
	npm install --save-dev babel-loader

1. Create .babelrc
	{
		"presets": ["@babel/preset-env", "@babel/preset-react"]
	}

# Set up React

npm install -g react
npm install -g react-dom
npm install -g react-router-dom
npm install -g bundle-loader
npm install -g prop-types

Then in js files app.js for example
import React from 'react'
import {render} from 'react-dom'


# Webpack Rules (Loaders)
	npm install --save-dev css-loader
	npm install --save-dev style-loader
	npm install --save-dev file-loader
	npm install --save-dev image-webpack-loader
	npm install --save-dev sass-loader
	npm install --save-dev node-sass

# Webpack Plugins
	// Makes output index.html from a template in project source, 
	// automatically inserting generated js scripts (e.g. bundle.js)
	npm install --save-dev html-webpack-plugin 
	// Creates a manifest file which maps source files with resulting 
	// output files which may contain a hash in the name for example.
	npm install --save-dev webpack-manifest-plugin
	// output file cleanup
	npm install rimraf -- not sure if this should be --save-dev or -g


# Notes
If you copy a package.json file with dependencies and dev dependencies, you 
can run npm install, and the dependencies will be installed. Note, however, that
this will use the versions specified in the package.json file, which may be old.

# React Router Lazy Loading
npm install --save-dev babel-plugin-syntax-dynamic-import
npm install react-loadable  (not a dev dependency)

