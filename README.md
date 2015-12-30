# angular-next-starter-kit
Seed project for developing angular 1.x applications in preparation for migrating on to Angular 2.0

Angular 2.0 brings in quite a few new concepts and design patterns. However, Angular 2.0 is a few months away from being production ready. For those starting off with an Angular 1.x application but want to use the concepts of Angular 2.0 and some of the technologies used in Angular 2.0 today, then this starter kit may serve the purpose.

# Features

* Complete scaffolding with Angular 1.4.x
* Typescript integration
* Webpack bundling system with multiple loaders (sass, html, typescript)
* Gulp integration (currently only one task to provide auto documentation)
* Karma integration with Mocha, Chai, multiple browser launchers (Chrome, PhantomJS) and code coverage
* SocketIO client
* Useful interfaces to create components and services

# Framework

* Angular 1.4.x
* Bootstrap (sass) 3.3.6
* Socket IO Client 1.3.7
* Typescript v1.7.5

# Build

* Webpack
* Gulp

# Test

* Karma
* Mocha
* Chai
* Protractor

# Getting Started 

To get started using the seed project, complete the following steps:

## Clone the current repository

```
git clone https://github.com/alamgird/angular-next-starter-kit.git
```

## Install all dependencies

There are two kinds of dependencies in this project:

1. `NPM` dependencies which are used for development as well as application code
2. `Typescript` dependencies which are the definitely typed files for some of the `NPM` modules

The following command will continue to install all dependencies:

```
npm run setup
```

## Run the application

To run the application with a development server with hot module reload, run the following command:

```
npm run serve
```

## Run the tests

To run the unit tests for the application, run the following command:

```
npm test
```

Integration tests are on their way.

## Package the application

To produce a bundled application, run the following command:

```
npm run build
```
