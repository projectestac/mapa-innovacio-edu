#!/bin/bash

# Collect fresh data
#   read -p "Download CSV files from origin? (y/n) "
#   echo ""
#   if [[ $REPLY =~ ^[Yy]$ ]]
#   then
#     echo "INFO: Collecting fresh data"
#     # wget -O "dades-centres.csv" "https://docs.google.com/spreadsheets/d/e/2PACX-1vRpdo7gw7chsCUSO7vbfoJxjCxviGKOVnO_4QOJOYy7eQ_2_ocsQB4eT46KFlnLZLEcrAJAZy9wfvBF/pub?gid=1052887050&single=true&output=csv"
#     # wget -O "dades-centres.csv" "https://docs.google.com/spreadsheets/d/e/2PACX-1vR176Xby7fy42-kT7gs5A0CY9hpKW7-2qnSh8NbeMy07XC4eLg1CHgYiqHsOYE_l2EzcQvHHrXEC4NM/pub?gid=1052887050&single=true&output=csv"
#     wget -O "dades-centres.csv" "https://docs.google.com/spreadsheets/d/e/2PACX-1vRqkdR485O-c8wyVixpUxbFJu9bClQAN718xruXPNDUUGPBHB60k0NyNYF9Vt3QUd0cEIYXXi3QTAQD/pub?gid=1052887050&single=true&output=csv"
#     
#     # wget -O "programes.csv" "https://docs.google.com/spreadsheets/d/e/2PACX-1vQltu0ck-HrUcJKN_-5wbsKW84LwnSZn9zIUZoRA4JGtE2fRqEbrdVn6KzjQWtCsja3MMEeNcS5yIAg/pub?gid=0&single=true&output=csv"
#     wget -O "programes.csv" "https://docs.google.com/spreadsheets/d/e/2PACX-1vT2V3_918AgY0kM5Su2WGEY287FljFhECKJWZW-R-64k8Ryaq8w3_w319XgcDFeWRVgth4TCycjyzqG/pub?gid=1423731379&single=true&output=csv"
#   
#     # wget -O "zones.csv" "https://docs.google.com/spreadsheets/d/e/2PACX-1vQltu0ck-HrUcJKN_-5wbsKW84LwnSZn9zIUZoRA4JGtE2fRqEbrdVn6KzjQWtCsja3MMEeNcS5yIAg/pub?gid=1406508845&single=true&output=csv"
#     wget -O "zones.csv" "https://docs.google.com/spreadsheets/d/e/2PACX-1vT2V3_918AgY0kM5Su2WGEY287FljFhECKJWZW-R-64k8Ryaq8w3_w319XgcDFeWRVgth4TCycjyzqG/pub?gid=1151284760&single=true&output=csv"
#   
#     # wget -O "instancies.csv" "https://docs.google.com/spreadsheets/d/e/2PACX-1vQltu0ck-HrUcJKN_-5wbsKW84LwnSZn9zIUZoRA4JGtE2fRqEbrdVn6KzjQWtCsja3MMEeNcS5yIAg/pub?gid=836258250&single=true&output=csv"
#     # wget -O "instancies.csv" "https://docs.google.com/spreadsheets/d/e/2PACX-1vQltu0ck-HrUcJKN_-5wbsKW84LwnSZn9zIUZoRA4JGtE2fRqEbrdVn6KzjQWtCsja3MMEeNcS5yIAg/pub?gid=224420620&single=true&output=csv"
#     wget -O "instancies.csv" "https://docs.google.com/spreadsheets/d/e/2PACX-1vT2V3_918AgY0kM5Su2WGEY287FljFhECKJWZW-R-64k8Ryaq8w3_w319XgcDFeWRVgth4TCycjyzqG/pub?gid=1834253308&single=true&output=csv"
#   fi

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
