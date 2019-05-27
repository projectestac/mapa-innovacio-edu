# Map of pedagogical innovation in Catalonia

https://innovacio.xtec.gencat.cat


## Description
This application handles five types of data:
- The __innovation programs__ promoted or certified by the Departament of Education of the Government of Catalonia.
- A list of __schools__ participating in these programs since the school year 2015/16.
- The __relationships__ between schools and innovation programs (school year participating, title of the projects, etc.).
- The current __school zones__ of Catalonia, organized on two levels: 10 territorial services (_Serveis Territorials_) and 73 school districts (_Serveis Educatius de Zona_).
- Information about the __educational levels__ involved in the programs, types of schools and other metadata.

All these data are used to build an interactive map and pages with specific information about schools, programs and projects, and their geographic distribution.

## Main features
The main features of this application are:
- Shows on the map the schools participating on the selected programs, year by year.
- Allows to select/unselect which programs should be shown on the map, based on their characteristics (educational level, innovation type, subject, etc.)
- Shows information about a specific innovation program: objectives, rules, agenda, schools involved, etc.
- Shows information about a specific school: address, location, educational levels, web portal, innovation programs in which the school participates, etc.
- Shows information about each of the areas: location, web portal, innovation programs, participating schools, etc.
- Full-text search engine that allows you to search for specific words about program descriptions, school names, zones, etc.
- Representation of the "intensity of presence" of the selected innovation program(s) in each zone. This "intensity of presence" is calculated by dividing the number of schools participating in the programs by the total number of schools in each zone that have at least one of the educational levels covered by these programs.

## Components
This is a [Progressive Web Application](https://en.wikipedia.org/wiki/Progressive_web_applications) built with the following open source components:
- [React](https://reactjs.org/) as a main framework and [create-react-app](https://github.com/facebook/create-react-app) as a scaffolding, compilation and delivery system.
- [Leaflet](https://leafletjs.com/) and [react-Leaflet](https://react-leaflet.js.org/), used to build the maps with cartography provided by [Wikimedia Commons](https://commons.wikimedia.org/).
- [React Router](https://reacttraining.com/react-router/) to allow online and offline navigation between the different sections, always providing a permalink to current content.
- [Material-UI](https://material-ui.com/) has been used to build the user interface, inspired by Google's [Material Design](https://material.io/design/). Some icons have been obtained from [Material Design Icons](https://materialdesignicons.com/), packaged for Material-UI by [mdi-material.ui](https://github.com/TeamWertarbyte/mdi-material-ui).
- [Fuse.js](https://fusejs.io/) as a full-text search engine.
- [react-markdown](https://rexxars.github.io/react-markdown/) is used to render the program descriptions in rich-text.
- [sw-precache](https://github.com/GoogleChromeLabs/sw-precache) builds a costumized [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), allowing also the use of the application when the device is off-line. This component will be replaced soon by [Workbox](https://developers.google.com/web/tools/workbox/).
- [Font Face Observer](https://github.com/bramstein/fontfaceobserver) is used to dynamically load the [Open Sans](https://fonts.google.com/specimen/Open+Sans) font.
- [json2csv](https://github.com/zemirco/json2csv) exports spreadsheets of data in CSV format.
- [react-ga](https://github.com/react-ga/react-ga) React module for Google Analytics.

Keep in mind that these components use hundreds of other open source projects to make the final application possible.

## Building the app

### Prerequisites

- [NodeJS](https://nodejs.org/) is needed to build the main application. Linux users are advised to use the [official LTS repositories](https://github.com/nodesource/distributions/blob/master/README.md).


### Setting up

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
Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

For more information about this and other available scripts check the [Create React App](https://facebook.github.io/create-react-app/) site.

## License
"Map of pedagogical innovation in Catalonia" is an open source development made by the Department of Education of the Government of Catalonia, released under the terms of the [European Union Public Licence v. 1.2](https://eupl.eu/1.2/en/).
