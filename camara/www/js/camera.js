var app={
  inicio: function(){
  
    this.iniciaFastClick();
	this.iniciaBoton();
	
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
	  var image = document.createElement('img');
		img.onload = function(){
			app.pintarFoto(img);
		}
			  image.src=imageURI;
  },
  
  pintarFoto: function(img){
	var canvas = document.querySelector('#foto'  );
	var context = canvas.getContext('2d');
	canvas.width=img.width;
	canvas.height=img.height;
	context.drawImage(img, 0,0,img.width, img.hight);
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

