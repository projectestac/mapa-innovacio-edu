#!/bin/bash

# Collect fresh data
read -p "Download CSV files from origin? (y/n) "
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "INFO: Collecting fresh data"
  wget -O "dades-centres.csv" "https://docs.google.com/spreadsheets/d/e/2PACX-1vRpdo7gw7chsCUSO7vbfoJxjCxviGKOVnO_4QOJOYy7eQ_2_ocsQB4eT46KFlnLZLEcrAJAZy9wfvBF/pub?gid=1052887050&single=true&output=csv"
  wget -O "programes.csv" "https://docs.google.com/spreadsheets/d/e/2PACX-1vQltu0ck-HrUcJKN_-5wbsKW84LwnSZn9zIUZoRA4JGtE2fRqEbrdVn6KzjQWtCsja3MMEeNcS5yIAg/pub?gid=0&single=true&output=csv"
  wget -O "zones.csv" "https://docs.google.com/spreadsheets/d/e/2PACX-1vQltu0ck-HrUcJKN_-5wbsKW84LwnSZn9zIUZoRA4JGtE2fRqEbrdVn6KzjQWtCsja3MMEeNcS5yIAg/pub?gid=1406508845&single=true&output=csv"
  wget -O "instancies.csv" "https://docs.google.com/spreadsheets/d/e/2PACX-1vQltu0ck-HrUcJKN_-5wbsKW84LwnSZn9zIUZoRA4JGtE2fRqEbrdVn6KzjQWtCsja3MMEeNcS5yIAg/pub?gid=836258250&single=true&output=csv"
fi

echo "INFO: Processing polygons"
./conv-poligons.js debug

read -p "Update poligons.json? (y/n) "
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]
then
  ./conv-poligons.js > ../public/data/poligons.json
fi

echo "INFO: Processing instances and schools"
./conv-instancies.js debug

read -p "Update instancies.json and centres.json? (y/n) "
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]
then
  ./conv-instancies.js centres > ../public/data/centres.json
  ./conv-instancies.js instancies > ../public/data/instancies.json
fi

echo "INFO: Processing programs"
./conv-programes.js debug

read -p "Update programes.json? (y/n) "
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]
then
  ./conv-programes.js > ../public/data/programes.json
fi

echo "INFO: Done!"
