app.directive('modal', function() {
  return {
    template: '<div class="modal fade">' +
      '<div class="modal-dialog">' +
      '<div class="modal-content">' +
      '<div class="modal-header">' +
      '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
      '<h4 class="modal-title">{{ title }}</h4>' +
      '</div>' +
      '<div class="modal-body" ng-transclude></div>' +
      '</div>' +
      '</div>' +
      '</div>',
    restrict: 'E',
    transclude: true,
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


app.directive('internalModal', function() {
  return {
    template: '<div class="modal fade">' +
      '<div class="modal-dialog">' +
      '<div class="modal-content">' +
      '<div class="modal-header">' +
      '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
      '<h4 class="modal-title">{{ title }}: {{item}}</h4>' +
      '</div>' +
      '<div class="modal-body" ng-transclude></div>' +
      '</div>' +
      '</div>' +
      '</div>',
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      title: "@",
      visible: "=",
      item: "="
    },
    link: function postLink(scope, element, attrs) {
      
      scope.$watch('visible', function(newValue, oldValue, scope) {
        var value = newValue;
        if (value == true)
          $(element).modal('show');
        else
          $(element).modal('hide');

      });
      
      $(element).on('shown.bs.modal', function() {
        scope.$apply(function() {
          scope.visible = true;
        });
      });

      $(element).on('hidden.bs.modal', function() {
        //Bat su kien modal hidden va set scope.visible = false
        scope.$apply(function() {
          scope.visible = false;
        });
      });
    }
  };
});