import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './topNavigation.html';

class TopNavigationController{
    constructor($scope){
        $scope.viewModel(this);
    }
}

export default angular.module('topNavigation',[angularMeteor]).component('topNavigation',{
    templateUrl: './topNavigation.html',
    controller: ['$scope',TopNavigationController]
})