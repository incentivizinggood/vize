import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularRouter from 'angular-route';
import './main.html';
import '../imports/startup/client/routes';
import routes from '../imports/startup/client/routes';

import topNavigation from '../imports/ui/components/navigation/topNavigation';
import about from '../imports/ui/components/about/about';

webApp = angular.module('main-site', [
    angularMeteor,
    ['ngRoute'],
    topNavigation.name,
    about.name,
]).config(config);

function config($routeProvider) {
    $routeProvider.when('/about',{
        templateUrl: '../imports/ui/components/navigation/topNavigation.html',
        controller: 'TopNavigationController'
    }).otherwise({
        redirectTo: '/'
    });
}
