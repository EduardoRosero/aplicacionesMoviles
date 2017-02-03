var app={
  inicio: function(){
  
    this.iniciaFastClick();
  },

  iniciaFastClick: function () {
    FastClick.attach(document.body);
  },
  
  iniciaBoton: function(){
	  var buttonAction = document.querySelector('#button-action');
	  buttonAction.addEventListener('click', this.tomarFoto);//Añadimos un escuchador de evento para tomar la foto en un click o tap
  },
  
  tomarFoto: function(){
	  var opciones ={
		  quality: 50,
		  destinationType: Camera.DestinationType.FILE_URI,
		  targetWidth:300,
		  targetHeight:300,
		  correctOrientation: true
	  };
	  navigator.camera.getPicture(app.fotoTomada, app.errorAlTomarFoto, opciones );
  },
  
  fotoTomada: function(imageURI){
	  var image = document.querySelector('#foto');
	  image.src=imageURI;
  },
  
  errorAlTomarFoto: function(message){
	  console.log("Falló al tomar la foto o foto cancelada: " +  message);
  }
  
};

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        app.inicio();
    }, false);
}

