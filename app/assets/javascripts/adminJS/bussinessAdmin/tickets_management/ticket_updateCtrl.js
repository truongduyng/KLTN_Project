app.controller('ticket_updateCtrl', ['$scope', '$http', 'tickets', 'ticket_id', 'branch', 'Auth', '$modal', 'dt', 'Flash', function($scope, $http, tickets, ticket_id, branch, Auth, $modal, dt, Flash){

  $scope.branch = branch;
  $scope.hour_begin_list = [];
  $scope.hour_end_list = [];
  $scope.dt = dt;
  var dt_now = new Date().toJSON().slice(0,10);

  for (var i = 0; i < tickets.tickets.length; i++) {
    if(tickets.tickets[i]._id.$oid == ticket_id){
      $scope.ticket = tickets.tickets[i];
      $scope.price = tickets.tickets[i].price;
      break;
    }
  }

  $scope.update_price = function(){
    $scope.price = tickets.calculate_price($scope.hour_begin,$scope.hour_end,branch, $scope.ticket.asset_id.$oid);
  }

  // build $scope.hour_end_list
  $scope.update_hour_end = function(firstrun){
    $scope.hour_end_list = [];
    var float_hour_begin = tickets.change_time_to_float($scope.hour_begin);
    var max_time_length = float_hour_begin + 4;

    for (var i = 0; i < tickets.tickets.length; i++) {
      if(tickets.tickets[i].asset_id.$oid == $scope.ticket.asset_id.$oid && tickets.tickets[i] != $scope.ticket){
        var begintime = tickets.change_time_to_float(tickets.tickets[i].begin_use_time.slice(11,16));
        if(float_hour_begin < begintime && begintime < max_time_length)
          max_time_length = begintime;
      }
    };

    for (var i = float_hour_begin+1; i <= max_time_length; i+=0.25) {
      if(i>24.0) break;
      $scope.hour_end_list.push(tickets.hourtoview(i));
    };
    if ($scope.hour_end_list.length) {

      if(firstrun){
        $scope.hour_end = tickets.hourtoview(hour_end);
      }
      else{
        $scope.hour_end = $scope.hour_end_list[0];
        $scope.price = tickets.calculate_price($scope.hour_begin,$scope.hour_end,branch, $scope.ticket.asset_id.$oid);
      }
      return true;
    }
    else{
      return false;
    }
  };


  var hour_begin = tickets.change_time_to_float($scope.ticket.begin_use_time.slice(11,16));
  var hour_end = tickets.change_time_to_float($scope.ticket.end_use_time.slice(11,16));

  var min_begin_time = 0;
  var max_end_time = 24;
  for (var i = 0; i < tickets.tickets.length; i++) {

    if(tickets.tickets[i].asset_id.$oid == $scope.ticket.asset_id.$oid && tickets.tickets[i]._id.$oid != $scope.ticket._id.$oid){

      var endtime = tickets.change_time_to_float(tickets.tickets[i].end_use_time.slice(11,16));
      var begintime = tickets.change_time_to_float(tickets.tickets[i].begin_use_time.slice(11,16));

      if(hour_begin >= endtime && endtime > min_begin_time)
        min_begin_time = endtime;
      if(hour_end <= begintime && begintime < max_end_time)
        max_end_time = begintime;
    }
  };

  for (var i = min_begin_time; i <= max_end_time -1; i+=0.25) {
    $scope.hour_begin_list.push(tickets.hourtoview(i));
  };
  if ($scope.hour_begin_list.length) {
    $scope.hour_begin = tickets.hourtoview(hour_begin);
  }
  $scope.update_hour_end(true);

  $scope.close_modal = function(){
    $scope.$close();
    $('#miniedit').css('display','none');
  };

  $scope.update_ticket = function(new_hour_begin, new_hour_end){
    Auth.currentUser().then(function(user) {
      var begintime = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate(),new_hour_begin.split(":")[0],new_hour_begin.split(":")[1]);
      var endtime = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate(),new_hour_end.split(":")[0],new_hour_end.split(":")[1]);
      tickets.update({
        ticket_id: ticket_id,
        begin_use_time: begintime,
        end_use_time: endtime,
        price: $scope.price
      });
      $scope.close_modal();

    }, function(error) {
      $modal.open({
        templateUrl: 'appJS/auth/_login.html',
        controller: 'authCtrl'
      });
    });
  }

}]);