//= require websocket_rails/main
var tickets = {
  name: 'Start taking advantage of WebSockets',
  completed: false
}

var dispatcher = new WebSocketRails('localhost:3456/websocket');

dispatcher.trigger('tickets.create', tickets);

dispatcher.bind('tickets.create_success', function(ticket) {
  console.log('successfully created ' + ticket.name);
});
