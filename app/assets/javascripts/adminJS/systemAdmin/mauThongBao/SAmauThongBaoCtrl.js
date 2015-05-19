app.controller('SAmauThongBaoCtrl', ['$scope', 'SAmauThongBaoService', '$cookies',
	function($scope, mauThongBaoService, $cookies) {
		$scope.notificationCategories = mauThongBaoService.notificationCategories;
		$scope.content = "";
		$scope.selectedNC = null;

		$scope.onSelectNC = function(nc) {
			$scope.selectedNC = nc;
			$scope.content = $scope.selectedNC.notification_template.content;
			console.log("content: ", $scope.content);
		};

		$scope.save = function() {
			console.log("content in save: ", $scope.content);
			mauThongBaoService.update($scope.selectedNC, $scope.content).success(function() {
				$scope.content = "";
				$scope.selectedNC = null;
			});
		};

		$scope.cancel = function() {
			$scope.selectedNC = null;
			$scope.content = "";
		};

		//Cau hinh cho ckeditor
		$scope.editorOptions = {
			language: 'vi',
			'skin': 'moono',
			'extraPlugins': "widget,autogrow,tableresize,colordialog,colorbutton,font,imagebrowser,justify",
			uiColor: '#CCEAEE',
			imageBrowser_listUrl: '/images.json',
			filebrowserImageUploadUrl: '/images.json',
			// contentsCss: ['http://localhost:3000/assets/bootstrap/dist/css/bootstrap.css','http://localhost:3000/assets/applicationCSS/customCSS/style.css']
		};
		// $scope.isLoadCKeditorCompleted = false;
		// $scope.onReady = function(){
		// 	$scope.isLoadCKeditorCompleted = true;
		// };

		var config = {};
		config.filebrowserParams = function() {
			var csrf_token, csrf_param, meta,
				metas = document.getElementsByTagName('meta'),
				params = new Object();

			for (var i = 0; i < metas.length; i++) {
				meta = metas[i];

				switch (meta.name) {
					case "csrf-token":
						csrf_token = $cookies['XSRF-TOKEN'];
						break;
					case "csrf-param":
						csrf_param = meta.content;
						break;
					default:
						continue;
				}
			}

			if (csrf_param !== undefined && csrf_token !== undefined) {
				params[csrf_param] = csrf_token;
			}

			return params;
		};

		config.addQueryString = function(url, params) {
			var queryString = [];

			if (!params) {
				return url;
			} else {
				for (var i in params)
					queryString.push(i + "=" + encodeURIComponent(params[i]));
			}

			return url + ((url.indexOf("?") != -1) ? "&" : "?") + queryString.join("&");
		};

		// Integrate Rails CSRF token into file upload dialogs (link, image, attachment and flash)
		CKEDITOR.on('dialogDefinition', function(ev) {
			console.log("in dialogDefinition: ", ev);
			// Take the dialog name and its definition from the event data.
			var dialogName = ev.data.name;
			var dialogDefinition = ev.data.definition;
			var content, upload;

			if (CKEDITOR.tools.indexOf(['link', 'image', 'attachment', 'flash'], dialogName) > -1) {
				content = (dialogDefinition.getContents('Upload') || dialogDefinition.getContents('upload'));
				upload = (content == null ? null : content.get('upload'));

				if (upload && upload.filebrowser && upload.filebrowser['params'] === undefined) {
					upload.filebrowser['params'] = config.filebrowserParams();
					console.log("upload.filebrowser: ", upload.filebrowser);
					upload.action = config.addQueryString(upload.action, upload.filebrowser['params']);
				}
			}
		});
	}
]);