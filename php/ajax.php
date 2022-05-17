<?php
if($_POST){
	$count = 0;
	$txtTituloEvento = $_POST['txtTituloEvento'];
	$txtInicio = $_POST['txtInicio'];
	$txtColor = $_POST['txtColor'];
	$datajson = (!file_exists('database.json') ? [] : json_decode(file_get_contents('database.json')));
	// foreach ($events as $element) {
	// 	if ($last == $element) 
	// 			$element['id'];
	// }
	//TODO: verificar la cantidad de registros si es mayor a 0 obtener el ultimo registro y sumarle 1 al nuevo antes de ingresarlo
	// if()
	$writable = fopen('database.json','w');

	// $data = file_get_contents("database.json");
	// $events = json_decode($data, true);
	// $last = end($events);

	// foreach ($events as $element) {
	// 	if ($last == $element) 
	// 			$element['id'];
	// }


	array_push($datajson, [
		'id' => $count,
		'title' => $txtTituloEvento,
		'start' => $txtInicio,
		'color' => $txtColor,
	]);
	$arrResponse = [
		'message' => "Datos cargados", 'status' => true
	];
	fwrite($writable,json_encode($datajson));
	fclose($writable);
}else{
	$arrResponse = [
		'message' => "No se recibio nada", 'status' => false
	];
}
echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
die();