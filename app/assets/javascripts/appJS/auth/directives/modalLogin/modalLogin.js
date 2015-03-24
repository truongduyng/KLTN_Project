app.directive('modalLogin', function() {
  return {
    templateUrl: 'appJS/auth/directives/modalLogin/modalLoginTemplate.html',
    restrict: 'E',
    replace: true,
    link: function postLink(scope, element, attrs) {
      scope.title = attrs.title;

      scope.$watch(attrs.visible, function(value) {
        if (value == true)
          $(element).modal('show');
        else
          $(element).modal('hide');
      });

      $(element).on('shown.bs.modal', function() {
        scope.$apply(function() {
          scope[attrs.visible] = true;
        });
      });

      $(element).on('hidden.bs.modal', function() {
        //Bat su kien modal hidden va set scope.visible = false
        scope.$apply(function() {
          scope[attrs.visible] = false;
        });
      });
      
    }
  };
});
