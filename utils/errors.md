## Possibles errors, alguns corregits manualment

- **Instància del programa 25 (_Mobilitat FP_) assignada a un centre inexistent: 25004505**\
Codi de centre desconegut.\
El codi "25004504", molt semblant, correspont a l'Escola Agrària de Tàrrega, que ja consta com a participant en aquest mateix programa.
S'hauria d'esborrar de la base de dades.

- **Instància del programa 37 (_Emprèn FP_) assignada a un centre inexistent: 08021170**\
A la base de dades diu que és l'Escola Pia de Mataró, però el codi d'aquest centre és: 08021107. De moment s'ha canviat manualment a l'exportació, però s'ha de corregir també a l'AGEMI per evitar que torni a sortir l'error en el futur.

- **Codi incorrecte del centre "La Salle Bonanova" al programa 62 (#aquiproubullying)**\
El centre "C La Salle Bonanova" (08003907) consta com a participant al programa 62 (#aquiproubullying) amb el codi 08013081, que pertany a l'IE Coves d'en Cimany. Correcció feta manualment a l'exportació, però s'hauria de corregir també a la base de dades. En concret, cal buscar el centre "C La Salle Bonanova" al programa 62 i canviar el codi que hi ha escrit ara (08013081) pel correcte: 08003907.

- **Instància duplicada: 25006276 | prog. 20 | curs 2017-2020**
S'hauria d'eliminar una de les dues participacions idèntiques registrades a la base de dades.

- **Instància quadriplicada: 43000226 | prog. 3002 | curs 2025-2026**
El centre 43000226 (Escola La Barquera - ZER Atzavara) consta 4 vegades com a participant a la xarxa 3002. S'haurien d'esborrar 3 d'aquestes participacions a la base de dades, i deixar-ne només una. Els altres tres centres de la ZER (que té el codi 43009035) ja consten també inscrits a la xarxa.

## Codis absolutament desconeguts (cal esborrar-los de la base de dades!)

- **Instància del programa 59 (_Apadrinem el nostre patrimoni_) assignada a un centre inexistent: 08067087**\
- **Instància del programa 60 (_Orientació educativa per a l’aprenentatge competencial orientador_) assignada a un centre inexistent: 08040522**\
- **Instància del programa 65 (_araArt_) assignada a un centre inexistent: 08067015**\
- **Instància del programa 68 (_EmpresaFP_) assignada a un centre inexistent: 00803176**\
- **Instància del programa 69 (_OrientaFP_) assignada a un centre inexistent: 08035632**\

## Centres que participen en programes on no haurien de poder participar

S'ha de revisar si l'error està en la descripció del programa, que no inclou els estudis oferts pel centre, o si realment és un error d'adscripció del centre al programa.

- **El centre amb codi "[08006908](https://innovacio.xtec.gencat.cat/centre/08006908)" participa al programa 38 (Campionat de Catalunya de d'FP i proves tècniques de les Olimpíades - SKILLS) sense tenir cap dels estudis requerits**\
centre: EINF2C, EPRI, ESO, BATX | programa: CFPM, CFPS
- **El centre amb codi "[08000131](https://innovacio.xtec.gencat.cat/centre/08000131)" participa al programa 38 (Campionat de Catalunya de d'FP i proves tècniques de les Olimpíades - SKILLS) sense tenir cap dels estudis requerits**\
centre: EINF2C, EPRI, ESO, BATX | programa: CFPM, CFPS
- **El centre amb codi "[08013101](https://innovacio.xtec.gencat.cat/centre/08013101)" participa al programa 38 (Campionat de Catalunya de d'FP i proves tècniques de les Olimpíades - SKILLS) sense tenir cap dels estudis requerits**\
centre: ESO, BATX | programa: CFPM, CFPS
- **El centre amb codi "[08018561](https://innovacio.xtec.gencat.cat/centre/08018561)" participa al programa 38 (Campionat de Catalunya de d'FP i proves tècniques de les Olimpíades - SKILLS) sense tenir cap dels estudis requerits**\
centre: EPRI, ESO, BATX | programa: CFPM, CFPS
- **El centre amb codi "[08031861](https://innovacio.xtec.gencat.cat/centre/08031861)" participa al programa 38 (Campionat de Catalunya de d'FP i proves tècniques de les Olimpíades - SKILLS) sense tenir cap dels estudis requerits**\
centre: ESO, BATX | programa: CFPM, CFPS
- **El centre amb codi "[08075921](https://innovacio.xtec.gencat.cat/centre/08075921)" participa al programa 38 (Campionat de Catalunya de d'FP i proves tècniques de les Olimpíades - SKILLS) sense tenir cap dels estudis requerits**\
centre: TEGM, TEGS | programa: CFPM, CFPS
- **El centre amb codi "[08013101](https://innovacio.xtec.gencat.cat/centre/08013101)" participa al programa 25 (Programa de mobilitat formativa i cooperació europea i internacional en els ensenyaments professionals) sense tenir cap dels estudis requerits**\
centre: ESO, BATX | programa: CFAM, CFAS, CFPM, CFPS, ESDI, IDI, TEGM, TEGS
- **El centre amb codi "[08020620](https://innovacio.xtec.gencat.cat/centre/08020620)" participa al programa 25 (Programa de mobilitat formativa i cooperació europea i internacional en els ensenyaments professionals) sense tenir cap dels estudis requerits**\
centre: ESO, BATX | programa: CFAM, CFAS, CFPM, CFPS, ESDI, IDI, TEGM, TEGS
- **El centre amb codi "[08052827](https://innovacio.xtec.gencat.cat/centre/08052827)" participa al programa 25 (Programa de mobilitat formativa i cooperació europea i internacional en els ensenyaments professionals) sense tenir cap dels estudis requerits**\
centre: ESO, BATX | programa: CFAM, CFAS, CFPM, CFPS, ESDI, IDI, TEGM, TEGS
- **El centre amb codi "[08013101](https://innovacio.xtec.gencat.cat/centre/08013101)" participa al programa 32 (Programa d´innovació i transferència de coneixement  InnovaFP) sense tenir cap dels estudis requerits**\
centre: ESO, BATX | programa: CFPM, CFPS
- **El centre amb codi "[08018561](https://innovacio.xtec.gencat.cat/centre/08018561)" participa al programa 32 (Programa d´innovació i transferència de coneixement  InnovaFP) sense tenir cap dels estudis requerits**\
centre: EPRI, ESO, BATX | programa: CFPM, CFPS
- **El centre amb codi "[08018561](https://innovacio.xtec.gencat.cat/centre/08018561)" participa al programa 37 (Programa d'innovació pedagògica EmprènFP) sense tenir cap dels estudis requerits**\
centre: EPRI, ESO, BATX | programa: CFPM, CFPS
- **El centre amb codi "[08013101](https://innovacio.xtec.gencat.cat/centre/08013101)" participa al programa 9 (Formació Professional Intensiva) sense tenir cap dels estudis requerits**\
centre: ESO, BATX | programa: CFAM, CFAS, CFPM, CFPS, ESCS, ESDI
- **El centre amb codi "[08018561](https://innovacio.xtec.gencat.cat/centre/08018561)" participa al programa 9 (Formació Professional Intensiva) sense tenir cap dels estudis requerits**\
centre: EPRI, ESO, BATX | programa: CFAM, CFAS, CFPM, CFPS, ESCS, ESDI
- **El centre amb codi "[08025599](https://innovacio.xtec.gencat.cat/centre/08025599)" participa al programa 9 (Formació Professional Intensiva) sense tenir cap dels estudis requerits**\
centre: EINF2C, EPRI | programa: CFAM, CFAS, CFPM, CFPS, ESCS, ESDI
- **El centre amb codi "[08067961](https://innovacio.xtec.gencat.cat/centre/08067961)" participa al programa 9 (Formació Professional Intensiva) sense tenir cap dels estudis requerits**\
centre: EINF1C | programa: CFAM, CFAS, CFPM, CFPS, ESCS, ESDI
- **El centre amb codi "[08013101](https://innovacio.xtec.gencat.cat/centre/08013101)" participa al programa 39 (Programa de Qualitat i Millora contínua) sense tenir cap dels estudis requerits**\
centre: ESO, BATX | programa: CFAM, CFAS, CFPM, CFPS, IDI, MUSP, PFI, TEGM, TEGS
- **El centre amb codi "[08031861](https://innovacio.xtec.gencat.cat/centre/08031861)" participa al programa 39 (Programa de Qualitat i Millora contínua) sense tenir cap dels estudis requerits**\
centre: ESO, BATX | programa: CFAM, CFAS, CFPM, CFPS, IDI, MUSP, PFI, TEGM, TEGS
- **El centre amb codi "[08047492](https://innovacio.xtec.gencat.cat/centre/08047492)" participa al programa 39 (Programa de Qualitat i Millora contínua) sense tenir cap dels estudis requerits**\
centre: ESO, BATX | programa: CFAM, CFAS, CFPM, CFPS, IDI, MUSP, PFI, TEGM, TEGS
- **El centre amb codi "[08020036](https://innovacio.xtec.gencat.cat/centre/08020036)" participa al programa 43 (Programa SI. Salut Integral) sense tenir cap dels estudis requerits**\
centre: BATX, CFPM, CFPS, TEGM, TEGS | programa: EINF2C, EPRI, ESO, EE
- **El centre amb codi "[08013101](https://innovacio.xtec.gencat.cat/centre/08013101)" participa al programa 63 (Programa Activa FP) sense tenir cap dels estudis requerits**\
centre: ESO, BATX | programa: CFPM, CFPS
- **El centre amb codi "[08065147](https://innovacio.xtec.gencat.cat/centre/08065147)" participa al programa 65 (araArt) sense tenir cap dels estudis requerits**\
centre: EINF1C | programa: BATX, EE, EINF2C, EPRI, ESO
- **El centre amb codi "[08001595](https://innovacio.xtec.gencat.cat/centre/08001595)" participa al programa 68 (Programa EmpresaFP) sense tenir cap dels estudis requerits**\
centre: EINF2C, EPRI | programa: CFAS, CFPM, CFPS
- **El centre amb codi "[08013101](https://innovacio.xtec.gencat.cat/centre/08013101)" participa al programa 68 (Programa EmpresaFP) sense tenir cap dels estudis requerits**\
centre: ESO, BATX | programa: CFAS, CFPM, CFPS
- **El centre amb codi "[08013214](https://innovacio.xtec.gencat.cat/centre/08013214)" participa al programa 68 (Programa EmpresaFP) sense tenir cap dels estudis requerits**\
centre: ESO, BATX | programa: CFAS, CFPM, CFPS
- **El centre amb codi "[08067430](https://innovacio.xtec.gencat.cat/centre/08067430)" participa al programa 68 (Programa EmpresaFP) sense tenir cap dels estudis requerits**\
centre: EINF2C, EPRI | programa: CFAS, CFPM, CFPS
- **El centre amb codi "[08013101](https://innovacio.xtec.gencat.cat/centre/08013101)" participa al programa 69 (Programa OrientaFP) sense tenir cap dels estudis requerits**\
centre: ESO, BATX | programa: CFAS, CFPM, CFPS
- **El centre amb codi "[08013101](https://innovacio.xtec.gencat.cat/centre/08013101)" participa al programa 74 (Futura FP) sense tenir cap dels estudis requerits**\
centre: ESO, BATX | programa: CFPM, CFPS
- **El centre amb codi "[08069581](https://innovacio.xtec.gencat.cat/centre/08069581)" participa al programa 77 (Enfocament Restauratiu Global (ERG)) sense tenir cap dels estudis requerits**\
centre: ADULTS | programa: BATX, CFPM, CFPS, EE, EINF2C, EPRI, ESO, IFE
- **El centre amb codi "[08011451](https://innovacio.xtec.gencat.cat/centre/08011451)" participa al programa 3002 (Xarxa Territorial de Millora Educativa) sense tenir cap dels estudis requerits**\
centre: EE | programa: ADULTS, BATX, CFPM, CFPS, EINF1C, EINF2C, EPRI, ESCM, ESCS, ESDI, ESO, PFI
- **El centre amb codi "[08014051](https://innovacio.xtec.gencat.cat/centre/08014051)" participa al programa 3002 (Xarxa Territorial de Millora Educativa) sense tenir cap dels estudis requerits (centre: EE | programa: ADULTS, BATX, CFPM, CFPS, EINF1C, EINF2C, EPRI, ESCM, ESCS, ESDI, ESO, PFI)
- **El centre amb codi "[25005557](https://innovacio.xtec.gencat.cat/centre/25005557)" participa al programa 3006 (Comunitat STEAMcat) sense tenir cap dels estudis requerits**\
centre: EE | programa: EINF2C, EPRI, ESO
- **El centre amb codi "[08014796](https://innovacio.xtec.gencat.cat/centre/08014796)" participa al programa 78 (Programa d’innovació pedagògica XarxaPFI) sense tenir cap dels estudis requerits**\
centre: EINF1C, EINF2C, EPRI | programa: PFI
- **El centre amb codi "[08028151](https://innovacio.xtec.gencat.cat/centre/08028151)" participa al programa 78 (Programa d’innovació pedagògica XarxaPFI) sense tenir cap dels estudis requerits**\
centre: EINF2C, EPRI | programa: PFI
- **El centre amb codi "[08031046](https://innovacio.xtec.gencat.cat/centre/08031046)" participa al programa 78 (Programa d’innovació pedagògica XarxaPFI) sense tenir cap dels estudis requerits**\
centre: EINF1C, EINF2C, EPRI | programa: PFI
- **El centre amb codi "[08055713](https://innovacio.xtec.gencat.cat/centre/08055713)" participa al programa 78 (Programa d’innovació pedagògica XarxaPFI) sense tenir cap dels estudis requerits**\
centre: ADULTS | programa: PFI
- **El centre amb codi "[25003032](https://innovacio.xtec.gencat.cat/centre/25003032)" participa al programa 78 (Programa d’innovació pedagògica XarxaPFI) sense tenir cap dels estudis requerits**\
centre: EINF1C, EINF2C, EPRI | programa: PFI
- **El centre amb codi "[25003123](https://innovacio.xtec.gencat.cat/centre/25003123)" participa al programa 78 (Programa d’innovació pedagògica XarxaPFI) sense tenir cap dels estudis requerits**\
centre: EINF1C, EINF2C, EPRI | programa: PFI
- **El centre amb codi "[25004981](https://innovacio.xtec.gencat.cat/centre/25004981)" participa al programa 78 (Programa d’innovació pedagògica XarxaPFI) sense tenir cap dels estudis requerits**\
centre: EINF1C, EINF2C, EPRI | programa: PFI
- **El centre amb codi "[43000421](https://innovacio.xtec.gencat.cat/centre/43000421)" participa al programa 78 (Programa d’innovació pedagògica XarxaPFI) sense tenir cap dels estudis requerits**\
centre: EINF1C, EINF2C, EPRI | programa: PFI
- **El centre amb codi "[43000950](https://innovacio.xtec.gencat.cat/centre/43000950)" participa al programa 78 (Programa d’innovació pedagògica XarxaPFI) sense tenir cap dels estudis requerits**\
centre: EINF2C, EPRI | programa: PFI
- **El centre amb codi "[43001280](https://innovacio.xtec.gencat.cat/centre/43001280)" participa al programa 78 (Programa d’innovació pedagògica XarxaPFI) sense tenir cap dels estudis requerits**\
centre: EINF1C, EINF2C, EPRI | programa: PFI
- **El centre amb codi "[43005650](https://innovacio.xtec.gencat.cat/centre/43005650)" participa al programa 78 (Programa d’innovació pedagògica XarxaPFI) sense tenir cap dels estudis requerits**\
centre: EINF2C, EPRI | programa: PFI
