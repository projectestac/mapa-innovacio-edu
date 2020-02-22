#!/bin/bash

# Generate .webp versions of all .png images in `public/logos` and `public/logos/mini`
# Needed packages: webp (cwebp)

big="../public/logos"
small="../public/logos/mini"

for logoPath in $big/*.png $small/*.png
do
  cwebp -q 90 "$logoPath" -o "${logoPath/%.png/.webp}"
done

echo Done!
