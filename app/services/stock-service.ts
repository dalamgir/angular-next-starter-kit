import {HttpService} from "../common/service";

export interface Quote {
    name: string,
    symbol: string,
    lastPrice: number,
    high: number,
    low: number,
    open: number
}

export class StockService extends HttpService {

    getQuote(symbol: string): ng.IPromise<Quote> {
        var url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=${symbol}&callback=JSON_CALLBACK`;
        return this.jsonp(url);
    }

}

angular.module('app.services').service('stockService', StockService);
