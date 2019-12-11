### v1.1.9 (2019-12-11)
#### Improvements
- Dockerfile provided for easy deployments on the cloud

### v1.1.8 (2019-12-02)
#### Improvements
- New query params `?embed` and "`?embedMap`, useful for embedding the app (or just a map) in school portals and project sites.
- The top bar is now auto-hidden when scrolling down on small screen devices.
- [Sitemap files](https://en.wikipedia.org/wiki/Sitemaps) are now automatically generated on each build.
- Allow for two different routing methods: [HashRouter](https://reacttraining.com/react-router/web/api/HashRouter), now in three possible modes (_slash_, _noslash_ and _hashbang_), and [BrowserRouter](https://reacttraining.com/react-router/web/api/BrowserRouter) (_no-hash_), based on the HTML5 history API, for plain URL paths. Default is _no-hash_.
- Updated school data and app components
- Allow direct phone dialing to schools
- New big schools (_Instituts Escola_) inherit the history of former small schools, when available
- Improved importing of school and projects data

### v1.1.7 (2019-09-03)
#### Improvements
- Updated school data and app components
- New program "mobils.edu"
- Simplify hash routes when deployed on a non-root path

#### Bug fixes
- Avoid quota errors in service worker caches
- Map points not displayed when accessing to inner pages with direct URLs

### v1.1.6 (2019-07-19)
#### Improvements
- Add "School ID" (_codi de centre_) as a field involved in full text searches
- Allow to export to CSV also from "Programes"
- Updated code comments
- Updated components

### v1.1.5 (2019-07-04)
#### Improvements
- Use of sitemaps for better results on search engines
- Update HTML title and description in each page
- CSS media print directives, for better results when printing pages
- Updated school data

### v1.1.4 (2019-06-21)
#### Improvements
- New "Install app" button, to facilitate the use as a Progressive Web App, also when off-line
- Cacheable Google Fonts
- Updated components

### v1.1.3 (2019-04-06)
#### Improvements
- Bulk loading of map markers

#### Bug fixes
- Fixed some misspellings in program descriptions

### v1.1.2 (2019-31-05)
#### Improvements
- Updated data with more external documents
- Improved search algorithm, including school data in programs
- Integrated Vimeo and Youtube players

### v1.1.0 (2019-29-05)
#### Improvements
- Export data to CSV spreadshhets in "Programa", "Centre" and "Zona"
- Updated data
- Updated components
- Service Worker now generated with [Workbox](https://developers.google.com/web/tools/workbox/) instead of [sw-precache](https://github.com/GoogleChromeLabs/sw-precache)

### v1.0.8 (2019-24-05)
#### Improvements
- Avoid unnecessary map updates
- Improved layout on small screens
- Improved data in polygons
- Updated README.md
- Project cards, allowing PDF documents and embedded video
- Use of GA to track page views
- [Material-UI](https://material-ui.com/) updated to v 4.0

#### Bug fixes
- Avoid extra spaces in search expressions

### v1.0.4 (2019-18-05)
#### Initial release
- First public release published in: https://innovacio.xtec.gencat.cat
