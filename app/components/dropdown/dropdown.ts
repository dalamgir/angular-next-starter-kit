import './dropdown.scss';

import {BaseComponent} from "../../common/component";
import {BindingType} from '../../common/bindingTypes';
import {StockService} from "../../services/stock-service";
import {Quote} from "../../services/stock-service";

interface DropDownItem {
    href: string,
    label: string
}

class DropDownController {

    items: DropDownItem[];
    stockService: StockService;

    static $inject = ['$scope', '$attrs', 'stockService'];

    constructor($scope: ng.IScope, $attrs, stockService: StockService) {
        this.items = $scope.$eval($attrs.items);

        stockService.getQuote('AAPL').then( (response: ng.IHttpPromiseCallbackArg<Quote>) => {

            var quoteResponse: any = response.data;

            var quote: Quote =  {
                name: quoteResponse.Name,
                symbol: quoteResponse.Symbol,
                lastPrice: quoteResponse.LastPrice,
                high: quoteResponse.High,
                low: quoteResponse.Low,
                open: quoteResponse.Open
            }

            console.log(quote);
        });
    }
}

class DropDown extends BaseComponent {

    public scope = {
        name: BindingType.ONE_WAY
    };

    public controllerAs = 'ctrl';

    public controller = DropDownController;

    public template = require('./dropdown.html');
}

angular
    .module('app')
    .directive('dropdown', () => new DropDown());
