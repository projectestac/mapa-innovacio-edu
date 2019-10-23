#!/bin/bash

# Collect fresh data
echo "INFO: Collecting fresh data"
wget -O "dades-centres.csv" "https://docs.google.com/spreadsheets/d/e/2PACX-1vT7QVrFcb6c42LesPCMQvrrDoEWBAhZIBQoQTYfVZ6XcUqaJ_Rd7Uj9dtPY5EfGavBNy1P8Lyuj-2WV/pub?gid=1542544478&single=true&output=csv"
wget -O "programes.csv" "https://docs.google.com/spreadsheets/d/e/2PACX-1vQltu0ck-HrUcJKN_-5wbsKW84LwnSZn9zIUZoRA4JGtE2fRqEbrdVn6KzjQWtCsja3MMEeNcS5yIAg/pub?gid=0&single=true&output=csv"
wget -O "zones.csv" "https://docs.google.com/spreadsheets/d/e/2PACX-1vQltu0ck-HrUcJKN_-5wbsKW84LwnSZn9zIUZoRA4JGtE2fRqEbrdVn6KzjQWtCsja3MMEeNcS5yIAg/pub?gid=1406508845&single=true&output=csv"
wget -O "instancies.csv" "https://docs.google.com/spreadsheets/d/e/2PACX-1vQltu0ck-HrUcJKN_-5wbsKW84LwnSZn9zIUZoRA4JGtE2fRqEbrdVn6KzjQWtCsja3MMEeNcS5yIAg/pub?gid=836258250&single=true&output=csv"

echo "INFO: Processing polygons"
./conv-poligons.js debug

read -p "Update poligons.json? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]
then
  ./conv-poligons.js > ../public/data/poligons.json
fi

echo "INFO: Processing instances and schools"
./conv-instancies.js debug

read -p "Update instancies.json and centres.json? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]
then
  ./conv-instancies.js centres > ../public/data/centres.json
  ./conv-instancies.js instancies > ../public/data/instancies.json
fi

echo "INFO: Processing programs"
./conv-programes.js debug

read -p "Update programes.json? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]
then
  ./conv-programes.js > ../public/data/programes.json
fi

echo "INFO: Done!"
