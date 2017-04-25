Requirements

Your server should be created as an NPM package, with all dependencies listed with exact versions in the package.json file, and the server should be launchable with the npm start command hint: the server code should be in server.js, or you have to add a start script to your package.json (20 points).

Your server should use a Sqlite3 database to store the item metadata in at least one table. Your items should have at least 1 picture, a name, and a description.  Additional metadata fields are fine. (10 points) 

The necessary tables should be generated when the server starts if they don't already exist. hint: look at how the migrations in the Scrumtastic server work (10 points)

Your server should provide a RESTful API that matches the CRUD actions for your catalog items (create, read, update, destroy, and an index).  This should serve JSON responses to requests (10 points)

Your server should serve a single static web page, and all necessary css and javascript files. (10 points)

On an initial page load, you should use client-side Javascript to make an AJAX request against the server to retrieve all items in the catalog, then dynamically insert a list of these items on the page, styled by CSS rules (10 points)

Clicking on one of the items should make an AJAX request for the specific item against the server.  The returned JSON data should be used to dynamically create a detail listing (including all metadata and pictures for the catalog item), either replacing the list or otherwise appearing on the page, and styles by CSS rules (10 points). 

Your "catalog" page/widget should also have a button that dynamically creates a form on the page, allowing the upload of new catalog items.  It should submit an AJAX request to the RESTful API to create new items, which should be validated and stored in the database. (10 points)

Your client-side code should be organized into separate modules that are bundled into a single Javascript file with Browserify (10 points). 

 

For this assignment, you may use the core Node modules, the SQLite3 module, Browserify, and the JQuery library.  Your CSS should be self-created, though you may base it off others' examples.

***NOTES***
script test : browserify /client_js/app.js -o /public/bundle.js
script start : node server.js
