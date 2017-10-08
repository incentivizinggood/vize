import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './about.html';

export default angular.module('about', [angularMeteor]).component('about', {
    templateUrl: './about.html',
    controllerAs: 'about'
});

