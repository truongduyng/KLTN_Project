app.controller('ticketCtrl', ['$scope', '$http', 'tickets', 'ticket_id', 'branch', 'Auth', '$modal', 'dt', function($scope, $http, tickets, ticket_id, branch, Auth, $modal, dt){

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
    $scope.price = calculate_price();
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
        $scope.update_price();
      }
      return true;
    }
    else{
      return false;
    }
  };

  //================================================================================
  var timenow = dt.toJSON().slice(0,10) == dt_now? tickets.change_time_to_float(new Date().getHours() + ':' + new Date().getMinutes()) : dt.toJSON().slice(0,10) < dt_now? 24 : 0 ;

  var hour_begin = tickets.change_time_to_float($scope.ticket.begin_use_time.slice(11,16));
  var hour_end = tickets.change_time_to_float($scope.ticket.end_use_time.slice(11,16));

  if (hour_begin-timenow < -10.0/60 ) {
    $scope.hour_begin_list.push(tickets.hourtoview(hour_begin));
    $scope.hour_begin = $scope.hour_begin_list[0];
    $scope.hour_end_list.push(tickets.hourtoview(hour_end));
    $scope.hour_end = $scope.hour_end_list[0];
  } else {
    // build time data
    var min_begin_time = customroundtime(timenow);
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
  }
  //===================================================================================

  function customroundtime(time){
    var fraction = time - Math.floor(time);
    return fraction > 0.5? fraction > 0.75? Math.ceil(time):Math.floor(time)+0.5 : fraction > 0.25? Math.floor(time)+0.5:Math.floor(time);
  }
  //=====================================================================================

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

  $scope.update_ticket = function(new_hour_begin, new_hour_end){
    Auth.currentUser().then(function(user) {

      if (user.role_name == 'user'){
        if ( hour_begin-timenow < -10.0/60) {
          alert("Khong the cap nhat ve da qua");
          $scope.close_modal();
          return false;
        }

        if($scope.ticket.user_id == null || $scope.ticket.user_id.$oid != Auth._currentUser._id.$oid){
          alert('Khong the cap nhat ve cua ng khac');
          $scope.close_modal();
          return false;
        }
      }

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
      var message = '<strong>Gruh!</strong>Ban can dang nhap de cap nhat lich dat!';
      $modal.open({
        templateUrl: 'appJS/auth/_login.html',
        controller: 'authCtrl',
        resolve: {
          message: function(){
            return message;
          }
        }
      });
    });
}

}]);