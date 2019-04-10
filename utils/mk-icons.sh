#!/bin/sh

# Generate icons at specified sizes in PNG format from `public/ico/icon.svg`
# Needed packages: inkscape, icoutils

source="../public/ico/icon.svg"
dest="../public/ico"

for size in 16 24 32 48 64 72 96 144 168 192 512
do
  echo Creating $dest/icon$size.png
  inkscape -z -e $dest/icon$size.png -w $size -h $size $source
done

echo Creating ICO file $dest/favicon.ico
icotool -c -o $dest/favicon.ico $dest/icon16.png $dest/icon32.png $dest/icon64.png

echo Done!
