//import ['ngRoute'] from angular-route

export default function routes($routeProvider) {
    $routeProvider
        .when('/', {
            /*controller: 'HomeController',
            templateUrl: 'views/home.html'*/
            templateUrl: 'imports/ui/components/home/home.html',
        })
        .when('/about', {
            /*controller: 'PhotoController',
            templateUrl: 'views/photo.html' */
            templateUrl: 'imports/ui/components/home/home.html',
        })
        .otherwise({
            redirectTo: '/'
        });
}