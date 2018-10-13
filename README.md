[![Build Status](https://travis-ci.org/eskinderg/Angular.svg?branch=master)](https://travis-ci.org/eskinderg/Angular) [![Build status](https://ci.appveyor.com/api/projects/status/xortrnvhoggxxsxd/branch/master?svg=true)](https://ci.appveyor.com/project/eskinderg/angular-cli/branch/master)

Angular 6 Project

## Getting Started

Clone this repository locally :

``` bash
git clone https://github.com/eskinderg/angular.git
```

Install dependencies with npm :

``` bash
npm install
```

## To build for development

- **in a terminal window** -> npm start

Voila! You can use your Angular + Electron app in a local development environment with hot reload !

The application code is managed by `main.ts`. In this sample, the app runs with a simple Angular App (http://localhost:4200) and an Electron window.
The Angular component contains an example of Electron and NodeJS native lib import.
You can desactivate "Developer Tools" by commenting `win.webContents.openDevTools();` in `main.ts`.

## Included Commands

|Command|Description|
|--|--|
|`npm run ng:serve:web`| Execute the app in the browser |
|`npm run build`| Build the app. Your built files are in the /dist folder. |
|`npm run build:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:local`| Builds your application and start electron
|`npm run electron:linux`| Builds your application and creates an app consumable on linux system |
|`npm run electron:windows`| On a Windows OS, builds your application and creates an app consumable in windows 32/64 bit systems |
|`npm run electron:mac`|  On a MAC OS, builds your application and generates a `.app` file of your application that can be run on Mac |

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

##Docker

If you want to use docker make sure you have the latest version of docker installed
-   `cd Angular-CLI1`
-   `docker-compose up -d`
Navigate to `http://localhost:4200/`
