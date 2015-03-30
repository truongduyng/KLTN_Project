app.directive('ngFileChange', [function() {
	return {
		restrict: 'A',
		link: function(scope, iElement, iAttrs) {
			$(iElement).bind('change', function(evt) {
				var file = evt.currentTarget.files[0];
				//Gan name cua file cho scope.fileName 
				scope.$apply(function(){
					scope[iAttrs.fileName] = file.name;
				});
				console.log("scope", scope);
				var reader = new FileReader();
				reader.onload = function(evt) {
					scope.$apply(function($scope) {
						scope[iAttrs.imageSelected] = evt.target.result;
					});
				};
				reader.readAsDataURL(file);
			});
		}
	};
}])