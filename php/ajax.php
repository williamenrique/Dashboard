<?php
if($_POST){
	$count = 0;
	$txtTituloEvento = $_POST['txtTituloEvento'];
	$txtInicio = $_POST['txtInicio'];
	$txtColor = $_POST['txtColor'];
	$datajson = (!file_exists('database.json') ? [] : json_decode(file_get_contents('database.json')));

	$writable = fopen('database.json','w');

	array_push($datajson, [
		'id' => $count,
		'title' => $txtTituloEvento,
		'start' => $txtInicio,
		'color' => $txtColor
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