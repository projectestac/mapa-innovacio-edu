## Mapa de la Innovació Pedagògica de Catalunya

https://innovacio.xtec.gencat.cat


### Description
This app deals with five types of data:
- The __innovation programs__ promoted or certified by the Departament of Education of the Government of Catalonia (`public/data/programes.json`)
- A list of __schools__ participating in these programs since the school year 2015/16, with its geographic co-ordinates and other data (`public/data/centres.json`)
- The __relationships__ between schools and innovation programs (`public/data/instancies.json`)
- The current __school zones__ of Catalonia, organized on two levels: 10 territorial services (_Serveis Territorials_) and 73 school districts (_Serveis Educatius de Zona_) with the geographic polygons associated to each one (`public/data/poligons.json`)
- Information about __educational levels__, types of schools, school years and other metadata (`public/data/estudis.json`)

This data is combined and used to build an interactive map and pages with different representations.

### Main features
The main features of `mapa-innovacio-edu` are:
- Show on the map the schools participating on the selected programs, year by year.
- Select/unselect the programs to be represented on the map, one by one or based on common characteristics (educational level, innovation type, topic, etc.)
- Show information about a specific innovation program: objectives, rules, agenda, schools involved, etc.
- Show information about a specific school: address, location, educational levels, web portal, innovation programs in which the school participates, etc.
- Show information about each zone: address, location, web, innovation programs, schools participating on them, etc.
- Full text search engine that allows to look for specific words on program descriptions, school names, zones, etc.
- Representation of the "presence intensity" of a specific innovation program or programs in each geographic zone. The "intensity ratio" is computed by dividing the number of schools participating on the program(s) by the total number of schools in each zone with at least one educational level targetted by the program(s).

### Components
This [Progressive Web Application](https://en.wikipedia.org/wiki/Progressive_web_applications) has been built with the following open source components:
- [React](https://reactjs.org/) and [create-react-app](https://github.com/facebook/create-react-app) as a main framework and compilation system.
- [Leaflet](https://leafletjs.com/) and [react-Leaflet](https://react-leaflet.js.org/) to build the maps, with cartography provided by [Wikimedia Commons](https://commons.wikimedia.org/).
- [React Router](https://reacttraining.com/react-router/) to allow online and offline navigation between the different sections, providing always a public permalink.
- [Material-UI](https://material-ui.com/) for the user interface, inspired on Google's [Material Design](https://material.io/design/). Some icons have been taken from [Material deign Icons](https://materialdesignicons.com/), packed for Material-UI by [mdi-material.ui](https://github.com/TeamWertarbyte/mdi-material-ui).
- [Fuse.js](https://fusejs.io/) as a full-text search engine.
- [react-markdown](https://rexxars.github.io/react-markdown/) to render the program descriptions in rich-text.
- [sw-precache](https://github.com/GoogleChromeLabs/sw-precache) to build a costumized [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) allowing also the use of the app when the device is off-line. This component will be replaced soon by [Workbox](https://developers.google.com/web/tools/workbox/).
- [Font Face Observer](https://github.com/bramstein/fontfaceobserver) to dynamically load [Open Sans](https://fonts.google.com/specimen/Open+Sans) and other fonts used by the components.

Note that hundreds of other open source projects are used by these components to make possible the final app.

### Building the app

#### Prerequisites

- [NodeJS](https://nodejs.org/) is needed to build the main application. Linux users are advised to use the [official LTS repositories](https://github.com/nodesource/distributions/blob/master/README.md).


#### Setting up

First of all, the [NPM](https://www.npmjs.com/) components must be loaded:

```bash
# Go to the main project directory:
$ cd path/to/mapa-innovacio-edu

# Install the required npm components:
$ npm ci
```

### Common operations

From here, the most usual operations are:

#### Launch the development server:
```bash
$ cd path/to/mapa-innovacio-edu
$ npm start
```
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### Build the main application:
```bash
$ cd path/to/mapa-innovacio-edu
$ npm run build
```
Builds the app for production to the `app/build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

For more information about this and other available scripts check the [Create React App](https://facebook.github.io/create-react-app/) site.

### License
`mapa-innovacio-edu` is an open source development made by the Department of Education of the Government of Catalonia, released under the terms of the [European Union Public Licence v. 1.2](https://eupl.eu/1.2/en/). You can freely use, reproduce or modify it in any circumstance and for all usage.

