var precio1;
var precio2;


function mostrarElementos(arreglo){
$.each(arreglo,function(index,value){
  var renglon = ("<div class='row'></div>");
  var columna =("<div class='col s6'><div class='card hoverable'> <div class='card-content'><img src='./img/home.jpg' id='ima'  ></img></div></div></div><div class='col s6'><div class='card'><div class='card-content'><table><tr><th>Id</th><td>"+value.Id+"</td></tr><tr><td>Direccion</td><td>"+value.Direccion+"</td></tr><tr><td>Ciudad</td><td>"+value.Ciudad+"</td></tr><tr><td>Telefono</td><td>"+value.Telefono+"</td></tr><tr><td>Codigo Postal</td><td>"+value.Codigo_Postal+"</td></tr><tr><td>Tipo</td><td>"+value.Tipo+"</td></tr><tr><td>Precio</td><th>"+value.Precio+"</th></tr></table></div></div></div><div class='divider'></div>")

  $("#resultados").append(columna)
})
}


function obtenerPrecios(){
  var precios = $("#rangoPrecio").val();
  var res = precios.split(";");
  precio1 = parseInt(res[0]);
  precio2 = parseInt(res[1]);
}

function limpiar(){
  $("#resultados").empty();

}


function cargarMasFotos(){
  $.ajax({
    url:"./data-1.json",
    type:'GET',
    success:function(data){
      mostrarElementos(data)
    }
  })
}


function moverBoton(){
  $("#mostrarTodos").appendTo('#miColumna')
  }


function mandarAjax(){
  var ciudad =$("#selectCiudad").val();
  var tipo = $("#selectTipo").val();
  var form_data = new FormData();
  form_data.append('ciudad',ciudad);
  form_data.append('tipo',tipo);
  form_data.append('precio1',precio1);
  form_data.append('precio2',precio2);

  $.ajax({
    url: 'cargar.php',
    dataType: "json",
    type: 'POST',
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    success:function(data){
      if(data.final != ""){
        mostrarElementos(data.final);
      }
      else if(data.respuesta){
        alert(data.respuesta)
      }
    },
    error:function(){
      alert("Error ajax");
    }

  })
}




$(function(){
  $('select').material_select();
  $("#mostrarTodos").click(function(event){
    event.preventDefault();
    limpiar();
    cargarMasFotos();
    moverBoton();

  })

  $("#formulario").submit(function(event){
    event.preventDefault();
    limpiar();
    obtenerPrecios();
    mandarAjax();

  })




  /*
    Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
  */
  $.fn.scrollEnd = function(callback, timeout) {
    $(this).scroll(function(){
      var $this = $(this);
      if ($this.data('scrollTimeout')) {
        clearTimeout($this.data('scrollTimeout'));
      }
      $this.data('scrollTimeout', setTimeout(callback,timeout));
    });
  };
  /*
    Función que inicializa el elemento Slider
  */

  function inicializarSlider(){
    $("#rangoPrecio").ionRangeSlider({
      type: "double",
      grid: false,
      min: 0,
      max: 100000,
      from: 200,
      to: 80000,
      prefix: "$"
    });
  }
  /*
    Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
  */
  function playVideoOnScroll(){
    var ultimoScroll = 0,
        intervalRewind;
    var video = document.getElementById('vidFondo');
    $(window)
      .scroll((event)=>{
        var scrollActual = $(window).scrollTop();
        if (scrollActual > ultimoScroll){
         video.play();
       } else {
          //this.rewind(1.0, video, intervalRewind);
          video.play();
       }
       ultimoScroll = scrollActual;
      })
      .scrollEnd(()=>{
        video.pause();
      }, 10)
  }

  inicializarSlider();
  playVideoOnScroll();


})
