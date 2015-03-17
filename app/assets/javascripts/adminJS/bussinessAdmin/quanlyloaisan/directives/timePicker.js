directives.directive('sprotaDatepicker', [function() {
	
	var linkFunction = function(scope, iElement, iAttrs) {
		// $(iElement).on('changeTime', function() {
		// 	// $('#onselectTarget').text($(this).val());
		// 	console.log("change time");
		// });
		iElement.bind("changeTime", function() {
			scope.$apply(function(){
				scope[iAttrs.ngModel] = iElement.val();
			});
			
		});
	};

	return {
		restrict: 'A',
		require: 'ngModel',
		link: linkFunction,
	};
}]);