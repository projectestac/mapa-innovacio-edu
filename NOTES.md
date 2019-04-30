## TO-DO list

- Aplicar tema corporatiu per a desktop i mòbil
- Migrar de `sw-precache` a `workbox`. Veure: https://developers.google.com/web/tools/workbox/guides/migrations/migrate-from-sw
- Selecció de projectes per àmbits, àrees...
- Selecció del curs escolar
- Exportació de llistes
- Arranjar polígons SE
- Arranjar icones de programes
- Incorporar programes en curs
- Comprovar programes sense centres
- Evitar les tipologies "Escoles d'art", "Règim Especial" i "Règim especial" (substituir-ho pels codis estàndard)
- Fer que l'aplicació sigui multi-idioma
- Tractament de les ZER (ara surten els centres duplicats!)
- Redactar README.md
- Fer ús del hook 'useState' en comptes de passar paràmetres

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


### Canvis fets per corregir zones

#### utils/poligons-raw.json
- línia 17, canviar "SE Santa Coloma de Gramenet" per "SE Ciutat de Santa Coloma de Gramenet"
- línia 43, canviar "SE de La Cerdanya" per "SE de la Cerdanya"
- línia 48, canviar "SE del Gironés" pern "SE del Gironès"

#### utils/centres-total.json
- línia 83939 (Fundació UAB), indicar: "SE del Vallès Occidental V"

### Canvis fets per corregir codis d'estudis i nomenclatura als programes

#### public/data/progranes.json
- línia 198 (_Programa d'assessorament professional a les persones i a les empreses_), substituir "Règim Especial" per "RESP"
- línia 281 (_Programa de Qualitat i Millora contínua_), substituir "Règim especial" per "RESP"
- línies 455 i 455 (_Talent creatiu i empresa_), substituir "Règim Especial" i "Escoles d'art" per "RESP" i "ART"
- línies 552 i 553 (_STEAMcat_) substituir "Àmbit Artístic" per "Àmbit artístic" i "Àmbit Personal i Social" per "Àmbit personal i social"

