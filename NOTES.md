### Fonts de dades

Les dades originals es troben a:
`dades-centres.csv`
https://docs.google.com/spreadsheets/d/e/2PACX-1vT7QVrFcb6c42LesPCMQvrrDoEWBAhZIBQoQTYfVZ6XcUqaJ_Rd7Uj9dtPY5EfGavBNy1P8Lyuj-2WV/pub?gid=1542544478&single=true&output=csv

`utils/programes.csv`
https://docs.google.com/spreadsheets/d/e/2PACX-1vQltu0ck-HrUcJKN_-5wbsKW84LwnSZn9zIUZoRA4JGtE2fRqEbrdVn6KzjQWtCsja3MMEeNcS5yIAg/pub?gid=0&single=true&output=csv


`utils/zones.csv`
https://docs.google.com/spreadsheets/d/e/2PACX-1vQltu0ck-HrUcJKN_-5wbsKW84LwnSZn9zIUZoRA4JGtE2fRqEbrdVn6KzjQWtCsja3MMEeNcS5yIAg/pub?gid=1406508845&single=true&output=csv


`utils/instancies.csv`
https://docs.google.com/spreadsheets/d/e/2PACX-1vQltu0ck-HrUcJKN_-5wbsKW84LwnSZn9zIUZoRA4JGtE2fRqEbrdVn6KzjQWtCsja3MMEeNcS5yIAg/pub?gid=836258250&single=true&output=csv


### Temes pendents

- Fer que l'aplicació sigui multi-idioma

### Procés d'actualització de les dades

Actualitzar dades amb:

```bash
$ cd utils
$ ./update-data.sh
```

Comprovar que no es mostrin errors i respondre 'y' a tot.

# Configuració amb NGINX

Quan s'utilitza BrowserRouter cal incloure aquesta directiva a `nginx.conf`:

```nginx
location / {
  index  index.html;
  try_files $uri $uri/ /index.html;
}
```

