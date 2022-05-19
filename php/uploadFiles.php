<?php

if(!$_FILES == null){

	$cont = 0;
	$user = 'WILL-01';
	$directorio = '../data/'.$user.'/files/';
	// si no existe el directorio crearlo
	if(!is_dir($directorio)) mkdir($directorio, 0777, true);
	
	// simular un database decodificarlo y convertirlo en un archivo navtivo php
	$data = (!file_exists('../json/'.$user.'-database.json') ? [] : json_decode(file_get_contents('../json/'.$user.'-database.json')));
	// recorrer los archivos
	foreach ($_FILES as $key => $file) {
		// evaluamos si falla move_upload retornamos un error
		if(!move_uploaded_file($file['tmp_name'], $directorio.'/'.$file['name'])){
			// return print_r(json_encode(['message' => 'No fue posible subir'],'status' => http_response_code(500)));
			$arrResponse = ["status" => false, "message" => "No fue posible subir"];
		}
		// cada vez que itera agregamos un elemnto ala rray
		array_push($data, 
		[
			'id' => $key,
			'file_name' => $file['name']
		]);
		// se incrementa para poder usarlo para enviar un msj de exito
		$cont ++;
	}
	
	if($cont == count($_FILES)){
		if($cont == 0){
				$arrResponse = ['message' => $message,'status' => false];
		}else{
			// poder escribir en un archivo simulando una base de datos
			$writable = fopen('../json/'.$user.'-database.json','w');
			fwrite($writable, json_encode($data));
			fclose($writable);
			$message = ( $cont > 1 ? 'Se subieron ' . $cont . ' fotos con éxito' : 'Se subió ' . $cont . ' foto con éxito' );
			$arrResponse = ['message' => $message,'status' => true];
		}
	}
}else{
	$arrResponse = ["status" => false, "message" => "No se a cargado ningun archivo"];
}
echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);