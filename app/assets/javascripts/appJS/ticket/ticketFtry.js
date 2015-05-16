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

  object.update = function(ticket_update){
    return $http.post('tickets/update.json',ticket_update).success(function(data){
      $('div#'+ ticket_update.ticket_id).remove();
      for (var i = 0; i < object.tickets.length; i++) {
        if (object.tickets[i].ticket_id.$oid == ticket_update.ticket_id) {
          object.tickets[i] = data;
          viewTickets(data);
          break;
        }
      };
    });
  };

  object.delete = function(ticket_id){
    return $http.delete('/tickets/'+ ticket_id).success(function(){
      $('div#'+ ticket_id).remove();
      for (var i = 0; i < object.tickets.length; i++) {
        if (object.tickets[i].ticket_id.$oid == ticket_id) {
          object.tickets.splice(i,1);
          break;
        }
      };
    });
  };

  function viewTickets(ticket){
    var begintime = object.change_time_to_float(ticket.begin_use_time.slice(11,16));
    var endtime = object.change_time_to_float(ticket.end_use_time.slice(11,16));
    console.log(ticket.end_use_time.slice(11,16));

    switch(begintime-Math.floor(begintime)){
      case 0.5:
      ticket_td = $('td#td_'+Math.floor(begintime)+'_30_'+ticket.asset_id.$oid)[0]
      break;
      case 0.25:
      ticket_td = $('td#td_'+Math.floor(begintime)+'_15_'+ticket.asset_id.$oid)[0]
      break;
      case 0.75:
      ticket_td = $('td#td_'+Math.floor(begintime)+'_45_'+ticket.asset_id.$oid)[0]
      break;
      default:
      ticket_td = $('td#td_'+begintime+'_'+ticket.asset_id.$oid)[0]
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
    console.log(ticket_td.offsetHeight*4*(endtime-begintime), endtime, begintime);
    $('div#'+ticket.ticket_id.$oid).css({'top': ticket_td.offsetTop+2,'width': ticket_td.offsetWidth-3, 'left': ticket_td.offsetLeft,'height': ticket_td.offsetHeight*4*(endtime-begintime)-5});

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
    if (hour-Math.floor(hour) > 0)
      return Math.floor(hour) + ':' + (hour-Math.floor(hour))*60;
    else
      return  Math.floor(hour)+ ':00';
  }

  object.change_time_to_float = function change_time_to_float(mytime){
    var time_split = mytime.split(":");
    if (time_split[0]!='00')
      return parseFloat(time_split[0]) + (parseFloat(time_split[1])/60.0);
    else
      return 24.0;
  }
  return object;
}]);