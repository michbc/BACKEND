<?php
error_reporting(E_ALL ^ E_NOTICE);
//require_once("data-1.json");
$prueba =false;
$ciudad = $_POST["ciudad"];
$tipo = $_POST["tipo"];
$precio1 = $_POST["precio1"];
$precio2 = $_POST["precio2"];
$data = file_get_contents("data-1.json");
$casas = json_decode($data); // retorna un objeto que representa a nuestro JSON
//$casas = json_decode($data,true); //Retorna un array
// si le pasamos un true nos retornara un array y en caso contrario un objeto
$miArreglo = array();

foreach ($casas as $index => $value) {
    $res = substr($value->Precio,1); //quitamos el signo de pesos que se encuentra en la posicion 1 
    $res2 = str_replace(",","",$res);//Remplazamos la comita del precio por un espacio sin nada
    $res3 = (int)$res2;

    if(($value->Ciudad == $ciudad) && ($value->Tipo == $tipo) && ($res3 >= $precio1 && $res3 <= $precio2) ){ //Condicion que te busca por los tres filtros
      $arreglo_casas = array("Id"=>$value->Id,"Direccion"=>$value->Direccion,"Ciudad"=>$value->Ciudad,"Telefono"=>$value->Telefono,"Codigo_Postal"=>$value->Codigo_Postal,"Tipo"=>$value->Tipo,"Precio"=>$value->Precio);
      array_push($miArreglo,$arreglo_casas);
      $prueba = true;
    }
   else if(($value->Ciudad == $ciudad) && ($tipo == "") && ($res3 >= $precio1 && $res3 <= $precio2)){ // condicion que busca por ciudad y precio , sin tipo
      $arreglo_casas = array("Id"=>$value->Id,"Direccion"=>$value->Direccion,"Ciudad"=>$value->Ciudad,"Telefono"=>$value->Telefono,"Codigo_Postal"=>$value->Codigo_Postal,"Tipo"=>$value->Tipo,"Precio"=>$value->Precio);
      array_push($miArreglo,$arreglo_casas);
      $prueba = true;
    }
   else if(($value->Tipo == $tipo)&& ($ciudad=="") && ($res3 >= $precio1 && $res3 <= $precio2)){ // condicion que busca por tipo y precio, sin ciudad
      $arreglo_casas = array("Id"=>$value->Id,"Direccion"=>$value->Direccion,"Ciudad"=>$value->Ciudad,"Telefono"=>$value->Telefono,"Codigo_Postal"=>$value->Codigo_Postal,"Tipo"=>$value->Tipo,"Precio"=>$value->Precio);
      array_push($miArreglo,$arreglo_casas);
      $prueba = true;
    }
   else if ($precio == null){// condicion que te evalua si ahi un precio o no en los filtros
    $respuesta['respuesta'] = "No se filtro un precio valido";
    $prueba = true;
    }

   else if(($value->Ciudad == $ciudad) && ($tipo=="") && ($precio == null) || ($value->Tipo == $tipo) && ($ciudad=="")&& ($precio==null) || ($ciudad=="") && ($tipo=="") && ($res3 >= $precio1 && $res3 <= $precio2)  ) //condicion que te busca por un filtro y los demas en blanco
    {
      $arreglo_casas = array("Id"=>$value->Id,"Direccion"=>$value->Direccion,"Ciudad"=>$value->Ciudad,"Telefono"=>$value->Telefono,"Codigo_Postal"=>$value->Codigo_Postal,"Tipo"=>$value->Tipo,"Precio"=>$value->Precio);
      array_push($miArreglo,$arreglo_casas);
      $prueba = true;
    }
}

if($prueba == false){
  $respuesta['respuesta'] = "No se encontraron registros";
}


$respuesta['final'] = $miArreglo;
echo json_encode($respuesta);


 ?>
