#!/usr/bin/env bash

# Set local browser server path
# set PATH so it includes the local browser-sync directory
# use the pathappend function if it exists as it will only
# append the path if it is not already in the path
# pathappend will prepend unless a second parameter of "after" is used
if [ -d "$HOME/swDev/javascript/working/node_modules/.bin" ] ; then
  # see if pathappend function exitst
  declare -F pathappend > /dev/null
  if [[ $? -eq 0 ]] ; then
    # pathappend exists, so use it
    pathappend "$HOME/swDev/javascript/node_modules/.bin"
  else
    # path append does not exits, so prepend manually
    PATH="$HOME/swDev/javascript/node_modules/.bin:$PATH"
  fi
fi

