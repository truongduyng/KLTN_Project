services.factory('clubsFtry',['$http', function($http){
  var o = {
    clubs: [],
  };

  o.index = function(){
    return $http.get('/clubs.json').success(function(results){
      o.clubs = results;
    })
    .error(function(){
    })
  }

  o.show = function(club_id){
    return $http.get('/clubs/'+club_id+'.json').success(function(result){
    })
    .error(function(){
    })
  }

  o.create = function(club){
    return $http.post('clubs.json', club).success(function(result){
      o.clubs.push(result);
    })
    .error(function(){
    })
  }

  o.update = function(club){
    return $http.put('clubs/' + club.id.$oid, club);
  }

  o.addmember = function(club_id, member_id){
    return $http.post('clubs/'+ club_id + '/addmember.json',{member_id: member_id}).success(function(result){
    })
    .error(function(){
    })
  }

  o.removemember = function(club_id, member_id, admins){
    return $http.post('clubs/' + club_id + '/removemember.json', {member_id: member_id, admins: admins}).success(function(){
    })
    .error(function(){
    })
  }

  o.makeadmin = function(club_id, admin_id){
    return $http.post('clubs/' + club_id + '/makeadmin.json', {admin_id: admin_id}).success(function(){
    })
    .error(function(){
    })
  }

  o.removeadmin = function(club_id, admin_id){
    return $http.post('clubs/' + club_id + '/removeadmin.json', {admin_id: admin_id}).success(function(){
    })
    .error(function(){
    })
  }

  o.new_request_member = function(club_id, member_id){
    return $http.post('clubs/' + club_id + '/new_request_member.json', {member_id: member_id}).success(function(){
    })
    .error(function(){
    })
  }

  o.accept_request_member = function(club_id, member_id){
    return $http.post('clubs/' + club_id + '/accept_request_member.json', {member_id: member_id}).success(function(){
    })
    .error(function(){
    })
  }

  return o;
}]);