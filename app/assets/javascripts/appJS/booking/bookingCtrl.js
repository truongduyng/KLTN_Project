app.factory('tickets',['$http',function($http){
  var object = {
    tickets: []
  };
  object.getTickets = function(ticket_query) {
    return $http.get('/tickets/'+ticket_query.date+'/'+ticket_query.branch_id).success(function(data){
      console.log(data);
      angular.copy(data, object.posts);
    });
  };
  object.create = function(ticket){
    return $http.post('tickets.json', ticket).success(function(data){
      object.tickets.push(data);
    });
  };
  return object;
}]);

app.controller('bookingCtrl', ['$scope', '$http','$stateParams', 'Auth', '$modal','tickets', function($scope, $http, $stateParams, Auth, $modal, tickets){
  $scope.rate = 4;
  $scope.isReadonly = false;
  $scope.minibooking = false;
  $scope.miniedit = false;
  $scope.tickets = tickets.tickets;
  $scope.dt = new Date();

  $http.get("/"+$stateParams.branch_url_alias).success(function(data){
    if (data != null){
      $scope.branch = data;
      console.log($scope.branch);
      getticketsandshow($scope.dt,$scope.branch.branch._id.$oid);
      console.log($scope.tickets);
      $scope.isfounddata = true;
    }
    else
    {
      $scope.isfounddata = false;
    }
  });

  function getticketsandshow(date, branch_id){
    tickets.getTickets({date: date.toJSON().slice(0,10), branch_id: branch_id});
  };

  $scope.date_change = function(){
    getticketsandshow($scope.dt,$scope.branch.branch._id.$oid);
  };

  $scope.hoveringOver = function(value) {
    $scope.overstar = value;
    $scope.ishoverstar = true;
  };

  $scope.fast_book_open = function(hour,asset_id,event) {
    Auth.currentUser().then(function(user) {
      //repair data
      repair_data(hour, asset_id, user)
      // display dialog booking
      display_booking_dialog(hour, asset_id, event);
    }, function(error) {
      //not yet sign in
      $scope.user = null;
      alert("Ban can dang nhap de dat san!");
      $modal.open({
        templateUrl: 'appJS/auth/_login.html',
        controller: 'authCtrl'
      });
    });
  };

  function repair_data(hour, asset_id, user){
    clear_current_display();
    $scope.user = user;
    $scope.asset_id = asset_id;
    if(hour>Math.floor(hour))
    {
      $scope.hour_begin = Math.floor(hour) + ":30";
      $scope.hour_end = Math.ceil(hour) + ":30";
      $scope.current_td_id_1 = '#td_'+Math.floor(hour)+'_half_'+ asset_id;
      $scope.current_td_id_2 = '#td_'+(Math.floor(hour)+1)+'_'+ asset_id;
    }
    else
    {
      $scope.hour_begin = hour + ":00";
      $scope.hour_end = (hour + 1) + ":00";
      $scope.current_td_id_1 = '#td_'+hour+'_'+ asset_id;
      $scope.current_td_id_2 = '#td_'+hour+'_half_'+ asset_id;
    }
    $scope.price = calculate_price(hour,asset_id);
  }

  function clear_current_display(){
    $($scope.current_td_id_1).css("background-color", "#FFFFFF");
    $($scope.current_td_id_1).html("");
    $($scope.current_td_id_2).css("background-color", "#FFFFFF");
  }

  function calculate_price(hour,asset_id){
    for(i=0; i<$scope.branch.assets.length; i++){
      if($scope.branch.assets[i]._id.$oid == asset_id){
        for(j=0; j<$scope.branch.asset_categories.length; j++){
          if($scope.branch.asset_categories[j]._id.$oid == $scope.branch.assets[i].asset_category_id.$oid){
            for(t=0;t<$scope.branch.asset_categories[j].fees.length;t++){
              var begin_time_fee = change_time_to_float($scope.branch.asset_categories[j].fees[t].begin_time);
              var end_time_fee = change_time_to_float($scope.branch.asset_categories[j].fees[t].end_time);
              if (begin_time_fee<=hour && hour < end_time_fee){
                if(hour+1 <= end_time_fee){
                  return $scope.branch.asset_categories[j].fees[t].price;
                }
                else{
                  return $scope.branch.asset_categories[j].fees[t].price/2 + $scope.branch.asset_categories[j].fees[t+1].price/2;
                }
              }
            }
          }
        }
      }
    }
  }

  function change_time_to_float(mytime){
    var time_split = mytime.split(":");
    if (time_split[1] == "30"){
      return parseFloat(time_split[0])+0.5;
    }
    else{
      return parseFloat(time_split[0]);
    }
  }

  function display_booking_dialog(hour,asset_id,event){
    $($scope.current_td_id_1).css("background-color", "#8ED763");
    $($scope.current_td_id_1).html($scope.hour_begin+'-'+$scope.hour_end);
    $($scope.current_td_id_2).css("background-color", "#8ED763");
    $scope.minibooking = true;
    var booking_height = $('.minibooking').height()>0? $('.minibooking').height(): 165;
    var booking_top = event.pageY - $(window).scrollTop()- booking_height-30  ;
    var booking_right = $(window).width() - event.pageX - 200;
    booking_top = booking_top>0? booking_top : 0;
    booking_right = booking_right>0? booking_right :0;
    $('.minibooking').css({top: booking_top, right: booking_right});
  }

  $scope.close_minibooking = function(){
    $scope.minibooking = false;
    clear_current_display();
  };

  $scope.ticket_create = function(dt,hour_begin,hour_end){
    var begintime = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate(),hour_begin.split(":")[0],hour_begin.split(":")[1]);
    console.log(begintime);
    var endtime = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate(),hour_end.split(":")[0],hour_end.split(":")[1]);
    tickets.create({
      begin_use_time:begintime,
      end_use_time:endtime,
      price:$scope.price,
      status: "new",
      branch_id: $scope.branch.branch._id.$oid,
      asset_id: $scope.asset_id,
    });
    $scope.minibooking = false;
  };
}]);