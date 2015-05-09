app.factory('tickets',['$http',function($http){
  var object = {
    tickets: [],
  };

  object.getTickets = function(ticket_query) {
    clearviewTickets();
    return $http.get('/tickets/'+ticket_query.date+'/'+ticket_query.branch_id).success(function(data){
      angular.copy(data, object.tickets);
      for (var i = 0; i < object.tickets.length; i++) {
        viewTickets(object.tickets[i]);
      };
    });
  };

  object.create = function(ticket){
    return $http.post('tickets.json', ticket).success(function(data){
      object.tickets.push(data);
      viewTickets(data);
    });
  };

  function viewTickets(ticket){
    var begintime = object.change_time_to_float(ticket.begin_use_time.slice(11,16));
    var endtime = object.change_time_to_float(ticket.end_use_time.slice(11,16));

    if(begintime>Math.floor(begintime)){
      ticket_td = $('td#td_'+Math.floor(begintime)+'_half_'+ticket.asset_id.$oid)[0]
    }
    else{
      ticket_td = $('td#td_'+begintime+'_'+ticket.asset_id.$oid)[0]
    }

    $('.calendar_content').append(
      $("<div id='"+ ticket.ticket_id.$oid + "' class='ticket ticket_new'><span> "+ ticket.user_name + " </span><br><span>" + ticket.user_phone + ", Gia: " + ticket.price + "</span></div>").click(function(event){

        $('#minibooking').css('display','none');
        $('div#ticket_temp').removeClass('ticket_new');
        $('#miniedit').css('display','inline');
        $('span#time_ticket').html('Thoi gian: '+ticket.begin_use_time.slice(11,16)+ ' - '+ticket.end_use_time.slice(11,16));
        $('p#price_ticket').html('Gia: '+ ticket.price);
        var edit_top = event.pageY - $(window).scrollTop()- $('#miniedit').height() - event.offsetY -10;
        var edit_right = $(window).width() - event.pageX - $('#miniedit').width()/2;
        edit_top = edit_top>0? edit_top : 0;
        edit_right = edit_right>0? edit_right : 0;
        $('#miniedit').css({top: edit_top, right: edit_right});
      })
      );

    $('div#'+ticket.ticket_id.$oid).css({'top': ticket_td.offsetTop,'width': ticket_td.offsetWidth-3, 'left': ticket_td.offsetLeft,'height': ticket_td.offsetHeight*2*(endtime-begintime)-3});

    switch(ticket.status) {
      case "new":
      $('div#'+ticket.ticket_id.$oid).addClass('ticket_new');
      break;
      case "doing":
      $('div#'+ticket.ticket_id.$oid).addClass('ticket_doing');
      break;
      case "over":
      $('div#'+ticket.ticket_id.$oid).addClass('ticket_over');
      break;
      case "waiting":
      $('div#'+ticket.ticket_id.$oid).addClass('ticket_waiting');
      break;
      case "done":
      $('div#'+ticket.ticket_id.$oid).addClass('ticket_done');
      break;
    }
  }

  function clearviewTickets(){
    for(i=0; i < object.tickets.length; i++){
      $('div#'+ object.tickets[i].ticket_id.$oid).remove();
    }
  }

  object.hourtoview = function hourtoview(hour){
    if(hour>Math.floor(hour))
    {
      return  Math.floor(hour)+ ':30'
    }
    else
    {
      return hour + ':00'
    }
  }

  object.change_time_to_float = function change_time_to_float(mytime){
    var time_split = mytime.split(":");
    if (time_split[1] == "30"){
      return parseFloat(time_split[0])+0.5;
    }
    else{
      return parseFloat(time_split[0]);
    }
  }

  return object;
}]);

app.controller('bookingCtrl', ['$scope', '$http','$stateParams', 'Auth', '$modal','tickets', 'branch', function($scope, $http, $stateParams, Auth, $modal, tickets, branch){
  $scope.rate = 4;
  $scope.isReadonly = false;
  $scope.tickets = tickets.tickets;
  $scope.dt = new Date();
  if (branch.data != "null"){
    $scope.branch = branch.data;
    tickets.getTickets({date: $scope.dt.toJSON().slice(0,10), branch_id: $scope.branch.branch._id.$oid});
    $scope.isfounddata = true;
  } else {
    $scope.isfounddata = false;
  }

  $scope.date_change = function(){
    $scope.close_minibooking();
    $scope.close_miniedit();
    tickets.getTickets({date: $scope.dt.toJSON().slice(0,10), branch_id: $scope.branch.branch._id.$oid});
  };

  $scope.update_tickets = function update_tickets(){

  };

  $scope.fast_book_open = function(hour,asset_id,event){
    Auth.currentUser().then(function(user) {
      //repair data
      repair_data(hour, asset_id, user)
      // display dialog booking
      display_booking_dialog(hour, event);
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
    $scope.user = user;
    $scope.asset_id = asset_id;
    $scope.hour_begin = tickets.hourtoview(hour);
    $scope.hour_end_list = [];
    for (var i = 1; i <= 4; i+=0.5) {
      if(hour+i>24.0) break;
      $scope.hour_end_list.push(tickets.hourtoview(hour+i));
    };
    $scope.hour_end = $scope.hour_end_list[0];
    $scope.price = calculate_price();
  }

  $scope.update_hour_end = function(){
    var hbegin = tickets.change_time_to_float($scope.hour_begin);
    var hend = tickets.change_time_to_float($scope.hour_end);
    $scope.price = calculate_price();
    $('div#ticket_temp').css('height', $scope.ticket_heigth*2*(hend-hbegin)-3);
  }

  function calculate_price(){
    var hbegin = tickets.change_time_to_float($scope.hour_begin);
    var hend = tickets.change_time_to_float($scope.hour_end);
    for(i=0; i<$scope.branch.assets.length; i++){
      if($scope.branch.assets[i]._id.$oid == $scope.asset_id){
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
            return result_price;
          }
        }
      }
    }
  }

  function display_booking_dialog(hour,event){
    if(hour < 23.5){
      $scope.ticket_heigth = event.currentTarget.offsetHeight;
      $('div#ticket_temp').css({'top': event.currentTarget.offsetTop,'width': event.currentTarget.offsetWidth-3, 'left': event.currentTarget.offsetLeft,'height': $scope.ticket_heigth*2-3});
      $('div#ticket_temp').addClass('ticket_new');
      $('#minibooking').css('display','inline');
      $scope.close_miniedit();
      var booking_height = $('#minibooking').height()>0? $('#minibooking').height(): 165;
      var booking_top = event.pageY - $(window).scrollTop()- booking_height-30  ;
      var booking_right = $(window).width() - event.pageX - 200;
      booking_top = booking_top>0? booking_top : 0;
      booking_right = booking_right>0? booking_right :0;
      $('#minibooking').css({top: booking_top, right: booking_right});
    }
  }

  $scope.close_minibooking = function(){
    $('#minibooking').css('display','none');
    $('div#ticket_temp').removeClass('ticket_new');
  };

  $scope.close_miniedit = function(){
    $('#miniedit').css('display','none');
  }

  $scope.ticket_create = function(dt,hour_begin,hour_end){
    var begintime = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate(),hour_begin.split(":")[0],hour_begin.split(":")[1]);
    var endtime = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate(),hour_end.split(":")[0],hour_end.split(":")[1]);
    tickets.create({
      begin_use_time:begintime,
      end_use_time:endtime,
      price:$scope.price,
      status: "new",
      branch_id: $scope.branch.branch._id.$oid,
      asset_id: $scope.asset_id,
    });
    $scope.close_minibooking();
  };

  $scope.ticket_edit = function(){
    alert('dsada');
  }

  $scope.ticket_delete = function(){
    alert('ddddddd');
  }

  $scope.hoveringOver = function(value) {
    $scope.overstar = value;
    $scope.ishoverstar = true;
  };
}]);