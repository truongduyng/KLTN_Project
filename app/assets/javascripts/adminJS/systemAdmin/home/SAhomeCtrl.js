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
		filebrowserBrowseUrl: '/api/v1/ckeditor/files',
		filebrowserImageUploadUrl: '/api/v1/ckeditor/images',
		filebrowserUploadUrl: '/api/v1/ckeditor/files',
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
}]);