app.factory('tickets',['$http','Auth', function($http, Auth){
  var object = {
    tickets: [],
  };

  object.getTickets = function(ticket_query) {

    for (var i = 0; i < object.tickets.length; i++) {
      clearviewTicket(object.tickets[i].ticket_id.$oid);
    };

    return $http.get('/tickets/'+ticket_query.date+'/'+ticket_query.branch_id).success(function(data){
      angular.copy(data, object.tickets);
      for (var i = 0; i < object.tickets.length; i++) {
        viewTicket(object.tickets[i]);
      };
    });
  };

  object.create = function(ticket){
    return $http.post('tickets.json', ticket).success(function(data){
      object.tickets.push(data);
      viewTicket(data);
    });
  };

  object.update = function(ticket_update){
    return $http.post('tickets/update.json',ticket_update).success(function(data){

      clearviewTicket(ticket_update.ticket_id);

      for (var i = 0; i < object.tickets.length; i++) {
        if (object.tickets[i].ticket_id.$oid == data.ticket_id.$oid) {
          object.tickets[i] = data;
          viewTicket(data);
          break;
        }
      };
    });
  };

  object.delete = function(ticket_id){
    return $http.delete('/tickets/'+ ticket_id).success(function(){

      clearviewTicket(ticket_id);

      for (var i = 0; i < object.tickets.length; i++) {
        if (object.tickets[i].ticket_id.$oid == ticket_id) {
          object.tickets.splice(i,1);
          break;
        }
      };
    });
  };

  object.update_view = function(){
    for (var i = 0; i < object.tickets.length; i++) {
      clearviewTicket(object.tickets[i].ticket_id.$oid);
      viewTicket(object.tickets[i]);
    };
  }

  function viewTicket(ticket){
    var begintime = object.change_time_to_float(ticket.begin_use_time.slice(11,16));
    if (ticket.begin_use_time.slice(0,10) == ticket.end_use_time.slice(0,10))
      var endtime = object.change_time_to_float(ticket.end_use_time.slice(11,16));
    else
      var endtime = 24.0;

    switch(begintime-Math.floor(begintime)){
      case 0.5:
      var ticket_td = $('td#td_'+Math.floor(begintime)+'_30_'+ticket.asset_id.$oid)[0]
      break;
      case 0.25:
      var ticket_td = $('td#td_'+Math.floor(begintime)+'_15_'+ticket.asset_id.$oid)[0]
      break;
      case 0.75:
      var ticket_td = $('td#td_'+Math.floor(begintime)+'_45_'+ticket.asset_id.$oid)[0]
      break;
      default:
      var ticket_td = $('td#td_'+begintime+'_'+ticket.asset_id.$oid)[0]
    }

    $('.calendar_content').append(
      $("<div id='"+ ticket.ticket_id.$oid + "' class='ticket ticket_new'><span> "+ ticket.user_name + " </span><br><span>" + ticket.user_phone + ", Gia: " + ticket.price + "</span></div>").click(function(event){
        $('#minibooking').css('display','none');
        $('div#ticket_temp').removeClass('ticket_new');
        $('#miniedit').css('display','inline');
        $('span#time_ticket').html(ticket.begin_use_time.slice(11,16)+ ' - '+ticket.end_use_time.slice(11,16));
        $('p#price_ticket').html('Gia: '+ ticket.price);
        $('p#ticket_id_hidden').html(ticket.ticket_id.$oid);
        var edit_top = event.pageY - $(window).scrollTop()- $('#miniedit').height() - event.offsetY -10;
        var edit_right = $(window).width() - event.pageX - $('#miniedit').width()/2;
        edit_top = edit_top>0? edit_top : 0;
        edit_right = edit_right>0? edit_right : 0;
        $('#miniedit').css({top: edit_top, right: edit_right});
      })
      );

    $('div#' + ticket.ticket_id.$oid).css({
      top: ticket_td.offsetTop+2,
      width: ticket_td.offsetWidth-3,
      left: ticket_td.offsetLeft,
      height: ticket_td.offsetHeight*4*(endtime-begintime)-5
    });

    switch(ticket.status) {
      case "new":
      if(Auth._currentUser != null && Auth._currentUser.role_name == "bussiness admin"){

        $('.calendar_content').append(
          $("<i class='fa fa-arrow-circle-o-right to_status_doing' id='" + ticket.ticket_id.$oid + "_i'></i>").click(function(){
            object.update({
              ticket_id: ticket.ticket_id.$oid,
              status: "doing"
            });
          })
          );

        $('i#' + ticket.ticket_id.$oid + '_i').css({
          top: ticket_td.offsetTop + $('div#' + ticket.ticket_id.$oid).height() -$('i#' + ticket.ticket_id.$oid + '_i').height(),
          left: ticket_td.offsetLeft + $('div#' + ticket.ticket_id.$oid).width()-$('i#' + ticket.ticket_id.$oid + '_i').width()
        });
      }
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

  function clearviewTicket(ticket_id){
    $('div#'+ ticket_id).remove();
    $('i#'+ ticket_id +'_i').remove();
  }

  object.hourtoview = function hourtoview(hour){
    if (hour-Math.floor(hour) > 0)
      return Math.floor(hour) + ':' + (hour-Math.floor(hour))*60;
    else
      return  Math.floor(hour)+ ':00';
  }

  object.change_time_to_float = function change_time_to_float(mytime){
    var time_split = mytime.split(":");
    return parseFloat(time_split[0]) + (parseFloat(time_split[1])/60.0);
  }
  return object;
}]);