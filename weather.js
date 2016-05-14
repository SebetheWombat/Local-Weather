$(document).ready(function() {
  var lat;
  var long;
	navigator.geolocation.getCurrentPosition(function(pos){
		lat = pos.coords.latitude;
		long = pos.coords.longitude;

	   $.ajax({
		url: "https://api.wunderground.com/api/e6066d798fc591ff/geolookup/conditions/q/" + lat + "," + long + ".json",
		dataType: "jsonp",
		success: function(parsed_json) {
		  var location = parsed_json.location.city;
		  var state = parsed_json.location.state;
		  var temp_f = parsed_json.current_observation.temp_f;
		  var temp_c = parsed_json.current_observation.temp_c;
		  var cloudy = parsed_json.current_observation.weather;

		  var far = true;
		  var weath = cloudy.toLowerCase();
		  weath = weath.replace(/\s/g, '');
		 if(weath == "overcast"){
		   weath = "cloudy";
		 } $("#clouds").html(cloudy).css("fontSize", "25px");
		  $("#weather").html(temp_f + "&#176 F");
		  $("#loc").html(location + ", " + state);
		  $("#weather").css("fontSize", "30px");
		  $("#loc").css("fontSize", "35px");
		  $("#icon").attr({
			src: "http://icons.wxug.com/i/c/i/" + weath + ".gif"
		  });

		  $("#degreeChange").click(function() {
			if (far) {
			  $("#weather").html(temp_c + "&#176 C");
			  far = false;
			} else {
			  $("#weather").html(temp_f + "&#176 F");
			  far = true;
			}
		  });
		}
	  });
	});
});
