app.controller('ticketCtrl', ['$scope', '$http', 'tickets', 'ticket_id', 'branch', 'Auth', function($scope, $http, tickets, ticket_id, branch, Auth){

  Auth.currentUser().then(function(user) {
    $scope.user = user;
  }, function(error) {
  });
  $scope.branch = branch;
  $scope.hour_begin_list = [];
  $scope.dt = new Date();
  for (var i = 0; i < tickets.tickets.length; i++) {
    if(tickets.tickets[i].ticket_id.$oid == ticket_id){
      $scope.ticket = tickets.tickets[i];
      $scope.price = tickets.tickets[i].price;
      break;
    }
  }
  // build time data
  var hour_begin = tickets.change_time_to_float($scope.ticket.begin_use_time.slice(11,16));
  var hour_end = tickets.change_time_to_float($scope.ticket.end_use_time.slice(11,16));
  var min_begin_time = 0;
  var max_end_time = 24;
  for (var i = 0; i < tickets.tickets.length; i++) {
    if(tickets.tickets[i].asset_id.$oid == $scope.ticket.asset_id.$oid){
      var endtime = tickets.change_time_to_float(tickets.tickets[i].end_use_time.slice(11,16));
      var begintime = tickets.change_time_to_float(tickets.tickets[i].begin_use_time.slice(11,16));
      if(hour_begin > endtime && endtime > min_begin_time)
        min_begin_time = endtime;
      if(hour_end < begintime && begintime < max_end_time)
        max_end_time = begintime;
    }
  };

  for (var i = min_begin_time; i <= max_end_time -1; i+=0.25) {

    $scope.hour_begin_list.push(tickets.hourtoview(i));
  };
  if ($scope.hour_begin_list.length) {
    for (var i = 0; i < $scope.hour_begin_list.length; i++) {
      if(tickets.change_time_to_float($scope.hour_begin_list[i]) == hour_begin){
        $scope.hour_begin = $scope.hour_begin_list[i];
        break;
      }
    };
  }
  //===================================================================================
  $scope.update_price = function(){
    $scope.price = calculate_price();
  }
  //=====================================================================================
  // build $scope.hour_end_list
  $scope.update_hour_end = function(firstrun){
    $scope.hour_end_list = [];
    var hour_begin = tickets.change_time_to_float($scope.hour_begin);
    var max_time_length = hour_begin + 4;
    for (var i = 0; i < tickets.tickets.length; i++) {
      if(tickets.tickets[i].asset_id.$oid == $scope.ticket.asset_id.$oid && tickets.tickets[i] != $scope.ticket){
        var begintime = tickets.change_time_to_float(tickets.tickets[i].begin_use_time.slice(11,16));
        if(hour_begin < begintime && begintime < max_time_length)
          max_time_length = begintime;
      }
    };
    for (var i = hour_begin+1; i <= max_time_length; i+=0.25) {
      if(i>24.0) break;
      $scope.hour_end_list.push(tickets.hourtoview(i));
    };
    if ($scope.hour_end_list.length) {
      if(firstrun){
        for (var i = 0; i < $scope.hour_end_list.length; i++) {
          if(tickets.change_time_to_float($scope.hour_end_list[i])==tickets.change_time_to_float($scope.ticket.end_use_time.slice(11,16)))
          $scope.hour_end = $scope.hour_end_list[i];
        }
      } else{
        $scope.hour_end = $scope.hour_end_list[0];
      }
      $scope.update_price();
      return true;
    }
    else{
      return false;
    }
  };
  $scope.update_hour_end(true);
  //=======================================================================================

  function calculate_price(){
    var hbegin = tickets.change_time_to_float($scope.hour_begin);
    var hend = tickets.change_time_to_float($scope.hour_end);

    for(i=0; i<$scope.branch.assets.length; i++){
      if($scope.branch.assets[i]._id.$oid == $scope.ticket.asset_id.$oid){
        for(j=0; j<$scope.branch.asset_categories.length; j++){
          if($scope.branch.asset_categories[j]._id.$oid == $scope.branch.assets[i].asset_category_id.$oid){
            var result_price = 0;
            for(t=0;t<$scope.branch.asset_categories[j].fees.length;t++){
              var begin_time_fee = tickets.change_time_to_float($scope.branch.asset_categories[j].fees[t].begin_time);
              var end_time_fee = tickets.change_time_to_float($scope.branch.asset_categories[j].fees[t].end_time);
              if (begin_time_fee<=hbegin && hbegin < end_time_fee){
                if(hend <= end_time_fee){
                  result_price += $scope.branch.asset_categories[j].fees[t].price*(hend-hbegin);
                }
                else{
                  result_price += $scope.branch.asset_categories[j].fees[t].price*(end_time_fee-hbegin);
                  hbegin = end_time_fee;
                }
              }
            }
            return Math.ceil(result_price);
          }
        }
      }
    }
  }

  $scope.close_modal = function(){
    $scope.$close();
    $('#miniedit').css('display','none');
  };

  $scope.update_ticket = function(dt, hour_begin, hour_end){
    Auth.currentUser().then(function(user) {
      var begintime = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate(),hour_begin.split(":")[0],hour_begin.split(":")[1]);
      var endtime = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate(),hour_end.split(":")[0],hour_end.split(":")[1]);
      tickets.update({
        ticket_id: ticket_id,
        begin_use_time: begintime,
        end_use_time: endtime,
        price: $scope.price
      });
      $scope.close_modal();
    }, function(error) {
      alert("Ban can dang nhap de cap nhat lich dat!");
      $modal.open({
        templateUrl: 'appJS/auth/_login.html',
        controller: 'authCtrl'
      });
    });
  }

}]);