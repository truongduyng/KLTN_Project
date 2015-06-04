app.controller('SAhomeCtrl', ['$scope', function($scope) {

	$scope.message = "this is message from home page";
	// $scope.editorOptions = {
	// 	language: 'ru',
	// 	uiColor: '#000000'
	// };

	// $scope.content = "";



	// $scope.editorOptions = {
	// 	language: 'en',
	// 	'skin': 'moono',
	// 	'extraPlugins': "imagebrowser",
	// 	imageBrowser_listUrl: '/api/v1/ckeditor/gallery',
	// 	filebrowserBrowseUrl: '/api/v1/ckeditor/files',
	// 	filebrowserImageUploadUrl: '/api/v1/ckeditor/images',
	// 	filebrowserUploadUrl: '/api/v1/ckeditor/files',
	// 	toolbarLocation: 'bottom',
	// 	toolbar: 'full',
	// 	toolbar_full: [{
	// 		name: 'basicstyles',
	// 		items: ['Bold', 'Italic', 'Strike', 'Underline']
	// 	}, {
	// 		name: 'paragraph',
	// 		items: ['BulletedList', 'NumberedList', 'Blockquote']
	// 	}, {
	// 		name: 'editing',
	// 		items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
	// 	}, {
	// 		name: 'links',
	// 		items: ['Link', 'Unlink', 'Anchor']
	// 	}, {
	// 		name: 'tools',
	// 		items: ['SpellChecker', 'Maximize']
	// 	}, {
	// 		name: 'clipboard',
	// 		items: ['Undo', 'Redo']
	// 	}, {
	// 		name: 'styles',
	// 		items: ['Format', 'FontSize', 'TextColor', 'PasteText', 'PasteFromWord', 'RemoveFormat']
	// 	}, {
	// 		name: 'insert',
	// 		items: ['Image', 'Table', 'SpecialChar', 'MediaEmbed']
	// 	}, '/', ]
	// };

	////Cau hinh toolbar chi gom 3 muc thuoc 1 group
	// $scope.editorOptions = {
	// 	language: 'vi',
	// 	uiColor: '#9AB8F3',
	// 	toolbar: [
	// 		['Source', '-', 'Bold', 'Italic']
	// 	],
	// };

	// $scope.editorOptions = {
	// 	language: 'vi',
	// 	uiColor: '#CCEAEE',
	// 	'skin': 'moono',
	// 	width: '100%',
	// 	height: 200,
	// 	extraPlugins: 'widget,autogrow,image2,tableresize,colordialog,colorbutton,font',
	// 	autoGrow_minHeight: 200,
	// 	autoGrow_maxHeight: 600,
	// 	autoGrow_bottomSpace: 50,
	// 	removeButtons: '',
	// };

	// $scope.page = {
	// 	body: "this is text in page",
	// };

	$scope.editorOptions = {
		language: 'en',
		'skin': 'moono',
		'extraPlugins': "imagebrowser",
		imageBrowser_listUrl: '/images.json',
		filebrowserImageUploadUrl: '/images.json',
		toolbarLocation: 'bottom',
		toolbar: 'full',
		toolbar_full: [{
			name: 'basicstyles',
			items: ['Bold', 'Italic', 'Strike', 'Underline']
		}, {
			name: 'paragraph',
			items: ['BulletedList', 'NumberedList', 'Blockquote']
		}, {
			name: 'editing',
			items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
		}, {
			name: 'links',
			items: ['Link', 'Unlink', 'Anchor']
		}, {
			name: 'tools',
			items: ['SpellChecker', 'Maximize']
		}, {
			name: 'clipboard',
			items: ['Undo', 'Redo']
		}, {
			name: 'styles',
			items: ['Format', 'FontSize', 'TextColor', 'PasteText', 'PasteFromWord', 'RemoveFormat']
		}, {
			name: 'insert',
			items: ['Image', 'Table', 'SpecialChar', 'MediaEmbed']
		}, '/', ]
	};

	var config = {};
	config.filebrowserParams = function() {
		var csrf_token, csrf_param, meta,
			metas = document.getElementsByTagName('meta'),
			params = new Object();

		for (var i = 0; i < metas.length; i++) {
			meta = metas[i];

			switch (meta.name) {
				case "csrf-token":
					csrf_token = meta.content;
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
		// Take the dialog name and its definition from the event data.
		var dialogName = ev.data.name;
		var dialogDefinition = ev.data.definition;
		var content, upload;

		if (CKEDITOR.tools.indexOf(['link', 'image', 'attachment', 'flash'], dialogName) > -1) {
			content = (dialogDefinition.getContents('Upload') || dialogDefinition.getContents('upload'));
			upload = (content == null ? null : content.get('upload'));

			if (upload && upload.filebrowser && upload.filebrowser['params'] === undefined) {
				upload.filebrowser['params'] = config.filebrowserParams();
				upload.action = config.addQueryString(upload.action, upload.filebrowser['params']);
			}
		}
	});
}]);