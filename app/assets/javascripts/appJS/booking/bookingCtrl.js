app.controller('bookingCtrl', ['$scope', '$http', 'Auth', '$modal', 'tickets','branch', '$interval', function($scope, $http, Auth, $modal, tickets, branch, $interval){
  $scope.rate = 4;
  $scope.isReadonly = false;
  $scope.dt = new Date();
  $scope.showtimeline = true;
  $scope.td_height = 20; //height of td

  Auth.currentUser().then(function(user) {
    $scope.user = user;
  }, function(error) {
  });

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
    if ($scope.dt.getDate() == new Date().getDate())
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

  function repair_data(hour, asset_id, user){
    $scope.asset_id = asset_id;
    $scope.hour_begin = tickets.hourtoview(hour);
    $scope.hour_end_list = [];

    var max_time_length = hour + 4;
    var timenow = tickets.change_time_to_float(new Date().getHours() + ':' + new Date().getMinutes());
    if ((hour-timenow) < -10.0/60 && $scope.dt.toJSON().slice(0,10) == new Date().toJSON().slice(0,10) || $scope.dt.toJSON().slice(0,10) < new Date().toJSON().slice(0,10)) return false;


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
      $scope.price = calculate_price();
      return true;
    }
    else{
      return false;
    }
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
            return Math.ceil(result_price);
          }
        }
      }
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
    $scope.price = calculate_price();
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
      tickets.create({
        begin_use_time: begintime,
        end_use_time: endtime,
        price: $scope.price,
        status: "new",
        branch_id: $scope.branch.branch._id.$oid,
        asset_id: $scope.asset_id,
      });
      $scope.close_minibooking();
    }, function(error) {
      alert("Ban can dang nhap de dat san!");
      $modal.open({
        templateUrl: 'appJS/auth/_login.html',
        controller: 'authCtrl'
      });
    });
  };

  $scope.ticket_delete = function(ticket_id){
    Auth.currentUser().then(function(user) {
      tickets.delete($('p#ticket_id_hidden').html());
      $scope.close_miniedit();
    }, function(error) {
      alert("Ban can dang nhap de huy!");
      $modal.open({
        templateUrl: 'appJS/auth/_login.html',
        controller: 'authCtrl'
      });
    });
  };

  $scope.ticket_edit = function(){
    var ticket_update = $modal.open({
      templateUrl: "appJS/ticket/_ticket_update.html",
      controller: "ticketCtrl",
      resolve: {
        ticket_id: function(){
          return $('p#ticket_id_hidden').html();
        },
        branch: function(){
          return $scope.branch;
        }
      }
    });
  };

  $scope.showtimeintd = function(hour,element,show){
    $td = $(element.currentTarget)
    $th = $td.closest('table').find('th').eq($td.index()+1);
    if(show){
      $(element.currentTarget).css('background-color','#eeeeee');
      $(element.currentTarget).html('<strong>'+ $th.html() +'</strong>'+', '+'<strong>'+ tickets.hourtoview(hour) + '</strong>');
    }
    else{
      $(element.currentTarget).css('background-color','white');
      $(element.currentTarget).html("");
    }
  }

  $scope.hoveringOver = function(value) {
    $scope.overstar = value;
    $scope.ishoverstar = true;
  };

  //Timeline---------------------------------------------------------------
  if($scope.branch.assets.length * 160 > $('.calendar_content').width())
    $('.tablebooking').css({width: $scope.branch.assets.length * 160}); //160 is width of a td in style

  var scrollheight = $scope.td_height*4*(24-0);
  $('hr.timeline').css({width: $('div.calendar_content').get(0).scrollWidth});

  var top_timeline = 23 + Math.floor((parseInt($scope.dt.getHours())*60+parseInt($scope.dt.getMinutes()))*scrollheight/(60*24)); // 23 is height of th
  $('hr.timeline').animate({top: top_timeline},'fast');

  $interval(function(){
    top_timeline += Math.floor(5/(60*24)*scrollheight);

    if (top_timeline >= scrollheight)
      top_timeline = 23 + Math.floor((parseInt($scope.dt.getHours())*60+parseInt($scope.dt.getMinutes()))*scrollheight/(60*24));
    $('hr.timeline').animate({top: top_timeline},'fast');
  },1000*60*5);
}]);
