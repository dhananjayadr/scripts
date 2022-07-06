#!/bin/bash

# Kannada Keyboard Nudi setup for Mac OS

url="http://www.kagapa.in/kannada/sites/default/files/downloads/Nudi_Mac_OS.zip"

printf "downloading keylayout and icon file...\n\n"
if curl --fail -s -X GET -o nudi.zip $url; then
    printf "Successfully donwloaded keylayout and icon file...\n\n"
else 
    printf "Unable to download keylayout and icon file, EXIT..."
    exit
fi

printf "creating nudi folder and unzipping files to it...\n\n"
if [ -d "nudi" ]; then rm -Rf "nudi" &> /dev/null; mkdir "nudi"; else mkdir "nudi"; fi
unzip nudi.zip -d nudi/ &> /dev/null && rm nudi.zip &> /dev/null

printf "moving files to the keyboard layout folder...\n\n"
mv nudi/Nudi* $HOME/Library/Keyboard\ Layouts/ &> /dev/null && rm -Rf nudi/ &> /dev/null

echo ""
echo ""
echo "*** Next steps to set keyboard preference. ***"
echo ""
echo '  *  Go to the Apple Main Menu'
echo '  *  Click on "System Preferences"'
echo '  *  Click on "Keyboard"'
echo '  *  Choose "Input Sources"'
echo '  *  Click on the "+" icon'
echo '  *  Select layout language, Here Nudi will be under others'
echo '  *  On the right side choose layout you want to add eg. Nudi'
echo '  *  Click "Add"'
echo '  *  Select layout you just created and close the window.'
echo '  *  Your layout is up and running... Now you can feel it all around your OS.'
echo ""