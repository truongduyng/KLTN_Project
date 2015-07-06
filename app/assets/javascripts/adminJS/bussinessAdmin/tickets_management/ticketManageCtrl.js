app.controller('ticketManageCtrl', ['$scope', '$http', 'Auth', '$modal', 'tickets','branch', '$interval','Flash', function($scope, $http, Auth, $modal, tickets, branch, $interval, Flash){
  $scope.rate = 4;
  $scope.isReadonly = false;
  $scope.dt = new Date();
  $scope.dt_end_everyweek_booking = $scope.dt;
  $scope.showtimeline = true;
  $scope.td_height = 20; //height of td

  if (branch.data != null){
    $scope.branch = branch.data;

    tickets.channel =  tickets.dispatcher.subscribe($scope.branch.branch._id.$oid);
    tickets.getTickets({date: $scope.dt.toJSON().slice(0,10), branch_id: $scope.branch.branch._id.$oid});

    $scope.work_time = []
    for (var i = tickets.change_time_to_float($scope.branch.branch.begin_work_time); i < tickets.change_time_to_float($scope.branch.branch.end_work_time); i++) {
      $scope.work_time.push(i);
    };

    $scope.isfounddata = true;
    timeline();
  } else {
    $scope.isfounddata = false;
  }

  $scope.date_change = function(){
    $scope.close_minibooking();
    $scope.close_miniedit();
    $scope.dt_end_everyweek_booking = $scope.dt;
    if ($scope.dt.toJSON().slice(0,10) == new Date().toJSON().slice(0,10))
      $scope.showtimeline = true;
    else
      $scope.showtimeline = false;
    tickets.getTickets({date: $scope.dt.toJSON().slice(0,10), branch_id: $scope.branch.branch._id.$oid});
  };

  $scope.fast_book_open = function(hour,asset_id,event){
    //repair data
    if (repair_data(hour, asset_id)) {
      // display dialog booking
      display_booking_dialog(hour, event);
    }
    else{
      $scope.close_minibooking();
    }
  };

  function repair_data(hour, asset_id){
    $scope.asset_id = asset_id;
    $scope.hour_begin = tickets.hourtoview(hour);
    $scope.hour_end_list = [];

    var max_time_length = hour + 4;
    for (var i = 0; i < tickets.tickets.length; i++) {
      if(tickets.tickets[i].asset_id.$oid == asset_id){
        var begintime = tickets.change_time_to_float(tickets.tickets[i].begin_use_time.slice(11,16));
        var endtime = tickets.change_time_to_float(tickets.tickets[i].end_use_time.slice(11,16));
        if(begintime <= hour && hour < endtime) return false;
        if(hour < begintime && begintime < max_time_length)
          max_time_length = begintime;
      }
    };

    for (var i = hour+1; i <= max_time_length; i+=0.25) {
      if(i>24.0) break;
      $scope.hour_end_list.push(tickets.hourtoview(i));
    };

    if ($scope.hour_end_list.length) {
      $scope.hour_end = $scope.hour_end_list[0];
      $scope.price = tickets.calculate_price($scope.hour_begin,$scope.hour_end,$scope.branch, $scope.asset_id);
      return true;
    }
    else{
      return false;
    }
  }

  function display_booking_dialog(hour,element){
    if(hour < 23.5){
      $scope.showtimeintd(hour, element, false); //clear content in td

      $('div#ticket_temp').css({'top': element.currentTarget.offsetTop,'width': element.currentTarget.offsetWidth-3, 'left': element.currentTarget.offsetLeft,'height': $scope.td_height*4-3});
      $('div#ticket_temp').addClass('ticket_new');
      $('#minibooking').css('display','inline');
      $scope.close_miniedit();

      var booking_height = $('#minibooking').height()>0? $('#minibooking').height(): 165;
      var booking_top = element.pageY - $(window).scrollTop()- booking_height-30  ;
      var booking_right = $(window).width() - element.pageX - 200;
      booking_top = booking_top>0? booking_top : 0;
      booking_right = booking_right>0? booking_right :0;
      $('#minibooking').css({top: booking_top, right: booking_right});
    }
  }

  $scope.update_hour_end = function(){
    var hbegin = tickets.change_time_to_float($scope.hour_begin);
    var hend = tickets.change_time_to_float($scope.hour_end);
    $scope.price = tickets.calculate_price($scope.hour_begin,$scope.hour_end,$scope.branch, $scope.asset_id);
    $('div#ticket_temp').css('height', $scope.td_height*4*(hend-hbegin)-3);
  }

  $scope.close_minibooking = function(){
    $('#minibooking').css('display','none');
    $('div#ticket_temp').removeClass('ticket_new');
  };

  $scope.close_miniedit = function(){
    $('#miniedit').css('display','none');
  };

  $scope.ticket_create = function(dt,hour_begin,hour_end){
    Auth.currentUser().then(function(user) {
      var begintime = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate(),hour_begin.split(":")[0],hour_begin.split(":")[1]);
      var endtime = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate(),hour_end.split(":")[0],hour_end.split(":")[1]);

      if(isNaN($scope.customer_phone) || !$scope.customer_phone.match(/^\d{10,11}$/)){
        var message = '<strong>Hey!</strong> Số điện thoại chưa chính xác.';
        Flash.create('danger', message, 'myalert');
        return false;
      }

      if ($scope.customer_name == null) {
        $scope.customer_name = "Khách";
      }

      $scope.dt_end_everyweek_booking.setHours(23,59,59,999);

      tickets.create({
        begin_use_time: begintime,
        end_use_time: endtime,
        price: $scope.price,
        status: "new",
        branch_id: $scope.branch.branch._id.$oid,
        asset_id: $scope.asset_id,
        customer_name: $scope.customer_name,
        customer_phone: $scope.customer_phone,
        date_end_everyweek_booking: $scope.dt_end_everyweek_booking
      });

      $scope.close_minibooking();
      $scope.iseveryweek = false;
      $('div.everyweek').css('display', 'none');
      $scope.customer_name = null;
      $scope.customer_phone = null;
      $scope.dt_end_everyweek_booking = $scope.dt;

    }, function(error) {
      $modal.open({
        templateUrl: 'appJS/auth/_login.html',
        controller: 'authCtrl'
      });
    });
};

$scope.ticket_delete = function(){
  Auth.currentUser().then(function(user) {
    tickets.delete($('p#ticket_id_hidden').html());
    $scope.close_miniedit();
  }, function(error) {
    $modal.open({
      templateUrl: 'appJS/auth/_login.html',
      controller: 'authCtrl'
    });
  });
};

$scope.ticket_edit = function(){
  var ticket_update = $modal.open({
    templateUrl: "adminJS/bussinessAdmin/tickets_management/_ticket_update.html",
    controller: "ticket_updateCtrl",
    resolve: {
      ticket_id: function(){
        return $('p#ticket_id_hidden').html();
      },
      branch: function(){
        return $scope.branch;
      },
      dt: function(){
        return $scope.dt;
      }
    }
  });
};

$scope.open = function($event) {
  $event.preventDefault();
  $event.stopPropagation();
  $scope.opened = true;
};

$scope.viewweekbooking = function(){
  if ($scope.iseveryweek)
    $('div.everyweek').css('display', 'inline');
  else
    $('div.everyweek').css('display', 'none');
}

var previouscolor = '';
$scope.showtimeintd = function(hour,element,show){
  $td = $(element.currentTarget);
  $th = $td.closest('table').find('th').eq($td.index()+1);
  if(show){
    previouscolor = $(element.currentTarget).css('background-color');
    $(element.currentTarget).css('background-color','#6ea6bf');
    $(element.currentTarget).html('<strong>'+ $th.html() +'</strong>'+', '+'<strong>'+ tickets.hourtoview(hour) + '</strong>');
  }
  else{
    $(element.currentTarget).css('background-color',previouscolor);
    $(element.currentTarget).html("");
  }
}

  //Real time -------------------------------------------------------------
  tickets.channel.bind('create_ticket', function(ticket) {
    if ($scope.dt.toJSON().slice(0,10) == ticket.begin_use_time.slice(0,10)){
      tickets.tickets.push(ticket);
      tickets.viewTicket(ticket);
    }
  });

  tickets.channel.bind('update_ticket', function(ticket) {
    if ($scope.dt.toJSON().slice(0,10) == ticket.begin_use_time.slice(0,10)){
      tickets.clearviewTicket(ticket._id.$oid);
      for (var i = 0; i < tickets.tickets.length; i++) {
        if (tickets.tickets[i]._id.$oid == ticket._id.$oid) {
          tickets.tickets[i] = ticket;
          tickets.viewTicket(ticket);
          break;
        }
      };
    }
  });

  tickets.channel.bind('delete_ticket', function(ticket_id) {

    tickets.clearviewTicket(ticket_id);
    for (var i = 0; i < tickets.tickets.length; i++) {
      if (tickets.tickets[i]._id.$oid == ticket_id) {
        tickets.tickets.splice(i,1);
        break;
      }
    };

  });

  //Timeline---------------------------------------------------------------
  function timeline(){

    if($scope.branch.assets.length * 170 < $('.calendar_content').width()){
      $('.tablebooking').css({width: $('.calendar_content').width()});
    }else{
      $('.tablebooking').css({width: 50 + $scope.branch.assets.length * 170});
    }

    var work_time_length = $scope.work_time[$scope.work_time.length-1]-$scope.work_time[0];

    var scrollheight = $scope.td_height * 4 * work_time_length;
    $('hr.timeline').css({width: $('.tablebooking').width()});

    var top_timeline = 23 + Math.floor((parseInt($scope.dt.getHours())*60+parseInt($scope.dt.getMinutes()) - $scope.work_time[0]*60)*scrollheight/(60*work_time_length)); // 23 is height of th

    $('hr.timeline').animate({top: top_timeline},'fast');

    $interval(function(){
      top_timeline += Math.floor(5/(60*work_time_length)*scrollheight);

      if (top_timeline >= scrollheight)
        top_timeline = scrollheight;
      $('hr.timeline').animate({top: top_timeline},'fast');
      tickets.check_td_in_past(new Date().toJSON().slice(0,10));
      tickets.check_ticket_status(new Date());
    },1000*60);
  }
}]);
