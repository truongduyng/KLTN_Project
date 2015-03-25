console.log("header leftArrowPressed");
directives.directive('leftArrowPressed', [function() {
	return {
		restrict: 'A',
		link: function(scope, iElement, iAttrs) {
			$(document).on("keydown", function(evt) {
				evt = evt || window.event;
				switch (evt.keyCode) {
					case 37:
						{
							scope.$apply(function() {
								scope.$eval(iAttrs.leftArrowPressed);
							});
							break;
						}
				}
			});


		}
	};
}]);