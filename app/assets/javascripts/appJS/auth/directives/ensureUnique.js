app.directive('ensureUnique', ['$http', function($http) {
  return {
    require: 'ngModel',
    link: function(scope, ele, attrs, c) {

      var checkUnique = function() {
        if (attrs.ensureUnique == '') {
          c.$setValidity('unique', true);
        } else {
          $http.get("/check/" + attrs.ensureUnique + ".json", {
              params: {
                field: attrs.ensureUniqueData,
              }
            })
            .then(function(response) {
                c.$setValidity('unique', response.data.isUnique);
              },
              function(response) {
                c.$setValidity('unique', false);
              });
        }
      };

      scope.$watch(attrs.ngModel, checkUnique);
    }
  }
}]);

//Xac nhan password neu password la thuoc tinh cua scope
app.directive('confirmationPassword', [function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, iElement, iAttrs, ctrl) {
      scope.$watch(iAttrs.ngModel, function(newValue, oldValue, scope) {
        if (newValue == scope[iAttrs.orginalPassword]) {
          ctrl.$setValidity('confirmation_password', true);
        } else {
          ctrl.$setValidity('confirmation_password', false);
        };
      });
    }
  };
}]);



//Xac nhan password neu password la thuoc tinh cua user
app.directive('newConfirmationPassword', [function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, iElement, iAttrs, ctrl) {
      scope.$watch(iAttrs.ngModel, function(newValue, oldValue, scope) {
        if (newValue == scope.user[iAttrs.orginalPassword]) {
          ctrl.$setValidity('confirmation_password', true);
        } else {
          ctrl.$setValidity('confirmation_password', false);
        };
      });
    }
  };
}]);

