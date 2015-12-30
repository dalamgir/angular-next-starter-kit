# angular-next-starter-kit
Seed project for developing angular 1.x applications in preparation for migrating on to Angular 2.0

Angular 2.0 brings in quite a few new concepts and design patterns. However, Angular 2.0 is a few months away from being production ready. For those starting off with an Angular 1.x application but want to use the concepts of Angular 2.0 and some of the technologies used in Angular 2.0 today, then this starter kit may serve the purpose.

The goals of this project is simple:
* Focus on the application logic by:
  * Create a `service` to get some data (see **Creating a Service** below)
  * Create a `component` to use the data (see **Creating a Component** below)
  * Compose larger components using smaller components

The developer **DOES NOT** have to worry about the following:
* Configuring a `build system`
* Configuring `unit tests`, `end-to-end tests`, `code coverage`
* Provide `static analysis` and configure `typescript`
* Automatically generate `documentation`

# Features

* Complete scaffolding with Angular 1.4.x
* Typescript integration
* Webpack bundling system with multiple loaders (sass, html, typescript)
* Gulp integration (currently only one task to provide auto documentation)
* Karma integration with Mocha, Chai, multiple browser launchers (Chrome, PhantomJS) and code coverage
* Interfaces and APIs to create testable and reusable components
* Various kinds of service interface
  * Http Service
  * Socket Service using Socket IO
  * SOAP Service using soap client
  * Buffer Service using ProtobufJS

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

# Directory Structure

```
|-- app                         | Root directory for the application
|
|---- common                    | All modules common to the application
|------ bindingTypes.ts         | Module containing Angular binding types
|------ component.ts            | Interface for a BaseComponent
|------ service.ts              | Interfaces for HttpService, SocketService, SoapService and BufferService
|
|---- components                | Root directory for all the components. Any component should go in here
|------ dropdown                | Sample implementation of a component
|-------- dropdown.html         | Template file for the component using Angular's template syntax
|-------- dropdown.scss         | Scoped styles for the component. This can now just be `required` in
|-------- dropdown.spec.ts      | Unit test spec file for the component. This should be local to the component
|-------- dropdown.ts           | Implementation of the component itself
|
|---- core                      | Utility modules that bootstrap the application
|------ bootstrap.ts            | Loads in all the other utility modules and bootstrap's Angular
|------ components.ts           | Holds references to all the components
|------ modules.ts              | Registers all the modules
|------ services.ts             | Holds references to all the services
|------ tests.ts                | Imports all the necessary modules needed for testing
|
|---- services
|------ stock-service.ts        | Reference implementation of an HttpService using JSONP
|
|---- utilities                 | Any utilities used across the application
|
|---- app.d.ts                  | Typescript definition file for the application
|---- index.html                | Main html file for the application
|---- index.scss                | Main css file for the application
|
|-- build                       | Contains the bundled application
|-- docs                        | Contains all auto generated documentation 
|-- fonts                       | Contains application wide fonts
|-- images                      | Contains application wide images
|-- gulpfile                    | Gulp task file. Currently only one task to generate documentation is provided
|-- karma.conf.js               | Configuration file for the karma test runner
|-- package.json                | Contains NPM dependencies and application commands
|-- tsconfig.json               | Typescript compiler configuration
|-- tsd.json                    | Contains references to definitely typed libraries
|-- tslint.json                 | Configuration used by the tslint-loader 
|-- webpack.config.js           | Webpack's global configuration file
```

# Creating a Service

Suppose we want to create a service that gets **Stock Quote** from [Dev Markit API](http://dev.markitondemand.com/MODApis/). The service will take a **symbol** and return a **quote**.

Create a file under `app/services/stock-service`. All services should go under `app/services`.

### First define a `Quote` object

```
export interface Quote {
 name: string,
 symbol: string,
 lastPrice: number,
 high: number,
 low: number,
 open: number
}
```

Since `typescript` is used, the fields in the Quote object can be strongly typed. The interface should be exported since it may be used in other parts of the application. These interfaces can also be moved to a common file.

### Create an extension of HttpService interface

An HttpService interface is already provided. Angular's `$http` service is automatically injected. All that needs to be done is a new class should be created **implementing the service logic**.

```
export class StockService extends HttpService {

 getQuote(symbol: string): ng.IPromise<Quote> {
  var url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=${symbol}&callback=JSON_CALLBACK`;
  return this.jsonp(url);
 }

}
```

The `getQuote` method takes a `string` argument and returns an `ng.IPromise` which should eventually resolve to a `Quote` object. To read mode about angular's definitely typed objects, visit [AngularJS DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/angularjs). It is very clear from the code what this service does and what the method returns.

### Lastly, register the service

An angular module `app.services` is readily available:

```
angular.module('app.services').service('stockService', StockService);
```

Now, this service is **ready to be injected into any component**.

# Creating a Component

All components should go under `app/components/[component-name]`.

A component should be composed of 4 files
 * [component-name].html     - Template for the component
 * [component-name].scss     - Scoped styles for the component
 * [component-name].spec.ts  - Unit test for the component
 * [component-name].ts       - Implementation of the component logic

Suppose we want to create a drop down component. Intuitively, the component should be used like this:

```
<dropdown
  name="My Dropdown"
  items="[{ href: '#', label: 'Item 1' },{ href: '#', label: 'Item 2' }]">
</dropdown>
```

##### Create a template (dropdown.html):

```
<div component="DropDown" class="dropdown">
    <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true"     
            aria-expanded="true">
        {{ ctrl.name }}
        <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
        <li ng-repeat="item in ctrl.items">
            <a href="{{ item.href }}">{{ item.label }}</a>
        </li>
    </ul>
</div>
```

##### Create a scoped stylesheet (dropdown.scss):
```
[component="DropDown"] {
  &.dropdown {
    a {
      color: pink !important;
    }
  }
}
```

##### Create the component implementation (dropdown.ts) by extending the BaseComponent:

**See downdown.ts reference implementation**
