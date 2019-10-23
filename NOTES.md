### Temes pendents

- Fer que l'aplicació sigui multi-idioma

### Procés d'actualització de les dades

Obtenir el fitxer `utils/dades-centres.csv` des de:<br/>
https://docs.google.com/spreadsheets/d/e/2PACX-1vT7QVrFcb6c42LesPCMQvrrDoEWBAhZIBQoQTYfVZ6XcUqaJ_Rd7Uj9dtPY5EfGavBNy1P8Lyuj-2WV/pub?gid=1542544478&single=true&output=csv

Obtenir el fitxer `utils/programes.csv` des de:
https://docs.google.com/spreadsheets/d/e/2PACX-1vQltu0ck-HrUcJKN_-5wbsKW84LwnSZn9zIUZoRA4JGtE2fRqEbrdVn6KzjQWtCsja3MMEeNcS5yIAg/pub?gid=0&single=true&output=csv


Obtenir el fitxer `utils/zones.csv` des de:
https://docs.google.com/spreadsheets/d/e/2PACX-1vQltu0ck-HrUcJKN_-5wbsKW84LwnSZn9zIUZoRA4JGtE2fRqEbrdVn6KzjQWtCsja3MMEeNcS5yIAg/pub?gid=1406508845&single=true&output=csv


Obtenir el fitxer `utils/instancies.csv` des de:
https://docs.google.com/spreadsheets/d/e/2PACX-1vQltu0ck-HrUcJKN_-5wbsKW84LwnSZn9zIUZoRA4JGtE2fRqEbrdVn6KzjQWtCsja3MMEeNcS5yIAg/pub?gid=836258250&single=true&output=csv


Per a obtenir `poligons.json`:

```bash
$ cd utils
$ ./conv-poligons.js debug
# Si tot éstà OK:
$ ./conv-poligons.js > ../public/data/poligons.json
```

Per a obtenir `centres.json` i `instancies.json`:

```bash
$ cd utils
$ ./conv-instancies.js debug
# Si tot éstà OK:
$ ./conv-instancies.js centres > ../public/data/centres.json
$ ./conv-instancies.js instancies > ../public/data/instancies.json
```

Per a obtenir `programes.json`:

```bash
$ cd utils
$ ./conv-programes.js debug
# Si tot éstà OK:
$ ./conv-programes.js > ../public/data/programes.json
```


# Configuració amb NGINX

Quan s'utilitza BrowserRouter cal incloure aquesta directiva a `nginx.conf`:

```nginx
location / {  
  if (!-e $request_filename){
    rewrite ^(.*)$ /index.html break;
  }
}
```



