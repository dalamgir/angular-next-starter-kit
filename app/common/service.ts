import 'socket.io-client';

/**
 *
 * @ngdoc       service
 * @name        HttpService
 * @requires    $http
 *
 * @description
 *
 * Base class for a service which communicates with the server via HTTP. The service contains
 * all the HTTP methods and delegates to angular's $http service. An extension of this service
 * can implement its own logic and internally will have access to $http service's methods.
 *
 * {@link       https://docs.angularjs.org/api/ng/service/$http}
 *
 **/
export class HttpService {

    $http: ng.IHttpService;

    static $inject = ['$http'];

    constructor($http: ng.IHttpService) {
        this.$http = $http;
    }

    get(url: string, config = {}): ng.IPromise<any> {
        return this.$http.get(url, config);
    }

    delete(url: string, config = {}): ng.IPromise<any> {
        return this.$http.delete(url, config);
    }

    head(url: string, config = {}): ng.IPromise<any> {
        return this.$http.head(url, config);
    }

    jsonp(url: string, config = {}): ng.IPromise<any> {
        return this.$http.jsonp(url, config);
    }

    post(url: string, data = {}, config = {}): ng.IPromise<any> {
        return this.$http.post(url, data, config);
    }

    put(url: string, data = {}, config = {}): ng.IPromise<any> {
        return this.$http.put(url, data, config);
    }

    patch(url: string, data = {}, config = {}): ng.IPromise<any> {
        return this.$http.patch(url, data, config);
    }
}

export class SocketService {

    $socket: SocketIOClient.Socket;

    createConnection(endPoint: string) {
        this.$socket = io.connect(endPoint);
    }

    on(event: string, callback: () => void) {
        this.$socket.on(event, callback);
    }

    emit(event: string, data = {}, callback: () => void) {
        this.$socket.emit(event, [data, callback]);
    }

}

export class BufferService {

}

export class SoapService {

}
