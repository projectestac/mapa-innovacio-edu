## TO-DO list

- Migrar de `sw-precache` a `workbox`. Veure: https://developers.google.com/web/tools/workbox/guides/migrations/migrate-from-sw
- Fer que l'aplicació sigui multi-idioma
- Redactar README.md

#### utils/centres-total.json
- línia 83939 (Fundació UAB), indicar: "SE del Vallès Occidental V"

### Actualització de dades
Partir del full de càlcul:
https://docs.google.com/spreadsheets/d/1nl7Mnwlg6uqaQj-gZ0ajAx7l-zh-VOQh2F_JbMhf314/edit#gid=0

Convertir els enllaços a fitxes amb: https://sites.google.com/site/gdocs2direct/
Escriure directament el codi embed dels vídeos

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

Atenció: Nova ZER detectada: "Les Goges" (17007415). Al bloc (https://blocs.xtec.cat/zerlesgoges/pagina-exemple/) diu que sòn dos centres (El Frigolet de Porqueres - 17002818 i "La Roqueta de Santi Miquel de Campmajor") però el segon centre no existeix a la BD.

