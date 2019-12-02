# Map of pedagogical innovation in Catalonia

https://innovacio.xtec.gencat.cat


## Description
This application deals with five types of data:
- The __innovation programs__ promoted or certified by the Departament of Education of the Government of Catalonia.
- A list of __schools__ participating in these programs since the school year 2015/16.
- The __relationships__ between schools and innovation programs (year of participation, project title, etc.).
- The current __school zones__ of Catalonia, organized on two levels: 10 "local services" (_Serveis Territorials_) and 73 school districts (_Serveis Educatius de Zona_).
- Information about __educational levels__, school types and other metadata.

All these data are used to build an interactive map and pages with specific information about schools, programs and projects.

## Main features
The main features of this application are:
- Show on the map all the schools participating on the selected programs, year by year.
- Allow to select/unselect which programs should be shown on the map, based on their characteristics (educational level, innovation type, subject, etc.)
- Show information about a specific innovation program: objectives, rules, agenda, schools involved, etc.
- Show information about a specific school: address, location, educational levels, website, participation in innovation programs, etc.
- Show information about school districts and the local impact of each innovation program.
- Full-text search engine, allowing to search by keywords, program descriptions, school names, districts, etc.
- Representation of the "presence density" of each innovation program on school districts. This index is calculated by dividing the number of schools participating in each program by the total number of schools having at least one of the educational levels included in it.

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

### Basic configuration

The application has different settings that can be adjusted. Many of these adjustements should be set on a file named `.env`, not included on the repository files. In order to generate your own `.env` file, just duplicate `.env.example`:

```bash
# Make a copy of .env.example
cp .env.example .env
```

### Choosing the type of router
You can choose between two different types of [React Router](https://reacttraining.com/react-router/):

#### HashRouter

[HashRouter](https://reacttraining.com/react-router/web/api/HashRouter) uses the "[hash](https://developer.mozilla.org/en-US/docs/Web/API/URL/hash)" part of URLs to identify the specific contents to be displayed on each page. In order to use this type of router set `REACT_APP_HASH_TYPE` to one of this values: "slash" (#/), "noslash" (#) or "hashbang" (#!/) in `.env`:

```bash
# File .env (or .env.production)
# hashType param passed to HashRouter
REACT_APP_HASH_TYPE="hashbang"
```

#### BrowserRouter
[BrowserRouter](https://reacttraining.com/react-router/web/api/BrowserRouter) can also use the "[pathname](https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname)" part of URLs. In order to use this type of router, set `REACT_APP_HASH_TYPE` to `no-hash` in `.env`:

```bash
# File .env (or .env.production)
# hashType param passed to HashRouter
REACT_APP_HASH_TYPE="no-hash"
```

- Configure your web server to redirect all paths to `index.html`, except those that point to real files or directories.

  - With [Apache HTTP server](https://httpd.apache.org/) you must enable [`mod_rewrite`](https://httpd.apache.org/docs/current/rewrite/) and configure your virtual host. If you have `AllowOverride All` set, the `.htaccess` file provided in `/public` will be used:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-l
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [QSA,L]
```

  - With [NGINX](https://www.nginx.com/resources/wiki/), you must configure your virtual host with a directive like this one:

```nginx
location / {  
  try_files $uri $uri/ /index.html;
}
```

Note: If you are using [Devilbox](http://devilbox.org/) for development, take a look at the file `/.devilbox/nginx.yml`.


### Setting up the root directory

By default, the application is configured to be served at the root (`/`) of your HTTP server. Before deploying it on a different directory, the `homepage` value of `package.json` should be modified. This value should be "" for the root, or any absolute path starting (and not ending) with "/" for other locations. For example, this setting will make the final application run on `https://myhost.mydomain.com/mymap/`:

```json
   "homepage": "/mymap"
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
