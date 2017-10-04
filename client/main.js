import angular from 'angular';
import angularMeteor from 'angular-meteor';
import './main.html';
//import { RouterModule, Routes } from '@angular/router';

var webApp = angular.module('main-site', [
    angularMeteor,
    'ngRoute',
]);
/*
webApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            //controller: 'HomeController',
            templateUrl: 'imports/components/home/home.html'
        })
        .when('/about', {
            templateUrl: 'imports/components/about/about.html'
        })
        .when('/companies',{
            templateUrl: 'imports/components/companies/companies.html'
        })
        .when('/contact-us',{
            templateUrl: 'imports/components/contact-us/contact.html'
        })
        .when('/login', {
            templateUrl: 'imports/components/login/login.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});

*/