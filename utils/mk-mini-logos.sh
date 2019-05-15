#!/bin/bash

# Generate small logos at size 40x40 from `public/logos` into `public/logos/mini`
# Needed packages: imagemagick (convert)

source="../public/logos"
dest="../public/logos/mini"

notNeeded="ambits_innovacio.png|ceb.png|avatar-educacio.png|portada.png"

for logoPath in $source/*.png
do
  base=$(basename -- "$logoPath")
  srcFile=$logoPath
  destFile=$dest/$base
  if [[ $notNeeded != *$base* ]]; then
    echo Converting $srcFile to $destFile
    convert $srcFile -resize 40x40 $destFile
  fi
done

echo Done!
