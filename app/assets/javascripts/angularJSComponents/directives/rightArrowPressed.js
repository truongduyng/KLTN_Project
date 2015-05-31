directives.directive('rightArrowPressed', [function() {
	return {
		restrict: 'A',
		link: function(scope, iElement, iAttrs) {
			$(document).on("keydown", function(evt) {
				evt = evt || window.event;
				switch (evt.keyCode) {
					case 39:
						{
							scope.$apply(function() {
								scope.$eval(iAttrs.rightArrowPressed);
							});
							break;
						}
				}
			});
		}
	};
}])