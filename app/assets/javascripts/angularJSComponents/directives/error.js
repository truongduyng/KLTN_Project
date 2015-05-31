directives.directive("error", function($rootScope) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'appJS/notFound/_notFound.html',
  }
});