## TO-DO list

- Migrar de `sw-precache` a `workbox`. Veure: https://developers.google.com/web/tools/workbox/guides/migrations/migrate-from-sw
- Exportació de llistes
- Arranjar polígons SE
- Arranjar icones de programes
- Incorporar programes en curs
- Evitar les tipologies "Escoles d'art", "Règim Especial" i "Règim especial" (substituir-ho pels codis estàndard)
- Fer que l'aplicació sigui multi-idioma
- Tractament de les ZER (ara surten els centres duplicats!)
- Redactar README.md

### Codis tipus d'estudis

~~Veure: https://analisi.transparenciacatalunya.cat/Educaci-/Directori-de-centres-docents/e2ef-eiqj~~

Veure: http://ensenyament.gencat.cat/web/.content/home/arees-actuacio/centres-serveis-educatius/centres/directoris-centres/codisnivellseducatius.pdf


| CODI   | ESTUDI                                                     |
| ------ | ---------------------------------------------------------- |
| EINF1C | Educació infantil 1er cicle                                |
| EINF2C | Educació infantil 2n cicle                                 |
| EPRI   | Educació primària                                          |
| EE     | Educació especial                                          |
| IFE    | Itineraris formatius específics                            |
| ESO    | Educació secundària obligatòria                            |
| BATX   | Batxillerat                                                |
| AA01   | Curs específic d'accés als cicles formatius de grau mitjà  |
| CFPM   | Cicles formatius de grau mitjà                             |
| PPAS   | Curs preparació proves accés a FP grau superior            |
| AA03   | Curs preparació a la incorporació a FP grau superior       |
| CFPS   | Cicles formatius de grau superior                          |
| PFI    | Programes de formació i inserció                           |
| PA01   | Cicles formatius d’arts de grau mitjà                      |
| CFAM   | Cicles d'arts plàstiques i disseny grau mitjà              |
| PA02   | Cicles formatius d’arts de grau superior                   |
| CFAS   | Cicles d'arts plàstiques i disseny grau superior           |
| ESDI   | Ensenyaments superiors de disseny                          |
| ADR    | Art dramàtic                                               |
| CRBC   | Conservació i restauració de bens culturals                |
| IDI    | Idiomes                                                    |
| DANE   | Escoles de dansa                                           |
| DANP   | Ensenyaments professionals de dansa                        |
| DANS   | Ensenyaments superior de dansa                             |
| MUSE   | Escoles de música                                          |
| MUSP   | Ensenyaments professionals de música                       |
| MUSS   | Ensenyaments superior de música                            |
| TEGM   | Ensenyaments esportius grau mitjà                          |
| TEGS   | Ensenyaments esportius grau superior                       |
| ESTR   | Ensenyaments centres estrangers                            |
| ADULTS | Educació d'adults                                          |

### Codis afegits (provisionalment!)

| CODI   | ESTUDI                                                     |
| ------ | ---------------------------------------------------------- |
| RESP   | Règim Especial                                             |
| ART    | Escoles d'Art                                              |



#### utils/centres-total.json
- línia 83939 (Fundació UAB), indicar: "SE del Vallès Occidental V"


### Modificacions a programes
- Fusionat el programa 46 (Projecte de Qualitat i Millora Contínua) amb el 39 (Programa de Qualitat i Millora Contínua)

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

