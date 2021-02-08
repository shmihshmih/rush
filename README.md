# Rushservice

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:777/`. The app will automatically reload if you change any of the source files.
Run `export NODE_ENV=production && nodemon app.js/node app.js(16059)` for a nodejs server with production settings. It will work on localhost:5000.
## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
Tips for server: use PM2. install locally with npm install pm2 --save, start it with node_modules/.bin/pm2 --help. In config change default and production environments. pkill node - kill node server process. Also you might use NODE_ENV=production NODE_PORT=7564

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
