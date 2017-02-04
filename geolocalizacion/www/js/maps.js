var app = {
    inicio: function () {
	this.iniciaFastClick();

	},

  iniciaFastClick: function(){
	FastClick.attach(document.body);	
	},

	dispositivoListo: function(){
		navigator.geolocation.getCurrentPosition(app.pintaCoordenadasEnMapa, app.errorAlSolicitarLocalizacion);
		
		var watchID = navigator.geolocation.watchPosition(app.onSuccess, app.onError, { timeout: 300000 });
	},
	
	pintaCoordenadasEnMapa: function(position){
		var miMapa = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
		
		L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmdyb21lcm8iLCJhIjoiY2l5bHBwdzRpMDAxMTJ3cXFwNzNhYnVsbyJ9.KfPrsl6jQpaHBA8E4E4iAw', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			maxZoom: 18
		}).addTo(miMapa);
		
		app.pintaMarcadorUsuario([position.coords.latitude, position.coords.longitude], 'Aca estoy!',miMapa );
		
		miMapa.on('click', function(evento){
			var texto = 'Marcador en l(' + evento.latlng.lat.toFixed(2) + ') y L(' + evento.latlng.lng.toFixed(2) + ')';
			app.pintaMarcador(evento.latlng, texto, miMapa);
		});		
	},
	
	pintaMarcadorUsuario: function(latlng, texto, mapa){
				
		var circulo = L.circle(latlng, {
			color: 'yellow',
			fillOpacity: 0,
			radius: 1000
		}).addTo(mapa); 
		
		var icono = L.icon({
			iconUrl: 'hand.png',
			
			/*iconSize: [38, 95],
			/*iconAnchor: [22,94],*/
			popupAnchor: [-3, -76]
		});
			
		var marcador = L.marker(latlng, {icon: icono}).addTo(mapa);
		marcador.bindPopup(texto).openPopup();
	},
	
	pintaMarcador: function(latlng, texto, mapa){
		var marcador = L.marker(latlng).addTo(mapa);
		marcador.bindPopup(texto).openPopup();
	},
	
	////////////////CORDOVA///////////////////
	errorAlSolicitarLocalizacion: function(error){
		alert("ERROR!");
		console.log(error.code + ': '+ error.message);
	},
	
	 // onSuccess Callback
    //   This method accepts a `Position` object, which contains
    //   the current GPS coordinates
    //
    onSuccess: function (position) {
        /*var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                            'Longitude: ' + position.coords.longitude     + '<br />' +
                            '<hr />'      + element.innerHTML;*/
		//alert("Hubo cambio de posicion!");
		app.pintaCoordenadasEnMapa(position);
    },

    // onError Callback receives a PositionError object
    //
    onError: function (error) {
        /*alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');*/
		//alert("Error al reubicar");
		app.errorAlSolicitarLocalizacion(error);
    }

    // Options: throw an error if no update is received every 30 seconds.
    //
    //var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
	
	////////////////CORDOVA///////////////////
		
};
		
if ('addEventListener' in document){
	document.addEventListener('DOMContentLoaded', function(){
		app.inicio();
	}, false);
	document.addEventListener('deviceready', function(){
		app.dispositivoListo();
	}, false);
}