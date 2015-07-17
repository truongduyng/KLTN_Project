app.factory('mapFtry', ['$http', function($http) {
  var o = {
    branches: [],
    map: null,
    markers:[],
    bounds: new google.maps.LatLngBounds(),
    image: {
      url: null,
      size: new google.maps.Size(56, 56),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(28,56)
    },
    shape: {
      coords: [1, 1, 1, 56, 56, 56, 56 , 1],
      type: 'poly'
    },
    infowindow: new google.maps.InfoWindow({maxWidth: 160})
  };

  o.getsearchingdistance = function (){

    var Bound = o.map.getBounds();
    var NE = Bound.getNorthEast();
    var SW = Bound.getSouthWest();
    var lat1 =  NE.lat();
    var lat2 =  SW.lat();
    var lng1 =  NE.lng();
    var verticalLatLng1 = new google.maps.LatLng(lat1,lng1);
    var verticalLatLng2 = new google.maps.LatLng(lat2,lng1);

    return google.maps.geometry.spherical.computeDistanceBetween(verticalLatLng1,verticalLatLng2)/1609.34; // convert to miles
  };

  o.setMarkers = function(map, data){
    for (var i=0; i < data.length; i++) {
      o.image.url = data[i].picture;
      var myLatLng = new google.maps.LatLng(data[i].lat,data[i].lng);
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: o.image,
        shape: o.shape,
        title: data[i].name,
        zIndex: i+1
      });

      google.maps.event.addListener(marker,"click",(function(marker,i){
        return function(){
          if (data[i].isvenue){
            o.infowindow.setContent('<div id="info-window"><a href="#/dia-diem-chia-se/'+data[i].url+'/">'+data[i].name+'</a><br><span>'+data[i].address.substring(0,20)+'...</span></div>');
          }else{
            o.infowindow.setContent('<div id="info-window"><a href="#/'+data[i].url+'">'+data[i].name+'</a><br><span>'+data[i].address.substring(0,20)+'...</span></div>');
          }
          o.infowindow.open(map,marker);
          map.setCenter(marker.getPosition());
        }
      })(marker,i));

      o.markers.push(marker);
      o.bounds.extend(marker.getPosition());
    }
  };

  return o;
}]);
