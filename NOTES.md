### Temes pendents

- Fer que l'aplicació sigui multi-idioma

### Procés d'actualització de les dades
Partir del full de càlcul:<br/>
https://docs.google.com/spreadsheets/d/1nl7Mnwlg6uqaQj-gZ0ajAx7l-zh-VOQh2F_JbMhf314/edit#gid=0

Exportar el primer full a `utils/programes.csv` i executar:

```bash
$ cd utils
$ ./conv-programes.js debug
# Si tot éstà OK:
$ ./conv-programes.js > ../public/data/programes.json
```

Exportar el full "Zones" a `utils/zones.csv` i executar:

```bash
$ cd utils
$ ./conv-poligons.js debug
# Si tot éstà OK:
$ ./conv-poligons.js > ../public/data/poligons.json
```

Exportar el full "Instàncies" a `utils/instancies.csv` i executar:

```bash
$ cd utils
$ ./conv-instancies.js debug
# Si tot éstà OK:
$ ./conv-instancies.js centres > ../public/data/centres.json
$ ./conv-instancies.js instancies > ../public/data/instancies.json
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



