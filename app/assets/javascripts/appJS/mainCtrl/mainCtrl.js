//Controller nay la controller cha cho tat ca controller
//Khi 1 rejection trong resolve xay ra thi ca controller va view ko bao gio dc load
//do do de lang nghe su kien $stateChangeError thi ta phai tao mainCtrl la controller cha
//cho tat ca controller va lang nghe su kien do

app.controller('mainCtrl', ['$scope', '$rootScope', '$state', 'Auth', 'Flash', '$stateParams', '$location', '$anchorScroll', function($scope, $rootScope, $state, Auth, Flash, $stateParams, $location, $anchorScroll) {

	$scope.signedIn = Auth.isAuthenticated;

	$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams) {
		// console.log("$stateChangeStart: ", toState, fromState);
		//Kiem tra trang thai cua route hay page co yeu cau login hay ko
		//Sau do goi form login, va dua vao thuoc tinh co load lai trang hay de biet cach load trang
		if (toState.access != null && !toState.access.free && !Auth.isAuthenticated()) {
			var isLogin = toState.name === "login";
			if (isLogin) {
				return; // no need to redirect anymore
			}
			event.preventDefault(); // stop current execution
			Flash.create("danger", "Bạn cần đăng nhập để truy cập trang này");
			$state.go("login");
		}
		//Kiem tra neu da chung thuc thi ko the toi 2 trang login va register
		if (Auth.isAuthenticated()) {
			if (toState.name == 'login' || toState.name == 'register') {
				event.preventDefault();
				$state.go("home");
			}
		}

	});


	$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
		// console.log("$stateChangeError: ", toState, fromState, error);
		if (error.status == '404') {
			$state.go('notFound')
		}

	});

	$rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams, error) {
		// console.log("$stateChangeSuccess: ", toState, fromState);
		if (toState.name === "booking"){
			$('#sidebar').css({display: 'none'});
			$('#sidebar').removeClass('col-sm-2');
			$('#main-content').removeClass('col-sm-10');
			$('#main-content').addClass('col-sm-12');
		}

		if (fromState.name === "booking" && toState.name !== "booking"){
			$('#sidebar').css({display: 'inline'});
			$('#sidebar').addClass('col-sm-2');
			$('#main-content').removeClass('col-sm-12');
			$('#main-content').addClass('col-sm-10');
		}

	});

	$rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {

		if ($stateParams.scrollTo) {
			$location.hash($stateParams.scrollTo);
			$anchorScroll();
		}

	});


	//Cau hinh pageConfig chung
	$rootScope.rootPageConfig = {
		currentPage: 1,
		pageSize: 5,
		total: 0,
		adjacent: 2,
		dots: '...',
		'scroll-top': true,
		'hide-if-empty': true,
		'ul-class': 'pagination',
		'active-class': 'active',
		'disabled-class': 'disabled',
		'show-prev-next': true,
	};

}]);

//cho xu ly login xem cai nay http://plnkr.co/edit/3kImqU?p=preview
//Tom lai chi xu ly trang nao can login thi yeu cau login, con ko co permission thi tra ve not_found ben tren da xu ly chuyen toi trang not_found
//Dung multi view cua ui router de thay doi header, footer toan bo layout khi chuyen wa admin