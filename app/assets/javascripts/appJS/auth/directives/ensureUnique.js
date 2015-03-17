app.directive('ensureUnique', ['$http', function($http) {
  return {
    require: 'ngModel',
    link: function(scope, ele, attrs, c) {

      var checkUsername = function() {
        if (attrs.ensureUnique == '') {
          c.$setValidity('unique', true);
        } else {
          $http.get("/check/" + attrs.ensureUnique, {
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

      scope.$watch(attrs.ngModel, checkUsername);
    }
  }
}]);

// app.directive('confirmationPassword', [function() {
//   return {
//     require: 'ngModel',
//     restrict: 'A',
//     scope: {
//       orginalPassword: "="
//     },
//     link: function(scope, iElement, iAttrs, ctrl) {
    
//       scope.$watch(iAttrs.ngModel, function(newValue, oldValue, scope) {
//         alert("changed");
//         alert(newValue);
//         if (newValue == scope.orginalPassword) {
//           ctrl.$setValidity('confirmation_password', true);
//         } else {
//           ctrl.$setValidity('confirmation_password', false);
//         };
//       });
//     }
//   };
// }])

app.directive('confirmationPassword', [function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, iElement, iAttrs, ctrl) {
      scope.$watch(iAttrs.ngModel, function(newValue, oldValue, scope) {
        if (newValue == scope.user.password) {
          ctrl.$setValidity('confirmation_password', true);
        } else {
          ctrl.$setValidity('confirmation_password', false);
        };
      });
    }
  };
}]);
