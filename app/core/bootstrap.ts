require('bootstrap-loader');
import '../index.scss';
import './modules.ts';
import './services.ts';
import './components.ts';

angular.element(document).ready( () => {
   angular.bootstrap(document, ['app'], {
       strictDi: true
   });
});


