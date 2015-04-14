app.controller('webSocketCtrl', ['$scope', function($scope) {
	// var dispatcher = new WebSocketRails('localhost:3000/websocket');

	// var channel = dispatcher.subscribe_private("post", function() {
	// 	// success callback
	// 	console.log(current_user.name + "Has joined the channel");
	// }, function(reason) {
	// 	// failure callback
	// 	console.log("Authorization failed because " + reason.message);
	// });
	
	// channel.bind('new_post', function(data) {
	// 	console.log("on new Post");
	// });

	// $scope.onSendMessage = function() {
	// 	channel.trigger("new_post");
	// };

	// channel.bind("on_subscribe_success", function(data) {
	// 	console.log("on subscribe success: ", data.message);
	// });

	// dispatcher.on_open = function(data) {
	// 	console.log('Connection has been established: ', data);
	// 	// You can trigger new server events inside this callback if you wish.
	// };

	// dispatcher.bind('hello', function(data) {
	// 	console.log(data.message); // would output 'this is a message'
	// });

	// $scope.message = "";
	// $scope.messages = [];
	// $scope.user =  'user ' +  Math.floor((Math.random() * 100) + 1);
	// $scope.onSendMessage = function() {
	// 	//C1:gui lai message thong qua su kien khac
	// 	// dispatcher.trigger("chat.hello", {
	// 	// 	title: 'chao ban',
	// 	// });

	// 	// dispatcher.bind("hello_reply", function(data){
	// 	// 	console.log(data.title);
	// 	// });

	// 	// //C2:Gui lai message thong trigger_success
	// 	// dispatcher.trigger("chat.hello", {
	// 	// 	title: 'chao ban',
	// 	// }, function(response){
	// 	// 	$scope.$apply(function(){
	// 	// 		$scope.message = response.title;
	// 	// 	});
	// 	// });


	// 	//C3: gui message va broadcast tu servier toi tat ca client
	// 	dispatcher.trigger("chat.chat", {
	// 		user: $scope.user,
	// 		content: $scope.message,
	// 	});
	// };

	// //C3: Dang ki su kien broadcast trong cach 3
	// dispatcher.bind("reply", function(data) {
	// 	$scope.$apply(function() {
	// 		$scope.messages.splice(0, 0, data);
	// 	});
	// });


}]);