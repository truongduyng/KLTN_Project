directives.directive('fallbackSrc', function() {
	var fallbackSrc = {
		link: function postLink(scope, iElement, iAttrs) {
			iElement.bind('error', function() {
				if(iAttrs.fallbackSrc == 'sportaLogo'){
					angular.element(this).attr("src", '/assets/application/placeholder/sporta_icon.png');
				}else{
					angular.element(this).attr("src", iAttrs.fallbackSrc);
				}
				
			});
		}
	}
	return fallbackSrc;
});