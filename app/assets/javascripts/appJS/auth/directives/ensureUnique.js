app.directive('ensureUnique', ['$http', function($http) {
  return {
    require: 'ngModel',
    link: function(scope, ele, attrs, c) {

      var checkUnique = function() {
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

      //// BC
      scope.$watch(attrs.ngModel, checkUnique);
      // scope.$watch(attrs.ngModel, checkUsername);
      ////EC
      
    }
  }
}]);


//Directive nay ko chinh xac, do code cung scope.user.password, no dc su cho modal login, register nen
//co gi sai thi quay lai cho nay xem
// app.directive('confirmationPassword', [function() {
//   return {
//     require: 'ngModel',
//     restrict: 'A',
//     link: function(scope, iElement, iAttrs, ctrl) {
//       scope.$watch(iAttrs.ngModel, function(newValue, oldValue, scope) {
//         if (newValue == scope.user.password) {
//           ctrl.$setValidity('confirmation_password', true);
//         } else {
//           ctrl.$setValidity('confirmation_password', false);
//         };
//       });
//     }
//   };
// }]);

//Phien ban nay cai thien hon no lay gia tri password cu thong qua scope[iAttrs.orginalPassword] nen
// tinh tai su dung cao
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
