Browser sync installed locally via npm:
    npm install browser-sync --save-dev

If you want to use the browser-sync module from a local install you will have to prepend the full path to the browser-sync binary from within your .bin directory since all locally installed modules are placed within your current working directory node_modules directory. i.e. Node modules go in ./node_modules, executables go in ./node_modules/.bin/. So in order to run the browser-sync binary from a local install do the following:

./node_modules/.bin/browser-sync  --version



## Install nvm using a Node version manager (nvm)  (Recommended)
- Run this in bash
`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash`
- You then may need to close down a restart terminal (to get .profile and/or .bashrc to run)
- Verify nvm is working
`command -v nvm`  No response or an error response means install isn't right -- check path?
## Use nvm to install NodeJs
- You may want to uninstall via apt
`sudo apt-get remove nodejs`
- Install NodeJs using nvm
`nvm install node` **Note: Normally don't use sudo.**


# Install nodejs and nvm via a NodeSource Installer
## Ubuntu / Mint
`curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -`
`sudo apt-get install -y nodejs`

## Debian, as root:wq

`curl -sL https://deb.nodesource.com/setup_13.x | bash -`
`apt-get install -y nodejs`

# Resolving EACCES permissions errors when installing packages globally
If you see an EACCES error when you try to install a package globally, you can either:

Reinstall npm with a node version manager (recommended),
or
Manually change npm’s default directory
Reinstall npm with a node version manager§
This is the best way to avoid permissions issues. To reinstall npm with a node version manager, follow the steps in “Downloading and installing Node.js and npm”. You do not need to remove your current version of npm or Node.js before installing a node version manager.

Manually change npm’s default directory§
Note: This section does not apply to Microsoft Windows.
To minimize the chance of permissions errors, you can configure npm to use a different directory. In this example, you will create and use hidden directory in your home directory.

Back up your computer.
On the command line, in your home directory, create a directory for global installations:
 mkdir ~/.npm-global
Configure npm to use the new directory path:
 npm config set prefix '~/.npm-global'
In your preferred text editor, open or create a ~/.profile file and add this line:
 export PATH=~/.npm-global/bin:$PATH
On the command line, update your system variables:
 source ~/.profile
To test your new configuration, install a package globally without using sudo:
 npm install -g jshint
Instead of steps 2-4, you can use the corresponding ENV variable (e.g. if you don’t want to modify ~/.profile):

    NPM_CONFIG_PREFIX=~/.npm-global
npx: an alternative to running global commands 

If you are using npm version 5.2 or greater, you may want to consider npx as an alternative way to run global commands, especially if you only need a command occasionally. For more information, see this article about npx."
